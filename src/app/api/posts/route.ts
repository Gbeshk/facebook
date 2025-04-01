import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data.json');

interface User {
  id: number;
  // ... your other user fields ...
  posts: Post[];
}

interface Post {
  id: number;
  userId: number;
  content: string;
  createdAt: string;
  likes: number;
  comments: [];
}

export async function POST(req: Request) {
  try {
    const { userId, content } = await req.json();

    // Validate input
    if (!userId || !content) {
      return NextResponse.json(
        { success: false, message: 'Missing userId or content' },
        { status: 400 }
      );
    }

    // Read existing data
    let users: User[] = [];
    if (fs.existsSync(dataFilePath)) {
      const fileData = fs.readFileSync(dataFilePath, 'utf-8');
      users = JSON.parse(fileData);
      if (!Array.isArray(users)) {
        throw new Error('Invalid data format - expected array');
      }
    }

    // Find user
    const user = users.find(u => u.id === userId);
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }

    // Ensure posts array exists
    if (!user.posts) {
      user.posts = [];
    }

    // Create new post
    const newPost: Post = {
      id: Date.now(),
      userId,
      content,
      createdAt: new Date().toISOString(),
      likes: 0,
      comments: []
    };

    user.posts.push(newPost);

    // Save updated data
    fs.writeFileSync(dataFilePath, JSON.stringify(users, null, 2));

    return NextResponse.json(
      { 
        success: true,
        message: 'Post created successfully',
        post: newPost
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Error saving post:', error);
    return NextResponse.json(
      { 
        success: false,
        message: 'Internal server error',
      },
      { status: 500 }
    );
  }
}