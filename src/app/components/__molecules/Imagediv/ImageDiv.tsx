import React from "react";
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
  return (
    <div className="w-full bg-gray-200 rounded-lg overflow-hidden mb-2 flex items-center justify-center">
      <img
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
