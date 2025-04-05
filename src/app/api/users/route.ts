import { NextResponse } from "next/server";
import fs from 'fs';
import path from 'path';

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
  posts: unknown[];
  createdAt: string;
  friendRequestsSent?: number[];
  friendRequestsReceived?: number[];
}

interface NormalizedUser extends User {
  friendRequestsSent: number[];
  friendRequestsReceived: number[];
}

export async function GET() {
  try {
    const dataPath = path.join(process.cwd(), 'data.json');
    const rawData = fs.readFileSync(dataPath, 'utf-8');
    const users: User[] = JSON.parse(rawData);

    const normalizedUsers: NormalizedUser[] = users.map((user: User) => ({
      ...user,
      friendRequestsSent: user.friendRequestsSent || [],
      friendRequestsReceived: user.friendRequestsReceived || [],
    }));

    return NextResponse.json(normalizedUsers);
  } catch (error) {
    console.error("Error loading users:", error);
    return NextResponse.json(
      { error: "Failed to load users" },
      { status: 500 }
    );
  }
}