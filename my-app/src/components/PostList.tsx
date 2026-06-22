"use client";

import { useRouter } from "next/navigation";
import type { Post } from "@/db/schema";

export default function PostList({ posts }: { posts: Post[] }) {
  const router = useRouter();

  async function handleDelete(id: number) {
    await fetch(`/api/posts/${id}`, { method: "DELETE" });
    router.refresh();
  }

  if (posts.length === 0) {
    return <p className="text-gray-500 text-sm">No posts yet. Create one above!</p>;
  }

  return (
    <ul className="space-y-4">
      {posts.map((post) => (
        <li key={post.id} className="rounded border border-gray-200 p-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="font-semibold text-gray-900">{post.title}</h2>
              <p className="mt-1 text-sm text-gray-600">{post.content}</p>
              <p className="mt-2 text-xs text-gray-400">
                {new Date(post.createdAt).toLocaleString()}
              </p>
            </div>
            <button
              onClick={() => handleDelete(post.id)}
              className="shrink-0 rounded px-2 py-1 text-xs text-red-600 hover:bg-red-50"
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
