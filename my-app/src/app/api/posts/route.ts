import { db } from "@/db";
import { posts } from "@/db/schema";
import { desc } from "drizzle-orm";

export async function GET() {
  const allPosts = await db.select().from(posts).orderBy(desc(posts.createdAt));
  return Response.json(allPosts);
}

export async function POST(request: Request) {
  const body = await request.json();
  const { title, content } = body as { title: string; content: string };

  if (!title?.trim() || !content?.trim()) {
    return Response.json({ error: "Title and content are required" }, { status: 400 });
  }

  const [post] = await db.insert(posts).values({ title, content }).returning();
  return Response.json(post, { status: 201 });
}
