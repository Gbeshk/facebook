import UserClient from "@/app/components/__organisms/uresclient/UserClient";
import React from "react";
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
  author?: string;
  authorPic?: string;
  isLiked?: boolean;
  isSaved?: boolean;
}

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  profilePicture: string;
  coverPhoto?: string;
  createdAt: string;
  posts: Post[];
  year: number;
  month: number;
  friends?: number[];
  friendRequestsSent?: number[];
  friendRequestsReceived?: number[];
}

interface ParamsProps {
  params: {
    id: string;
  };
}
function User({ params }: ParamsProps) {

  return (
    <div>
      <UserClient params={params} />
    </div>
  );
}

export default User;
