// app/api/search/route.ts
import { NextResponse } from "next/server";
import data from "../../../../data.json";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q")?.toLowerCase() || "";

  // Search users
  const filteredUsers = data.filter((user) =>
    `${user.firstName} ${user.lastName} ${user.email}`
      .toLowerCase()
      .includes(query)
  );

  // Search posts
  const filteredPosts = data.flatMap((user) =>
    user.posts
      .filter((post) => post.content?.toLowerCase().includes(query))
      .map((post) => ({
        ...post,
        author: `${user.firstName} ${user.lastName}`,
        authorPic: user.profilePicture,
      }))
  );

  return NextResponse.json({
    users: filteredUsers,
    posts: filteredPosts.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    ),
  });
}
