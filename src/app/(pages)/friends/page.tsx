"use client";
import React, { useState } from "react";
import data from "../../../../data.json";
import { useRouter } from "next/navigation";
import LeftSide from "@/app/components/leftside/LeftSide";

function Friends() {
  const router = useRouter();
  const [friendStatus, setFriendStatus] = useState<Record<number, boolean>>({});

  const toggleFriendStatus = (userId: number) => {
    setFriendStatus((prev) => ({
      ...prev,
      [userId]: !prev[userId],
    }));
  };
  console.log(data);
  
  return (
    <>
      <div className="flex gap-2 bg-gray-100">
        <LeftSide />
        <div className="min-h-screen">
          <div className=" rounded-lg  overflow-hidden">
            <div className="p-4 border-b">
              <h2 className="font-semibold text-lg">People you may know</h2>
            </div>

            <div className="flex flex-wrap">
              {data.map((user) => (
                <div
                  key={user.id}
                  className="hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <div className="p-3">
                    <div className="w-full bg-gray-200 rounded-lg overflow-hidden mb-2 flex items-center justify-center">
                      <span className="text-2xl font-medium w-[200px] h-[200px]">
                        {user.firstName.charAt(0)}
                        {user.lastName.charAt(0)}
                      </span>
                    </div>
                    <div className="text-center">
                      <p className="font-medium">
                        {user.firstName} {user.lastName}
                      </p>
                      <div className="flex justify-center space-x-2 mt-2">
                        <button
                          onClick={() => toggleFriendStatus(user.id)}
                          className={`text-white px-3 py-1 rounded-md text-sm font-medium w-[90%]
    ${
      friendStatus[user.id]
        ? "bg-white text-blue-500 hover:bg-gray-200"
        : "bg-blue-500 hover:bg-blue-600"
    }`}
                        >
                          {friendStatus[user.id] ? "Cancel" : "Add friend"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Friends;
