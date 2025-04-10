import Image from 'next/image'
import React from 'react'
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
  
interface UserCoverProps{
    viewedUser: User
}
function UserCover({viewedUser}:UserCoverProps) {
  return (
    <>
        <div className="relative group max-w-[1250px] mx-auto h-[462px]">
                <div className="w-full h-full overflow-hidden rounded-bl-[10px] rounded-br-[10px]">
                  {viewedUser.coverPhoto ? (
                    <Image
                      src={viewedUser.coverPhoto}
                      alt="Cover photo"
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200" />
                  )}
                </div>
              </div>
    </>
  )
}

export default UserCover
