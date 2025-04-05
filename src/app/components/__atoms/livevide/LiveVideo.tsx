import React from "react";

function LiveVideo() {
  return (
    <>
      <div className="flex items-center gap-[8px] w-[33%] justify-center cursor-pointer rounded-[8px] hover:bg-gray-100 h-[40px]">
        <div className="w-[24px] h-[24px] bg-[url('https://static.xx.fbcdn.net/rsrc.php/v4/yr/r/c0dWho49-X3.png')] bg-no-repeat bg-contain" />
        <p className="text-[#65686c] text-[15px] font-semibold">Live video</p>
      </div>
    </>
  );
}

export default LiveVideo;
