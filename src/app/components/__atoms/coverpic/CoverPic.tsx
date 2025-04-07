import Image from "next/image";
import React, { useRef } from "react";
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
    birthDate: string;
    gender: string;
    profilePicture: string;
    coverPhoto?: string;
    createdAt: string;
    posts: Post[];
    year: number;
    month: number;
  }
interface CoverPicProps {
  currentUser: User;
  onCoverPhotoUpdate: (newCover: string) => void;
}

function CoverPic({ currentUser, onCoverPhotoUpdate }: CoverPicProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCoverChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;

    try {
      const formData = new FormData();
      formData.append("userId", currentUser.id.toString());
      formData.append("file", e.target.files[0]);

      const response = await fetch("/api/users/update-cover-photo", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Update failed");
      
      const result = await response.json();
      onCoverPhotoUpdate(result.coverPhoto);
      
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Cover photo update error:", error);
      alert("Failed to update cover photo");
    }
  };

  return (
    <div className="relative group max-w-[1250px] mx-auto h-[462px]">
      <div className="w-full h-full overflow-hidden rounded-bl-[10px] rounded-br-[10px]">
        {currentUser.coverPhoto ? (
          <Image
            src={currentUser.coverPhoto}
            alt="Cover photo"
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-200" />
        )}
      </div>

      <div className="absolute inset-0 flex items-end justify-end p-4  transition-opacity">
        <button
          className="flex items-center gap-2 bg-white/90 px-4 py-2 rounded-lg shadow-md hover:bg-white transition-all"
          onClick={() => fileInputRef.current?.click()}
        >
          <i
                aria-hidden="true"
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
          <span className="text-sm font-medium">Change Cover Photo</span>
        </button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleCoverChange}
          accept="image/*"
          className="hidden"
        />
      </div>
    </div>
  );
}

export default CoverPic;