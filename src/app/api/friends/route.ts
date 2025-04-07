import { NextRequest, NextResponse } from "next/server";
import fs from 'fs/promises';
import path from 'path';

const dataPath = path.join(process.cwd(), 'data.json');

interface User {
  id: number;
  friends: number[];
  friendRequestsSent: number[];
  friendRequestsReceived: number[];
  firstName: string;
  lastName: string;
  email: string;
  profilePicture: string;
  createdAt: string;
}

export async function POST(req: NextRequest) {
  try {
    const rawData = await fs.readFile(dataPath, 'utf-8');
    const users: User[] = JSON.parse(rawData);

    const { senderId, receiverId, action } = await req.json();
    
    const sender = users.find(u => u.id === Number(senderId));
    const receiver = users.find(u => u.id === Number(receiverId));

    if (!sender || !receiver) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    switch (action.toLowerCase()) {
      case 'accept':
        const hasMutualRequest = 
          sender.friendRequestsSent.includes(receiver.id) &&
          receiver.friendRequestsReceived.includes(sender.id);

        if (!hasMutualRequest) {
          return NextResponse.json(
            { error: "Mutual request not found" },
            { status: 400 }
          );
        }

        if (!sender.friends.includes(receiver.id)) {
          sender.friends.push(receiver.id);
        }
        if (!receiver.friends.includes(sender.id)) {
          receiver.friends.push(sender.id);
        }
        
        sender.friendRequestsSent = sender.friendRequestsSent
          .filter(id => id !== receiver.id);
        receiver.friendRequestsReceived = receiver.friendRequestsReceived
          .filter(id => id !== sender.id);
        break;

      case 'ignore':
        sender.friendRequestsSent = sender.friendRequestsSent
          .filter(id => id !== receiver.id);
        receiver.friendRequestsReceived = receiver.friendRequestsReceived
          .filter(id => id !== sender.id);
        break;

      default:
        return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }

    await fs.writeFile(dataPath, JSON.stringify(users, null, 2));
    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("Friend request error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}