"use client";
import React, { useState, useRef, useEffect } from "react";
import ProfilePic from "../../__molecules/profilePic/ProfilePic";
import PostInput from "../../__atoms/postInput/PostInput";
import LiveVideo from "../../__atoms/livevide/LiveVideo";
import AddPhoto from "../../__atoms/AddPhoto/AddPhoto";
import FeelingActivity from "../../__atoms/feelingactivity/FeelingActivity";
import Modal from "../../__molecules/Modal/Modal";

function Post() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [postText, setPostText] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const [user, setUser] = useState<{
    id: number;
    firstName: string;
    lastName: string;
    profilePicture?: string;
  } | null>(null);

  useEffect(() => {
    const userString = localStorage.getItem("currentUser");
    if (userString) {
      try {
        const userData = JSON.parse(userString);
        setUser({
          id: userData.id,
          firstName: userData.firstName,
          lastName: userData.lastName,
          profilePicture: userData.profilePicture,
        });
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

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
    window.location.reload();
  };

  const Submit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!postText.trim() && !selectedImage) {
      alert("Please write something or add an image before posting");
      return;
    }

    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("userId", user?.id.toString() || "");
    formData.append("content", postText);
    if (selectedImage) {
      formData.append("image", selectedImage);
    }

    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to create post");
      }


      setPostText("");
      setSelectedImage(null);
      setImagePreview(null);
      setIsModalOpen(false);
      window.location.reload();
    } catch (error) {
      console.error("Post creation error:", error);
      alert("Failed to create post. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getUserInitials = () => {
    if (!user) return "?";
    return `${user.firstName?.charAt(0) || ""}${
      user.lastName?.charAt(0) || ""
    }`;
  };

  return (
    <>
      <div className="max-w-2xl h-[124px] bg-white mt-[20px] shadow-lg rounded-lg p-4">
        <div className="flex items-center gap-3">
          <ProfilePic user={user} getUserInitials={getUserInitials} />
          <PostInput setIsModalOpen={setIsModalOpen} />
        </div>
        <div className="w-full h-[1px] bg-gray-200 mt-[10px]"></div>
        <div className="flex justify-around mt-[10px] w-full">
          <LiveVideo />
          <AddPhoto
            fileInputRef={fileInputRef}
            handleImageChange={handleImageChange}
          />
          <FeelingActivity />
        </div>
      </div>
      <Modal
        isModalOpen={isModalOpen}
        modalRef={modalRef}
        setIsModalOpen={setIsModalOpen}
        Submit={Submit}
        postText={postText}
        setPostText={setPostText}
        imagePreview={imagePreview}
        removeImage={removeImage}
        fileInputRef={fileInputRef}
        isSubmitting={isSubmitting}
      />
    </>
  );
}

export default Post;
