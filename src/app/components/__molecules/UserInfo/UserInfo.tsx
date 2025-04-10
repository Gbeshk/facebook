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
  
interface UserProfilePicProps{
    viewedUser: User
}
function UserInfo({viewedUser}:UserProfilePicProps) {
  return (
    <>
         <div className="flex ml-[-20px] max-md:ml-0 max-md:text-center max-md:mt-[100px]">
            <div className="w-[200px] max-md:hidden"></div>
            <div>
              <h1 className="text-[30px] font-bold">
                {viewedUser.firstName} {viewedUser.lastName}
              </h1>
              <p className="text-[#65686C]">
                Joined{" "}
                {new Date(viewedUser.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>
    </>
  )
}

export default UserInfo
