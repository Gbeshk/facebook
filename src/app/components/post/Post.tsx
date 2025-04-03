"use client";
import React, { useState, useRef, useEffect } from "react";

function Post() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [postText, setPostText] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  interface User {
    id: number;
  }

  const userString = localStorage.getItem("currentUser");
  let currentId: number | undefined;

  if (userString) {
    const user: User = JSON.parse(userString);
    currentId = user.id;
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setIsModalOpen(false);
      }
    };

    if (isModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalOpen]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
    e.preventDefault(); 
  };
  const removeImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
  };

  const Submit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!postText.trim() && !selectedImage) {
      alert("Please write something or add an image before posting");
      return;
    }

    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("userId", currentId?.toString() || "");
    formData.append("content", postText);
    if (selectedImage) {
      formData.append("image", selectedImage);
    }

    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.message || "Failed to create post");
      }

      setPostText("");
      setSelectedImage(null);
      setImagePreview(null);
      setIsModalOpen(false);
      window.location.reload();
    } catch (error) {
      console.error("Post creation error:", error);
      alert("Failed to create post. Check console for details.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="max-w-2xl h-[124px] bg-white mt-[20px] shadow-lg rounded-lg p-4">
        <div className="flex items-center gap-3">
          <div className="w-[40px] h-[40px] rounded-full bg-gray-100 flex justify-center items-center">
            <span className="text-sm">A</span>
          </div>
          <div
            className="w-full h-[40px] bg-gray-100 hover:bg-gray-200 cursor-pointer rounded-[20px] p-2"
            onClick={() => {
              setIsModalOpen(true);
            }}
          >
            <p className="text-gray-500">What&apos;s on your mind?</p>
          </div>
        </div>
        <div className="w-full h-[1px] bg-gray-200 mt-[10px]"></div>
        <div className="flex justify-around mt-[10px] w-full">
          <div className="flex items-center gap-[8px] w-[33%] justify-center cursor-pointer rounded-[8px] hover:bg-gray-100 h-[40px]">
            <div className="w-[24px] h-[24px] bg-[url('https://static.xx.fbcdn.net/rsrc.php/v4/yr/r/c0dWho49-X3.png')] bg-no-repeat bg-contain" />
            <p className="text-[#65686c] text-[15px] font-semibold">
              Live video
            </p>
          </div>
          <div
            className="flex items-center gap-[8px] w-[33%] justify-center cursor-pointer rounded-[8px] hover:bg-gray-100 h-[40px]"
            onClick={() => fileInputRef.current?.click()}
          >
            <div className="w-[24px] h-[24px] bg-[url('https://static.xx.fbcdn.net/rsrc.php/v4/y7/r/Ivw7nhRtXyo.png')] bg-no-repeat bg-contain" />
            <p className="text-[#65686c] text-[15px] font-semibold">
              Photo/Video
            </p>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              accept="image/*"
              className="hidden"
            />
          </div>
          <div className="flex items-center gap-[8px] w-[33%] justify-center cursor-pointer rounded-[8px] hover:bg-gray-100 h-[40px]">
            <div className="w-[24px] h-[24px] bg-[url('https://static.xx.fbcdn.net/rsrc.php/v4/yd/r/Y4mYLVOhTwq.png')] bg-no-repeat bg-contain" />
            <p className="text-[#65686c] text-[15px] font-semibold">
              Feeling/Activity
            </p>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
          <div
            ref={modalRef}
            className="relative bg-white w-[500px] p-6 rounded-lg"
          >
            <button
              className="absolute top-4 right-4 text-black text-2xl"
              onClick={() => {
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
                onChange={(e) => {
                  setPostText(e.target.value);
                }}
                placeholder="Write something..."
                className="w-full h-[40px] border border-gray-300 p-2 rounded-md mb-4"
              />
              {imagePreview && (
                <div className="relative mb-4">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-auto rounded-md"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-2 right-2 bg-black bg-opacity-50 text-white rounded-full w-6 h-6 flex items-center justify-center"
                  >
                    ×
                  </button>
                </div>
              )}
              <div className="border border-gray-200 rounded-lg mx-4 mb-4 p-2 flex justify-between items-center">
                <button
                  type="button" 
                  className="flex items-center gap-1 px-3 py-1 rounded hover:bg-gray-100"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <div className="w-6 h-6 bg-[url('https://static.xx.fbcdn.net/rsrc.php/v3/yC/r/a6OjkIIE-R0.png')] bg-no-repeat bg-contain bg-center"></div>
                  <span className="text-sm">Photo/video</span>
                </button>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-md"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Posting..." : "Post"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Post;
