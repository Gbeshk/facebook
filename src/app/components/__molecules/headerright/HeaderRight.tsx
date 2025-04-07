"use client";
import React, { useState } from "react";

export interface Post {
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

export interface User {
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
  friendRequestsReceived: number[];
  friends: number[];
}

interface HeaderRightProps {
  currentUser: User;
  allUsers: User[];
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;
  setAllUsers: React.Dispatch<React.SetStateAction<User[]>>;
}

function HeaderRight({
  currentUser,
  allUsers,
  setCurrentUser,
  setAllUsers,
}: HeaderRightProps) {
  const [selectedIcon, setSelectedIcon] = useState<number | null>(null);

  const incomingRequests = currentUser.friendRequestsReceived
    .map((requestId) => allUsers.find((user) => user.id === requestId))
    .filter((user): user is User => !!user);

  const handleFriendAction = async (
    senderId: number,
    action: "accept" | "ignore"
  ) => {
    try {
      const response = await fetch("/api/friends", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          senderId: senderId,
          receiverId: currentUser.id,
          action: action,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Action failed");
      }

      const updatedUsers = await fetch("/api/users").then((res) => res.json());
      setAllUsers(updatedUsers);

      const updatedCurrentUser = updatedUsers.find(
        (u: User) => u.id === currentUser.id
      );
      if (updatedCurrentUser) {
        setCurrentUser(updatedCurrentUser);
        localStorage.setItem("currentUser", JSON.stringify(updatedCurrentUser));
      }
    } catch (error) {
      console.error("Friend request error:", error);
      alert(
        error instanceof Error ? error.message : "Failed to process request"
      );
    }
  };

  return (
    <div className="flex items-center justify-center gap-[10px] relative">
      <div className="w-[105px] h-[36px] bg-gray-200 flex items-center justify-center rounded-[20px]">
        <a href="/friends" className="text-black font-semibold">
          Find friends
        </a>
      </div>

      <div className="w-[40px] h-[40px] rounded-[50%] flex items-center justify-center cursor-pointer bg-gray-200">
        <svg
          viewBox="0 0 12 12"
          width="20"
          height="20"
          fill="currentColor"
          aria-hidden="true"
        >
          <g stroke="none" stroke-width="1" fill-rule="evenodd">
            <path
              d="m106.868 921.248-1.892 2.925a.32.32 0 0 1-.443.094l-1.753-1.134a.2.2 0 0 0-.222.003l-1.976 1.363c-.288.199-.64-.143-.45-.437l1.892-2.925a.32.32 0 0 1 .443-.095l1.753 1.134a.2.2 0 0 0 .222-.003l1.976-1.363c.288-.198.64.144.45.438m-3.368-4.251c-3.323 0-5.83 2.432-5.83 5.658 0 1.642.652 3.128 1.834 4.186a.331.331 0 0 1 .111.234l.03 1.01a.583.583 0 0 0 .82.519l1.13-.5a.32.32 0 0 1 .22-.015c.541.148 1.108.223 1.685.223 3.323 0 5.83-2.432 5.83-5.657 0-3.226-2.507-5.658-5.83-5.658"
              transform="translate(-450 -1073.5) translate(352.5 156.845)"
            ></path>
          </g>
        </svg>
      </div>

      <div className="w-[40px] h-[40px] rounded-[50%] flex items-center justify-center cursor-pointer bg-gray-200">
        <svg
          viewBox="0 0 24 24"
          width="20"
          height="20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M18.5 1A1.5 1.5 0 0 0 17 2.5v3A1.5 1.5 0 0 0 18.5 7h3A1.5 1.5 0 0 0 23 5.5v-3A1.5 1.5 0 0 0 21.5 1h-3zm0 8a1.5 1.5 0 0 0-1.5 1.5v3a1.5 1.5 0 0 0 1.5 1.5h3a1.5 1.5 0 0 0 1.5-1.5v-3A1.5 1.5 0 0 0 21.5 9h-3zm-16 8A1.5 1.5 0 0 0 1 18.5v3A1.5 1.5 0 0 0 2.5 23h3A1.5 1.5 0 0 0 7 21.5v-3A1.5 1.5 0 0 0 5.5 17h-3zm8 0A1.5 1.5 0 0 0 9 18.5v3a1.5 1.5 0 0 0 1.5 1.5h3a1.5 1.5 0 0 0 1.5-1.5v-3a1.5 1.5 0 0 0-1.5-1.5h-3zm8 0a1.5 1.5 0 0 0-1.5 1.5v3a1.5 1.5 0 0 0 1.5 1.5h3a1.5 1.5 0 0 0 1.5-1.5v-3a1.5 1.5 0 0 0-1.5-1.5h-3zm-16-8A1.5 1.5 0 0 0 1 10.5v3A1.5 1.5 0 0 0 2.5 15h3A1.5 1.5 0 0 0 7 13.5v-3A1.5 1.5 0 0 0 5.5 9h-3zm0-8A1.5 1.5 0 0 0 1 2.5v3A1.5 1.5 0 0 0 2.5 7h3A1.5 1.5 0 0 0 7 5.5v-3A1.5 1.5 0 0 0 5.5 1h-3zm8 0A1.5 1.5 0 0 0 9 2.5v3A1.5 1.5 0 0 0 10.5 7h3A1.5 1.5 0 0 0 15 5.5v-3A1.5 1.5 0 0 0 13.5 1h-3zm0 8A1.5 1.5 0 0 0 9 10.5v3a1.5 1.5 0 0 0 1.5 1.5h3a1.5 1.5 0 0 0 1.5-1.5v-3A1.5 1.5 0 0 0 13.5 9h-3z"></path>
        </svg>
      </div>

      <div className="relative">
        <div
          className="w-[40px] h-[40px] rounded-[50%] flex items-center justify-center cursor-pointer bg-gray-200"
          onClick={() => setSelectedIcon((prev) => (prev === 2 ? null : 2))}
        >
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
            <path d="M3 9.5a9 9 0 1 1 18 0v2.927c0 1.69.475 3.345 1.37 4.778a1.5 1.5 0 0 1-1.272 2.295h-4.625a4.5 4.5 0 0 1-8.946 0H2.902a1.5 1.5 0 0 1-1.272-2.295A9.01 9.01 0 0 0 3 12.43V9.5zm6.55 10a2.5 2.5 0 0 0 4.9 0h-4.9z" />
          </svg>
        </div>

        {selectedIcon === 2 && (
          <div className="absolute top-12 right-0 w-[360px] bg-white rounded-lg shadow-lg border border-gray-200 z-50">
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-4">Friend Requests</h3>
              {incomingRequests.length === 0 ? (
                <p className="text-gray-500 text-center py-4">
                  No new requests
                </p>
              ) : (
                <div className="space-y-4">
                  {incomingRequests.map((user) => (
                    <div
                      key={user.id}
                      className="flex items-center justify-between p-2 hover:bg-gray-50 rounded"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={user.profilePicture}
                          alt={`${user.firstName}'s profile`}
                          width={40}
                          height={40}
                          className="rounded-full w-10 h-10 object-cover"
                        />
                        <span className="font-medium">
                          {user.firstName} {user.lastName}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleFriendAction(user.id, "accept")}
                          className="px-3 py-1 bg-blue-500 text-white rounded-full hover:bg-blue-600 text-sm"
                        >
                          Confirm
                        </button>
                        <button
                          onClick={() => handleFriendAction(user.id, "ignore")}
                          className="px-3 py-1 bg-gray-200 text-black rounded-full hover:bg-gray-300 text-sm"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default HeaderRight;
