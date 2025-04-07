"use client";
import React from "react";

function LeftSide() {
  const userString =
    typeof window !== "undefined" ? localStorage.getItem("currentUser") : null;
  const user = userString ? JSON.parse(userString) : null;

  return (
    <div className="p-[16px] max-w-[400px] w-full">
      <div
        onClick={() => {
          window.location.href = "/profile";
        }}
        className="flex items-center h-[52px] hover:bg-gray-200 rounded-[10px] max-w-[330px] w-full cursor-pointer gap-[16px] "
      >
        <div className="w-[36px] h-[36px] rounded-full overflow-hidden">
          <img
          width={100}
          height={100}
            src={user.profilePicture}
            alt={`${user.firstName} ${user.lastName}`}
            className="w-full h-full object-cover"
          />
        </div>
        <span className="font-medium text-black">
          {user.firstName} {user.lastName}
        </span>
      </div>

      <div
        onClick={() => {
          window.location.href = "/friends";
        }}
        className="flex items-center h-[52px] hover:bg-gray-200 rounded-[10px] max-w-[330px] w-full cursor-pointer gap-[16px]"
      >
        <div className="bg-[url('https://static.xx.fbcdn.net/rsrc.php/v4/yw/r/-GSeaf19sqF.png')] bg-[0_-333px] w-[36px] h-[36px]"></div>
        <span className="font-medium text-black">Friends</span>
      </div>
      <div className="flex items-center h-[52px] hover:bg-gray-200 rounded-[10px] max-w-[330px] w-full cursor-pointer gap-[16px]">
        <div className="bg-[url('https://static.xx.fbcdn.net/rsrc.php/v4/yF/r/EUunrXTPe6i.png')] bg-[0_-37px] w-[36px] h-[36px] bg-no-repeat"></div>
        <span className="font-medium text-black">Welcome</span>
      </div>
      <div className="flex items-center h-[52px] hover:bg-gray-200 rounded-[10px] max-w-[330px] w-full cursor-pointer gap-[16px]">
        <div className="bg-[url('https://static.xx.fbcdn.net/rsrc.php/v4/yw/r/-GSeaf19sqF.png')] bg-[0_-481px] w-[36px] h-[36px] bg-no-repeat inline-block"></div>
        <span className="font-medium text-black">Memories</span>
      </div>
      <div
        onClick={() => {
          window.location.href = "/saved";
        }}
        className="flex items-center h-[52px] hover:bg-gray-200 rounded-[10px] max-w-[330px] w-full cursor-pointer gap-[16px]"
      >
        <div className="bg-[url('https://static.xx.fbcdn.net/rsrc.php/v4/yw/r/-GSeaf19sqF.png')] bg-[0_-185px] w-[36px] h-[36px] bg-no-repeat"></div>{" "}
        <span className="font-medium text-black">Saved</span>
      </div>
      <div className="flex items-center h-[52px] hover:bg-gray-200 rounded-[10px] max-w-[330px] w-full cursor-pointer gap-[16px]">
        <div className="bg-[url('https://static.xx.fbcdn.net/rsrc.php/v4/yw/r/-GSeaf19sqF.png')] bg-[0_-37px] w-[36px] h-[36px] bg-no-repeat"></div>
        <span className="font-medium text-black">Groups</span>
      </div>
      <div className="flex items-center h-[52px] hover:bg-gray-200 rounded-[10px] max-w-[330px] w-full cursor-pointer gap-[16px]">
        <div className="bg-[url('https://static.xx.fbcdn.net/rsrc.php/v4/yw/r/-GSeaf19sqF.png')] bg-[0_-555px] w-[36px] h-[36px] bg-no-repeat"></div>
        <span className="font-medium text-black">Video</span>
      </div>
      <div className="flex items-center h-[52px] hover:bg-gray-200 rounded-[10px] max-w-[330px] w-full cursor-pointer gap-[16px]">
        <div className="bg-[url('https://static.xx.fbcdn.net/rsrc.php/v4/yw/r/-GSeaf19sqF.png')] bg-[0_-444px] w-[36px] h-[36px] bg-no-repeat"></div>
        <span className="font-medium text-black">Marketplace</span>
      </div>
      <div className="flex items-center h-[52px] hover:bg-gray-200 rounded-[10px] max-w-[330px] w-full cursor-pointer gap-[16px]">
        <div className="bg-[url('https://static.xx.fbcdn.net/rsrc.php/v4/yb/r/eECk3ceTaHJ.png')] w-[36px] h-[36px]"></div>
        <span className="font-medium text-black">Feeds</span>
      </div>
      <div className="flex items-center h-[52px] hover:bg-gray-200 rounded-[10px] max-w-[330px] w-full cursor-pointer gap-[16px]">
        <div className="bg-[url('https://static.xx.fbcdn.net/rsrc.php/v4/yw/r/-GSeaf19sqF.png')] bg-[0_-296px] w-[36px] h-[36px]"></div>
        <span className="font-medium text-black">Events</span>
      </div>
      <div className="flex items-center h-[52px] hover:bg-gray-200 rounded-[10px] max-w-[330px] w-full cursor-pointer gap-[16px]">
        <div className="bg-[url('https://static.xx.fbcdn.net/rsrc.php/v4/yN/r/ATlxuj_J5ty.png')] w-[36px] h-[36px] bg-cover"></div>
        <span className="font-medium text-black">Ads Manager</span>
      </div>
    </div>
  );
}

export default LeftSide;
