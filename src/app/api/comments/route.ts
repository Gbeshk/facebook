import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const dataFilePath = path.join(process.cwd(), "data.json");
interface User {
  id: number;
  friendRequestsSent?: number[];
  friendRequestsReceived?: number[];
  firstName: string;
  lastName: string;
  day: number;
  month: number;
  year: number;
  gender: string;
  email: string;
  password: string;
  profilePicture: string;
  posts: Post[];
  createdAt: string;
  friends: number[];
}
interface Post {
  id: number;
  userId: number;
  content: string;
  imageUrl?: string;
  createdAt: string;
  likes: number;
  likedBy: number[];
  comments: string[];
  savedBy: number[];
}
interface CommentRequest {
  postId: number;
  userId: number;
  comment: string;
}

export async function POST(request: Request) {
  try {
    const { postId, userId, comment }: CommentRequest = await request.json();

    if (!postId || !userId || !comment) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    const rawData = fs.readFileSync(dataFilePath, "utf-8");
    const users = JSON.parse(rawData) as User[];

    let commentAdded = false;
    const updatedUsers = users.map((user: User) => ({
      ...user,
      posts: user.posts.map((post: Post) => {
        if (post.id === postId) {
          commentAdded = true;
          return {
            ...post,
            comments: [...post.comments, `${userId}:${comment}`],
          };
        }
        return post;
      }),
    }));

    if (!commentAdded) {
      return NextResponse.json(
        { success: false, message: "Post not found" },
        { status: 404 }
      );
    }

    fs.writeFileSync(dataFilePath, JSON.stringify(updatedUsers, null, 2));

    return NextResponse.json({
      success: true,
      comment: `${userId}:${comment}`,
    });
  } catch (error) {
    console.error("Error adding comment:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
