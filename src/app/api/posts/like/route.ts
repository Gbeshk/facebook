import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data.json');

interface User {
  id: number;
  firstName: string;
  lastName: string;
  posts?: Post[];
}

interface Post {
  id: number;
  userId: number;
  content: string;
  createdAt: string;
  likes: number;
  likedBy: number[];
  comments: any[];
}

export async function POST(req: Request) {
  try {
    const { postId, userId } = await req.json();

    // Validate input
    if (typeof postId !== 'number' || typeof userId !== 'number') {
      return NextResponse.json(
        { success: false, message: 'Invalid postId or userId' },
        { status: 400 }
      );
    }

    // Read existing data
    const rawData = fs.readFileSync(dataFilePath, 'utf-8');
    const users: User[] = JSON.parse(rawData);

    // Find and update the post
    let postUpdated = false;
    const updatedUsers = users.map(user => {
      if (!user.posts) return user;
      
      const updatedPosts = user.posts.map(post => {
        if (post.id === postId) {
          postUpdated = true;
          
          // Initialize likedBy if it doesn't exist
          if (!post.likedBy) {
            post.likedBy = [];
          }
          
          const alreadyLiked = post.likedBy.includes(userId);
          const likeChange = alreadyLiked ? -1 : 1;
          
          return {
            ...post,
            likes: post.likes + likeChange,
            likedBy: alreadyLiked
              ? post.likedBy.filter(id => id !== userId)
              : [...post.likedBy, userId]
          };
        }
        return post;
      });
      
      return { ...user, posts: updatedPosts };
    });

    if (!postUpdated) {
      return NextResponse.json(
        { success: false, message: 'Post not found' },
        { status: 404 }
      );
    }

    // Save changes
    fs.writeFileSync(dataFilePath, JSON.stringify(updatedUsers, null, 2));

    // Find the updated post
    const updatedPost = updatedUsers
      .flatMap(user => user.posts || [])
      .find(post => post.id === postId);

    return NextResponse.json({
      success: true,
      likes: updatedPost?.likes,
      isLiked: updatedPost?.likedBy.includes(userId) || false
    });

  } catch (error) {
    console.error('Error updating like:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}