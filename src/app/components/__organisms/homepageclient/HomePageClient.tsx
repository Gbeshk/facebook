"use client";
import React, { useEffect } from "react";
import LeftSide from "../../__molecules/leftside/LeftSide";
import Post from "../post/Post";
import Slider from "../../__molecules/Slider/Slider";
import AllPosts from "../../__molecules/allposts/AllPosts";
import RightSide from "../../__molecules/rightside/RightSide";
import { useRouter } from "next/navigation";

function HomePageClient() {
  const router = useRouter();

  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");
    if (!currentUser) {
      router.push("/signin");
    }
  }, [router]);

  return (
    <>
      <div className="w-full min-h-[100vh] bg-gray-100 max-lg:px-4">
        <div className="flex items-center justify-center">
          <div className="flex max-w-[1800px] w-full justify-between">
            <div className="block  max-lg:hidden lg:max-w-[400px] lg:w-full">
              <LeftSide />
            </div>
            <div className="flex flex-col max-w-2xl w-full">
              <Post />
              <Slider/>
              <AllPosts />
            </div>
            <div className="max-md:hidden inline-block  max-w-[400px] w-full">
              <RightSide />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePageClient;
