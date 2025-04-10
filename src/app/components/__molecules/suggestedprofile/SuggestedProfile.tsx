import React from "react";
import ImageDiv from "../Imagediv/ImageDiv";
import NameAndButton from "../NameAndButton/NameAndButton";
interface User {
  id: number;
  firstName: string;
  lastName: string;
  profilePicture: string;
  friendRequestsSent: number[];
  friendRequestsReceived: number[];
}
interface SuggestedProfileProps {
  user: User;
  isRequestSent: boolean;
  handleFriendAction: (targetUserId: number) => Promise<void>;
}
function SuggestedProfile({
  user,
  handleFriendAction,
  isRequestSent,
}: SuggestedProfileProps) {
  return (
    <div
      key={user.id}
      className="hover:bg-gray-100 rounded-lg transition-colors"
    >
      <div className="p-3">
        <ImageDiv user={user} />
        <NameAndButton
          user={user}
          handleFriendAction={handleFriendAction}
          isRequestSent={isRequestSent}
        />
      </div>
    </div>
  );
}

export default SuggestedProfile;
