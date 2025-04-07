import { NextResponse } from "next/server";
import fs from 'fs';
import path from 'path';

const dataPath = path.join(process.cwd(), 'data.json');

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  friends: number[];
  friendRequestsSent: number[];
  friendRequestsReceived: number[];
  profilePicture: string;
  createdAt: string;
}

export async function GET() {
  try {
    if (!fs.existsSync(dataPath)) {
      fs.writeFileSync(dataPath, '[]', 'utf-8');
    }

    const rawData = fs.readFileSync(dataPath, 'utf-8');
    const users: User[] = JSON.parse(rawData);

    return NextResponse.json(users.map(user => ({
      ...user,
      id: Number(user.id),
      friends: user.friends.map(Number),
      friendRequestsSent: user.friendRequestsSent.map(Number),
      friendRequestsReceived: user.friendRequestsReceived.map(Number),
    })));
  } catch (error) {
    console.error("Error loading users:", error);
    return NextResponse.json(
      { error: "Failed to load users" },
      { status: 500 }
    );
  }
}