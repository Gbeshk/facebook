import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

interface User {
  id: number;
  firstName: string;
  lastName: string;
  profilePicture?: string;
  posts?: Post[];
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

const dataFilePath = path.join(process.cwd(), 'data.json');

export async function POST(req: Request) {
  try {
    const { postId, userId } = await req.json();

    if (!postId || !userId) {
      return NextResponse.json(
        { success: false, message: 'postId and userId are required' },
        { status: 400 }
      );
    }

    const rawData = fs.readFileSync(dataFilePath, 'utf-8');
    const users: User[] = JSON.parse(rawData);

    let postFound = false;
    
    const updatedUsers = users.map(user => ({
      ...user,
      posts: user.posts?.map(post => {
        if (post.id === postId) {
          postFound = true;
          const currentSavedBy = post.savedBy || [];
          const isCurrentlySaved = currentSavedBy.includes(userId);
          
          return {
            ...post,
            savedBy: isCurrentlySaved
              ? currentSavedBy.filter(id => id !== userId)
              : [...currentSavedBy, userId]
          };
        }
        return post;
      }) || []
    }));

    if (!postFound) {
      return NextResponse.json(
        { success: false, message: 'Post not found' },
        { status: 404 }
      );
    }

    fs.writeFileSync(dataFilePath, JSON.stringify(updatedUsers, null, 2));

    const updatedPost = updatedUsers
      .flatMap(u => u.posts || [])
      .find(p => p.id === postId);

    return NextResponse.json({ 
      success: true, 
      isSaved: updatedPost?.savedBy?.includes(userId) || false
    });

  } catch (error) {
    console.error('Error saving post:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}