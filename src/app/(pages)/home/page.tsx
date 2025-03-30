import React from "react";
import Header from "@/app/components/Header/Header";
import LeftSide from "@/app/components/leftside/LeftSide";
import Post from "@/app/components/post/Post";
import Slider from "@/app/components/Slider/Slider";
function Home() {
  return (
    <div className="w-full min-h-[100vh] bg-gray-100">
      <Header />
      <div className="flex">
        <LeftSide />
        <div className="flex flex-col w-full">
          <Post />
          <Slider />
        </div>
      </div>
    </div>
  );
}

export default Home;
