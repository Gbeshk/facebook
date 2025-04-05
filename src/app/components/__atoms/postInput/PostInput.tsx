import React from "react";
interface PostInputProps {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
function PostInput({ setIsModalOpen }: PostInputProps) {
  return (
    <>
      <div
        className="w-full h-[40px] bg-gray-100 hover:bg-gray-200 cursor-pointer rounded-[20px] p-2"
        onClick={() => setIsModalOpen(true)}
      >
        <p className="text-gray-500">What&apos;s on your mind?</p>
      </div>
    </>
  );
}

export default PostInput;
