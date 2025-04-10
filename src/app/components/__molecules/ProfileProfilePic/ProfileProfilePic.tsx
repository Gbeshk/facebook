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
interface ProfileProfilePicProps {
  currentUser: User;
  fileInputRef: React.RefObject<HTMLInputElement>;
  handleProfilePictureChange: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => Promise<void>;
}
function ProfileProfilePic({
  currentUser,
  fileInputRef,
  handleProfilePictureChange,
}: ProfileProfilePicProps) {
  return (
    <>
      {currentUser.profilePicture ? (
        <>
          <div className="w-[174px] h-[174px] rounded-full max-md:top-[-70px] border-2 border-white overflow-hidden absolute top-[-60px] max-md:left-[1/2]">
            <Image
              alt="Profile picture"
              width={174}
              height={174}
              src={currentUser.profilePicture}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute flex items-center justify-center cursor-pointer left-[140px] max-md:left-[55%] top-[70px] w-[40px] rounded-[50%] h-[40px] bg-gray-200">
            <div
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center justify-center w-full h-full"
            >
              <i
                aria-hidden="true"
                className="icon"
                style={{
                  backgroundImage:
                    "url(https://static.xx.fbcdn.net/rsrc.php/v4/yW/r/aKcKFdhIVU9.png)",
                  backgroundPosition: "0px -54px",
                  backgroundSize: "auto",
                  width: "20px",
                  height: "20px",
                  backgroundRepeat: "no-repeat",
                  display: "inline-block",
                }}
              />
            </div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleProfilePictureChange}
              accept="image/*"
              className="hidden"
            />
          </div>
        </>
      ) : (
        <div className="max-w-[1250px] mx-auto w-full  h-[462px]  bg-white" />
      )}
    </>
  );
}

export default ProfileProfilePic;
