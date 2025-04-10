"use client";
import React from "react";

type CommentButtonProps = {
  onClick: () => void;
};

function CommentButton({ onClick }: CommentButtonProps) {
  return (
    <button
      onClick={onClick}
      className="flex-1 py-2 flex items-center justify-center space-x-1 hover:bg-gray-100  transition-colors duration-200"
    >
      <i
        className="inline-block w-[20px] h-[20px] bg-no-repeat icon "
        style={{
          backgroundImage:
            'url("https://static.xx.fbcdn.net/rsrc.php/v4/y6/r/olX2yf1iinG.png")',
          backgroundPosition: "0px -588px",
        }}
      ></i>
      <span className="font-semibold text-gray-800 ">Comment</span>
    </button>
  );
}

export default CommentButton;
