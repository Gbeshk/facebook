import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

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

interface User {
  id: number;
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
  friendRequestsSent?: number[];
  friendRequestsReceived?: number[];
}

const dataFilePath = path.join(process.cwd(), 'data.json');

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const userId = formData.get('userId');
    const file = formData.get('file') as File | null;

    if (!userId || !file) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }

    const rawData = fs.readFileSync(dataFilePath, 'utf-8');
    const users: User[] = JSON.parse(rawData);

    const buffer = Buffer.from(await file.arrayBuffer());
    const fileName = `${uuidv4()}-${file.name}`;
    const imagePath = path.join(process.cwd(), 'public/uploads', fileName);
    fs.writeFileSync(imagePath, buffer);

    const imageUrl = `/uploads/${fileName}`;

    const updatedUsers = users.map((user: User) => {
      if (user.id === Number(userId)) {
        return {
          ...user,
          profilePicture: imageUrl,
          firstName: user.firstName,
          lastName: user.lastName,
          day: user.day,
          month: user.month,
          year: user.year,
          gender: user.gender,
          email: user.email,
          password: user.password,
          posts: user.posts,
          createdAt: user.createdAt,
          friendRequestsSent: user.friendRequestsSent,
          friendRequestsReceived: user.friendRequestsReceived
        };
      }
      return user;
    });

    fs.writeFileSync(dataFilePath, JSON.stringify(updatedUsers, null, 2));

    return NextResponse.json({
      success: true,
      profilePicture: imageUrl
    });

  } catch (error) {
    console.error('Error updating profile picture:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}