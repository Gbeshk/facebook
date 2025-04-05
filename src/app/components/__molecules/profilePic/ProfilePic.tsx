import Image from "next/image";
import React from "react";
interface ProfilePicProps {
  user: {
    id: number;
    firstName: string;
    lastName: string;
    profilePicture?: string;
  } | null;
  getUserInitials: () => string;
}
function ProfilePic({ user, getUserInitials }: ProfilePicProps) {
  return (
    <>
      <div className="w-[40px] h-[40px] rounded-full overflow-hidden bg-gray-100">
        {user?.profilePicture ? (
          <Image
          width={100}
          height={100}
            src={user.profilePicture}
            alt={`${user.firstName} ${user.lastName}`}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-sm font-medium text-gray-600">
              {getUserInitials()}
            </span>
          </div>
        )}
      </div>
    </>
  );
}

export default ProfilePic;
