import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const dataFilePath = path.join(process.cwd(), 'data.json');
const uploadDir = path.join(process.cwd(), 'public/uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

interface User {
  id: number;
  firstName: string;
  lastName: string;
  profilePic?: string;
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
  comments: any[];
}

export async function GET() {
  try {
    if (!fs.existsSync(dataFilePath)) {
      return NextResponse.json({ users: [] });
    }

    const rawData = fs.readFileSync(dataFilePath, 'utf-8');
    const users: User[] = JSON.parse(rawData) || [];

    return NextResponse.json({
      users: users.map(user => ({
        ...user,
        posts: user.posts?.map(post => ({
          ...post,
          likedBy: post.likedBy || []
        })) || []
      }))
    });
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const userId = formData.get('userId');
    const content = formData.get('content');
    const imageFile = formData.get('image') as File | null;

    if (!userId) {
      return NextResponse.json(
        { success: false, message: 'User ID is required' },
        { status: 400 }
      );
    }

    const rawData = fs.readFileSync(dataFilePath, 'utf-8');
    const users: User[] = JSON.parse(rawData);

    let imageUrl = '';
    if (imageFile && imageFile.size > 0) {
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      const fileName = `${uuidv4()}-${imageFile.name}`;
      imageUrl = `/uploads/${fileName}`;
      fs.writeFileSync(path.join(uploadDir, fileName), buffer);
    }

    const newPost: Post = {
      id: Date.now(),
      userId: Number(userId),
      content: content?.toString() || '',
      imageUrl: imageUrl || undefined,
      createdAt: new Date().toISOString(),
      likes: 0,
      likedBy: [],
      comments: []
    };

    const updatedUsers = users.map(user => {
      if (user.id === Number(userId)) {
        return {
          ...user,
          posts: [...(user.posts || []), newPost]
        };
      }
      return user;
    });

    fs.writeFileSync(dataFilePath, JSON.stringify(updatedUsers, null, 2));

    return NextResponse.json({
      success: true,
      post: newPost
    });

  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}