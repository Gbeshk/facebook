import React from "react";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  profilePicture: string;
  friendRequestsSent: number[];
  friendRequestsReceived: number[];
}

interface NameAndButtonProps {
  user: User;
  handleFriendAction: (targetUserId: number) => Promise<void>;
  isRequestSent: boolean;
}
function NameAndButton({
  user,
  handleFriendAction,
  isRequestSent,
}: NameAndButtonProps) {
  return (
    <div className="text-center">
      <p className="font-medium">
        {user.firstName} {user.lastName}
      </p>
      <div className="flex justify-center space-x-2 mt-2">
        <button
          onClick={() => handleFriendAction(user.id)}
          className={`px-3 py-1 rounded-md text-sm font-medium w-[90%] ${
            isRequestSent
              ? "bg-gray-200 text-black hover:bg-gray-300"
              : "bg-blue-500 hover:bg-blue-600 text-white"
          }`}
        >
          {isRequestSent ? "Cancel" : "Add friend"}
        </button>
      </div>
    </div>
  );
}

export default NameAndButton;
