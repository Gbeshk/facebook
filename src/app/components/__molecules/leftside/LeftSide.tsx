"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

function LeftSide() {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [user, setUser] = useState<{
    id: string;
    firstName: string;
    lastName: string;
    profilePicture: string;
  } | null>(null);

  useEffect(() => {
    setIsClient(true);
    const userString = localStorage.getItem("currentUser");
    if (!userString) {
      router.push("/signin");
      return;
    }

    try {
      const parsedUser = JSON.parse(userString);
      setUser(parsedUser);
    } catch (error) {
      console.error("Error parsing user data:", error);
      router.push("/signin");
    }
  }, [router]);

  if (!isClient) {
    return (
      <div className="p-[16px] max-w-[400px] w-full">
        <div className="animate-pulse space-y-4">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="flex items-center h-[52px] gap-[16px]">
              <div className="w-[36px] h-[36px] rounded-full bg-gray-200"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="p-[16px] max-w-[400px] w-full">
      <div
        onClick={() => router.push("/profile")}
        className="flex items-center h-[52px] hover:bg-gray-200 rounded-[10px] max-w-[330px] w-full cursor-pointer gap-[16px]"
      >
        <div className="w-[36px] h-[36px] rounded-full overflow-hidden">
          <Image
            width={36}
            height={36}
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
        onClick={() => router.push("/friends")}
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
        onClick={() => router.push("/saved")}
        className="flex items-center h-[52px] hover:bg-gray-200 rounded-[10px] max-w-[330px] w-full cursor-pointer gap-[16px]"
      >
        <div className="bg-[url('https://static.xx.fbcdn.net/rsrc.php/v4/yw/r/-GSeaf19sqF.png')] bg-[0_-185px] w-[36px] h-[36px] bg-no-repeat"></div>
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