import Image from "next/image";
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
  
interface UserProfilePicProps{
    viewedUser: User
}
function UserProfilePic({viewedUser}:UserProfilePicProps) {
  return (
    <>
          <div className="w-[174px] h-[174px] rounded-full max-md:top-[-70px] border-2 border-white overflow-hidden absolute top-[-60px] max-md:left-[1/2]">
        {viewedUser.profilePicture && (
          <Image
            alt="Profile picture"
            width={174}
            height={174}
            src={viewedUser.profilePicture}
            className="w-full h-full object-cover"
          />
        )}
      </div>
    </>
  );
}

export default UserProfilePic;
