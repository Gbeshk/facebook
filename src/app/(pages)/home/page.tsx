import React from "react";
import LeftSide from "@/app/components/leftside/LeftSide";
import Post from "@/app/components/post/Post";
import Slider from "@/app/components/Slider/Slider";
import AllPosts from "@/app/components/allposts/AllPosts";
function Home() {
  return (
    <>
      <div className="w-full min-h-[100vh] bg-gray-100">
        <div className="flex">
          <LeftSide />
          <div className="flex flex-col w-full">
            <Post />
            <Slider />
            <AllPosts />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
