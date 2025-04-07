import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const dataFilePath = path.join(process.cwd(), "data.json");

interface User {
  id: number;
  coverPhoto?: string;
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const userId = Number(formData.get("userId"));
    const file = formData.get("file") as File;

    if (!file || !userId) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const users: User[] = fs.existsSync(dataFilePath)
      ? JSON.parse(fs.readFileSync(dataFilePath, "utf-8"))
      : [];

    const userIndex = users.findIndex((u) => u.id === userId);
    if (userIndex === -1) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const base64Data = buffer.toString("base64");
    const mimeType = file.type;
    const newCoverPhoto = `data:${mimeType};base64,${base64Data}`;

    users[userIndex].coverPhoto = newCoverPhoto;
    fs.writeFileSync(dataFilePath, JSON.stringify(users, null, 2));

    return NextResponse.json(
      { coverPhoto: newCoverPhoto },
      { status: 200 }
    );
  } catch (error) {
    console.error("Cover photo update error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}