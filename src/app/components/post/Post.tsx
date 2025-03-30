"use client";
import React, { useState } from "react";

function Post() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [postText, setPostText] = useState("");



  function Submit(e: React.FormEvent) {
    e.preventDefault();
    console.log("Post Text:", postText);
    setPostText(""); 
    setIsModalOpen(false);  
  }

  return (
    <>
      <div className="w-[50%] h-[124px] bg-white mt-[20px] shadow-lg rounded-lg p-4">
        <div className="flex items-center">
          <div className="w-[40px] h-[40px] rounded-full bg-gray-100 flex justify-center items-center">
            <span className="text-sm">A</span>
          </div>
          <div
            className="w-full h-[40px] bg-gray-100 hover:bg-gray-200 cursor-pointer rounded-[20px] p-2"
            onClick={()=> {
                setIsModalOpen(true);

            }}
          >
            <p className="text-gray-500">What's on your mind?</p>
          </div>
        </div>
        <div className="w-full h-[1px] bg-gray-200 mt-[10px]"></div>
        <div className="flex justify-around mt-[10px] w-full">
          <div className="flex items-center gap-[8px] w-[33%] justify-center cursor-pointer rounded-[8px] hover:bg-gray-100 h-[40px]">
            <div className="w-[24px] h-[24px] bg-[url('https://static.xx.fbcdn.net/rsrc.php/v4/yr/r/c0dWho49-X3.png')] bg-no-repeat bg-contain" />
            <p className="text-[#65686c] font-[15px] font-semibold">
              Live video
            </p>
          </div>
          <div className="flex items-center gap-[8px] w-[33%] justify-center cursor-pointer rounded-[8px] hover:bg-gray-100 h-[40px]">
            <div className="w-[24px] h-[24px] bg-[url('https://static.xx.fbcdn.net/rsrc.php/v4/y7/r/Ivw7nhRtXyo.png')] bg-no-repeat bg-contain" />
            <p className="text-[#65686c] font-[15px] font-semibold">
              Photo/Video
            </p>
          </div>
          <div className="flex items-center gap-[8px] w-[33%] justify-center cursor-pointer rounded-[8px] hover:bg-gray-100 h-[40px]">
            <div className="w-[24px] h-[24px] bg-[url('https://static.xx.fbcdn.net/rsrc.php/v4/yd/r/Y4mYLVOhTwq.png')] bg-no-repeat bg-contain" />
            <p className="text-[#65686c] font-[15px] font-semibold">
              Feeling/Activity
            </p>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50"
          onClick={()=> {
            setIsModalOpen(false);

          }}
        >
          <div
            className="relative bg-white w-[400px] p-6 rounded-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 text-black text-2xl"
              onClick={()=> {
                setIsModalOpen(false);

              }}
            >
              &times;
            </button>
            <h3 className="text-center text-lg font-semibold mb-4">
              Create a Post
            </h3>
            <form onSubmit={Submit}>
              <input
                type="text"
                value={postText}
                onChange={(e)=> {
                    setPostText(e.target.value);

                }}
                placeholder="Write something..."
                className="w-full h-[40px] border border-gray-300 p-2 rounded-md mb-4"
              />
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-md"
              >
                Post
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Post;
