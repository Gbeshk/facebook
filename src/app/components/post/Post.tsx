"use client"
import React, { useState } from "react";

function Post() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [postText, setPostText] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPostText(e.target.value);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Post Text:", postText);
    if (image) {
      console.log("Image Selected:", image.name);
    } else {
      console.log("No Image Selected.");
    }

    setPostText("");
    setImage(null);
    setImagePreview(null);
    closeModal();
  };

  return (
    <>
      <div className="w-[50%] h-[124px] bg-white mt-[20px] shadow-lg rounded-lg p-4">
        <div className="flex items-center">
          <div className="w-[40px] h-[40px] rounded-full bg-gray-100 flex justify-center items-center">
            <span className="text-sm">A</span>
          </div>
          <div
            className="w-full h-[40px] bg-gray-100 hover:bg-gray-200 cursor-pointer rounded-[20px] p-2"
            onClick={openModal}
          >
            <p className="text-gray-500">What's on your mind?</p>
          </div>
        </div>
        <div className="w-full h-[1px] bg-gray-200 mt-[10px]"></div>
        <div className="flex justify-around mt-[10px] w-full">
          <div className="flex items-center gap-[8px] w-[33%] justify-center cursor-pointer rounded-[8px] hover:bg-gray-100 h-[40px]">
            <div className="w-[24px] h-[24px] bg-[url('https://static.xx.fbcdn.net/rsrc.php/v4/yr/r/c0dWho49-X3.png')] bg-no-repeat bg-contain" />
            <p className="text-[#65686c] font-[15px] font-semibold">Live video</p>
          </div>
          <div className="flex items-center gap-[8px] w-[33%] justify-center cursor-pointer rounded-[8px] hover:bg-gray-100 h-[40px]">
            <div className="w-[24px] h-[24px] bg-[url('https://static.xx.fbcdn.net/rsrc.php/v4/y7/r/Ivw7nhRtXyo.png')] bg-no-repeat bg-contain" />
            <p className="text-[#65686c] font-[15px] font-semibold">Photo/Video</p>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </div>
          <div className="flex items-center gap-[8px] w-[33%] justify-center cursor-pointer rounded-[8px] hover:bg-gray-100 h-[40px]">
            <div className="w-[24px] h-[24px] bg-[url('https://static.xx.fbcdn.net/rsrc.php/v4/yd/r/Y4mYLVOhTwq.png')] bg-no-repeat bg-contain" />
            <p className="text-[#65686c] font-[15px] font-semibold">Feeling/Activity</p>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50" onClick={closeModal}>
          <div className="relative bg-white w-[400px] p-6 rounded-lg" onClick={(e) => e.stopPropagation()}>
            <button
              className="absolute top-4 right-4 text-black text-2xl"
              onClick={closeModal}
            >
              &times;
            </button>
            <h3 className="text-center text-lg font-semibold mb-4">Create a Post</h3>
            <form onSubmit={handlePostSubmit}>
              <input
                type="text"
                value={postText}
                onChange={handleTextChange}
                placeholder="Write something..."
                className="w-full h-[40px] border border-gray-300 p-2 rounded-md mb-4"
              />

              {imagePreview && (
                <div className="mb-4">
                  <img
                    src={imagePreview}
                    alt="Image Preview"
                    className="w-full h-auto object-contain mb-2"
                  />
                </div>
              )}

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
