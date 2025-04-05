import React from "react";
import LeftSide from "../../__molecules/leftside/LeftSide";
import SuggestedProfile from "../../__molecules/suggestedprofile/SuggestedProfile";
interface User {
  id: number;
  firstName: string;
  lastName: string;
  profilePicture: string;
  friendRequestsSent: number[];
  friendRequestsReceived: number[];
}
interface SuggestedFriendsProps {
  users: User[];
  currentUser: User | null;

  handleFriendAction: (targetUserId: number) => Promise<void>;
}
function SuggestedFriends({
  users,
  currentUser,
  handleFriendAction,
}: SuggestedFriendsProps) {
  return (
    <div className="flex gap-2 bg-gray-100">
      <LeftSide />
      <div className="min-h-screen">
        <div className="rounded-lg overflow-hidden">
          <div className="p-4 border-b">
            <h2 className="font-semibold text-lg">People you may know</h2>
          </div>

          <div className="flex flex-wrap">
            {users.map((user) => {
              const isCurrentUser = user.id === currentUser?.id;
              const isRequestSent =
                currentUser?.friendRequestsSent?.includes(user.id) || false;

              if (isCurrentUser) return null;
              return (
                <SuggestedProfile
                  key={user.id} // Add this line
                  isRequestSent={isRequestSent}
                  handleFriendAction={handleFriendAction}
                  user={user}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SuggestedFriends;
