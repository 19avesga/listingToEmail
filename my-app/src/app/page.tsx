import { db } from "@/db";
import { posts } from "@/db/schema";
import { desc } from "drizzle-orm";
import PostForm from "@/components/PostForm";
import PostList from "@/components/PostList";

export default async function Home() {
  const allPosts = await db.select().from(posts).orderBy(desc(posts.createdAt));

  return (
    <main className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="mb-8 text-2xl font-bold text-gray-900">Posts</h1>
      <section className="mb-10">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500">
          New Post
        </h2>
        <PostForm />
      </section>
      <section>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500">
          All Posts
        </h2>
        <PostList posts={allPosts} />
      </section>
    </main>
  );
}
