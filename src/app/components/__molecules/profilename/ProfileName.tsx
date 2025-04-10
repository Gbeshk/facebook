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
}
interface ProfileNameProps {
  currentUser: User;
}
function ProfileName({currentUser} : ProfileNameProps) {
  return (
    <>
       <div className="flex ml-[-20px]  max-md:mt-[100px] max-md:mx-auto max-md:text-center">
              <div className="w-[200px] max-md:hidden"></div>
              <div>
                <h1 className="text-[30px] font-bold">
                  {currentUser.firstName} {currentUser.lastName}
                </h1>
                <p className="text-[#65686C]">
                  Joined{" "}
                  {new Date(currentUser.createdAt).toLocaleDateString("en-US", {
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

export default ProfileName
