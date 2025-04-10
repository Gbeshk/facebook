"use client";
import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  profilePicture: string;
  friendRequestsSent: number[];
  friendRequestsReceived: number[];
}

interface ImageDivProps {
  user: User;
}

function ImageDiv({ user }: ImageDivProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/users/${user.id}`);
  };

  return (
    <div
      className="w-full bg-gray-200 rounded-lg overflow-hidden mb-2 flex items-center justify-center cursor-pointer"
      onClick={handleClick}
    >
      <Image
        width={100}
        height={100}
        src={user.profilePicture}
        alt={`${user.firstName} ${user.lastName}`}
        className="w-full h-full object-cover rounded-lg"
        style={{ width: "200px", height: "200px" }}
      />
    </div>
  );
}

export default ImageDiv;
