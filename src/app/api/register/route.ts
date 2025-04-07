import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const dataFilePath = path.join(process.cwd(), "data.json");

type Gender = "male" | "female" | "other";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  day: number;
  month: number;
  year: number;
  gender: Gender;
  email: string;
  password: string;
  profilePicture: string;
  createdAt: string;
  posts: [];
  friends: number[];

  friendRequestsSent: number[];
  friendRequestsReceived: number[];
  coverPhoto?: string;
}

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};
const DEFAULT_COVER_PHOTO =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNDQwIiBoZWlnaHQ9IjMyMCI+PHJlY3Qgd2lkdGg9IjE0NDAiIGhlaWdodD0iMzIwIiBmaWxsPSIjZjBmMGYwIi8+PC9zdmc+";
const DEFAULT_PROFILE_PICTURES: Record<Gender, string> = {
  male: "https://scontent.ftbs6-2.fna.fbcdn.net/v/t1.30497-1/453178253_471506465671661_2781666950760530985_n.png?stp=dst-png_s200x200&_nc_cat=1&ccb=1-7&_nc_sid=136b72&_nc_ohc=1BwdynYvBPkQ7kNvwH6azd4&_nc_oc=AdnG5RTc8K33z1to7vzwZncn24z6kLsTmCJpGOIIYU4NizzQXNP-elmT0P-yqq8t3-g&_nc_zt=24&_nc_ht=scontent.ftbs6-2.fna&oh=00_AYHONsCXlykPDU6l59JnEkyhVmF9G2V6H35yqpAj_LROCw&oe=68164A3A",
  female:
    "https://scontent.ftbs6-2.fna.fbcdn.net/v/t1.30497-1/453178253_471506465671661_2781666950760530985_n.png?stp=dst-png_s200x200&_nc_cat=1&ccb=1-7&_nc_sid=136b72&_nc_ohc=1BwdynYvBPkQ7kNvwH6azd4&_nc_oc=AdnG5RTc8K33z1to7vzwZncn24z6kLsTmCJpGOIIYU4NizzQXNP-elmT0P-yqq8t3-g&_nc_zt=24&_nc_ht=scontent.ftbs6-2.fna&oh=00_AYHONsCXlykPDU6l59JnEkyhVmF9G2V6H35yqpAj_LROCw&oe=68164A3A",
  other:
    "https://scontent.ftbs6-2.fna.fbcdn.net/v/t1.30497-1/453178253_471506465671661_2781666950760530985_n.png?stp=dst-png_s200x200&_nc_cat=1&ccb=1-7&_nc_sid=136b72&_nc_ohc=1BwdynYvBPkQ7kNvwH6azd4&_nc_oc=AdnG5RTc8K33z1to7vzwZncn24z6kLsTmCJpGOIIYU4NizzQXNP-elmT0P-yqq8t3-g&_nc_zt=24&_nc_ht=scontent.ftbs6-2.fna&oh=00_AYHONsCXlykPDU6l59JnEkyhVmF9G2V6H35yqpAj_LROCw&oe=68164A3A",
};

const isValidGender = (gender: string): gender is Gender => {
  return ["male", "female", "other"].includes(gender.toLowerCase());
};

export async function POST(req: Request) {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers, status: 200 });
  }

  try {
    const userData = await req.json();

    const requiredFields = [
      "firstName",
      "lastName",
      "day",
      "month",
      "year",
      "gender",
      "email",
      "password",
    ];
    const missingFields = requiredFields.filter((field) => !userData[field]);

    if (missingFields.length > 0) {
      return NextResponse.json(
        { message: `Missing required fields: ${missingFields.join(", ")}` },
        { status: 400, headers }
      );
    }

    if (!isValidGender(userData.gender)) {
      return NextResponse.json(
        { message: "Invalid gender value. Must be male, female, or other" },
        { status: 400, headers }
      );
    }

    let users: User[] = [];
    if (fs.existsSync(dataFilePath)) {
      const fileData = fs.readFileSync(dataFilePath, "utf-8");
      try {
        users = JSON.parse(fileData);
        if (!Array.isArray(users)) {
          throw new Error("Invalid data format");
        }
      } catch (e) {
        console.error("Error parsing users data:", e);
        users = [];
      }
    }

    if (users.some((user) => user.email === userData.email)) {
      return NextResponse.json(
        { message: "Email already registered" },
        { status: 409, headers }
      );
    }

    const userGender = userData.gender.toLowerCase() as Gender;
    const defaultPicture = DEFAULT_PROFILE_PICTURES[userGender];

    const newUser: User = {
      id: users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1,
      firstName: userData.firstName,
      lastName: userData.lastName,
      day: userData.day,
      month: userData.month,
      year: userData.year,
      gender: userGender,
      email: userData.email,
      password: userData.password,
      profilePicture: defaultPicture,
      posts: [],
      friends: [],

      createdAt: new Date().toISOString(),
      friendRequestsSent: [],
      friendRequestsReceived: [],
      coverPhoto: DEFAULT_COVER_PHOTO,
    };

    users.push(newUser);
    fs.writeFileSync(dataFilePath, JSON.stringify(users, null, 2));

    return NextResponse.json(
      {
        message: "Registration successful",
        user: {
          id: newUser.id,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          email: newUser.email,
          profilePicture: newUser.profilePicture,
        },
      },
      { status: 201, headers }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500, headers }
    );
  }
}
