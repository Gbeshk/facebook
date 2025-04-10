import React from "react";
import LeftSide from "../../__molecules/leftside/LeftSide";
import SuggestedProfile from "../../__molecules/suggestedprofile/SuggestedProfile";
import { usePathname } from "next/navigation";
import ImageDiv from "../../__molecules/Imagediv/ImageDiv";
import RightSide from "../../__molecules/rightside/RightSide";
interface User {
  id: number;
  firstName: string;
  lastName: string;
  profilePicture: string;
  friends: number[];
  friendRequestsSent: number[];
  friendRequestsReceived: number[];
}
interface SuggestedFriendsProps {
  users: Array<User & { friends: number[] }>;
  currentUser: (User & { friends: number[] }) | null;
  handleFriendAction: (targetUserId: number) => Promise<void>;
}

function SuggestedFriends({
  users,
  currentUser,
  handleFriendAction,
}: SuggestedFriendsProps) {
  const pathname = usePathname();
  const isProfilePage = pathname.includes("/profile");

  const friends = currentUser
    ? users.filter(
        (user) =>
          currentUser.friends?.includes(user.id) && user.id !== currentUser.id
      )
    : [];

  const nonFriends = currentUser
    ? users.filter(
        (user) =>
          !currentUser.friends.includes(user.id) && user.id !== currentUser.id
      )
    : users;
  return (
    <>
      <div className="flex items-center justify-center">
        <div className="flex n w-[1900px]  rounded-lg bg-white mt-6">
          {!isProfilePage && (
            <div className="block  max-lg:hidden lg:max-w-[400px] lg:w-full">
              <LeftSide />
            </div>
          )}
          <div className="min-h-screen">
            <div className="rounded-lg overflow-hidden">
              {friends.length > 0 && (
                <>
                  <div className="mx-auto">
                    <h2 className="font-bold text-3xl mt-6 ml-3">Friends</h2>
                  </div>
                  <div className="flex flex-wrap mt-2">
                    {friends.map((user) => (
                      <div
                        key={user.id}
                        className="hover:bg-gray-100 rounded-lg transition-colors "
                      >
                        <div className="p-3">
                          <ImageDiv user={user} />
                          <div className="text-center">
                            <p className="font-medium">
                              {user.firstName} {user.lastName}
                            </p>
                            <div className="flex justify-center space-x-2 mt-2">
                              <button className="px-3 py-1 rounded-md text-sm font-medium w-[90%] bg-blue-500 hover:bg-blue-600 text-white">
                                Friends
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {nonFriends.length > 0 && (
                <div>
                  <div className="mt-4">
                    <h2 className="font-bold text-3xl ml-3">
                      People you may know
                    </h2>
                  </div>
                  <div className="flex flex-wrap">
                    {nonFriends.map((user) => {
                      const isRequestSent =
                        currentUser?.friendRequestsSent?.includes(user.id) ||
                        false;
                      return (
                        <SuggestedProfile
                          key={user.id}
                          user={user}
                          isRequestSent={isRequestSent}
                          handleFriendAction={handleFriendAction}
                        />
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
          {!isProfilePage && (
            <div className="max-md:hidden inline-block  max-w-[400px] w-full">
              <RightSide />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default SuggestedFriends;
