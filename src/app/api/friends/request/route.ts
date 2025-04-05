import { NextRequest, NextResponse } from "next/server";
import fs from 'fs/promises';
import path from 'path';

const dataPath = path.join(process.cwd(), 'data.json');

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
  posts: unknown[]; 
  createdAt: string;
}

export async function POST(req: NextRequest) {
  try {
    const rawData = await fs.readFile(dataPath, 'utf-8');
    const data: User[] = JSON.parse(rawData);

    if (!Array.isArray(data)) {
      throw new Error("Invalid data format: expected array");
    }

    const { senderId, receiverId, action } = await req.json();
    
    const senderIdNum = Number(senderId);
    const receiverIdNum = Number(receiverId);

    const sender = data.find(u => u.id === senderIdNum);
    const receiver = data.find(u => u.id === receiverIdNum);

    if (!sender) {
      return NextResponse.json({ error: "Sender not found" }, { status: 404 });
    }

    if (!receiver) {
      return NextResponse.json({ error: "Receiver not found" }, { status: 404 });
    }

    sender.friendRequestsSent = sender.friendRequestsSent ?? [];
    receiver.friendRequestsReceived = receiver.friendRequestsReceived ?? [];

    switch (action) {
      case "send":
        if (!sender.friendRequestsSent.includes(receiverIdNum)) {
          sender.friendRequestsSent = [...sender.friendRequestsSent, receiverIdNum];
        }
        if (!receiver.friendRequestsReceived.includes(senderIdNum)) {
          receiver.friendRequestsReceived = [...receiver.friendRequestsReceived, senderIdNum];
        }
        break;
        
      case "cancel":
        sender.friendRequestsSent = sender.friendRequestsSent
          .filter((id: number) => id !== receiverIdNum);
        receiver.friendRequestsReceived = receiver.friendRequestsReceived
          .filter((id: number) => id !== senderIdNum);
        break;
        
      default:
        return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }

    await fs.writeFile(dataPath, JSON.stringify(data, null, 2));
    
    return NextResponse.json({ 
      users: data.map(user => ({
        ...user,
        friendRequestsSent: user.friendRequestsSent ?? [],
        friendRequestsReceived: user.friendRequestsReceived ?? [],
      }))
    });
    
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}