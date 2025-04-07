import React from "react";
import LeftSide from "@/app/components/__molecules/leftside/LeftSide";
import Post from "@/app/components/__organisms/post/Post";
import AllPosts from "@/app/components/__molecules/allposts/AllPosts";
import Slider from "@/app/components/__molecules/Slider/Slider";
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
