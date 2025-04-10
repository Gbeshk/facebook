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
interface UserButtonProps {
  currentUser: User | null;
  isFriend: boolean;
  hasSentRequest: boolean;
  viewedUser: User;
  handleFriendAction: (action: "send" | "cancel") => Promise<void>;
}
function UserButton({
  currentUser,
  viewedUser,
  handleFriendAction,
  isFriend,
  hasSentRequest,
}: UserButtonProps) {
  return (
    <>
      {currentUser?.id !== viewedUser.id && (
        <div className="flex gap-2">
          {isFriend ? (
            <button className="px-3 py-1 rounded-md text-sm font-medium w-[209px] h-9 cursor-auto bg-blue-500 text-white">
              Friends
            </button>
          ) : hasSentRequest ? (
            <button
              onClick={() => handleFriendAction("cancel")}
              className="px-3 py-1 rounded-md text-sm font-medium w-[209px] h-9 bg-gray-200 hover:bg-gray-300"
            >
              Cancel Request
            </button>
          ) : (
            <button
              onClick={() => handleFriendAction("send")}
              className="px-3 py-1 rounded-md text-sm font-medium w-[209px] h-9 bg-blue-500 hover:bg-blue-600 text-white"
            >
              Add Friend
            </button>
          )}
        </div>
      )}
    </>
  );
}

export default UserButton;
