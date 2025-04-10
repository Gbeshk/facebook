import React from "react";

function FeelingActivity() {
  return (
      <div className="flex items-center gap-[8px] w-[33%] justify-center cursor-pointer rounded-[8px] hover:bg-gray-100 h-[40px]">
        <div className="w-[24px] h-[24px] bg-[url('https://static.xx.fbcdn.net/rsrc.php/v4/yd/r/Y4mYLVOhTwq.png')] bg-no-repeat bg-contain shrink-0" />
        <p className="text-[#65686c] text-[15px] max-sm:text-[13px] font-semibold  ">
          Feeling/Activity
        </p>
      </div>
  );
}

export default FeelingActivity;
