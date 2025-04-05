"use client";

import React from "react";
type Post = {
  id: number;
  userId: number;
  content: string;
  imageUrl?: string;
  createdAt: string;
  likes: number;
  likedBy: number[];
  comments: string[];
  savedBy: number[];
  author?: string;
  authorPic?: string;
  authorId?: number;
  isSaved: boolean
};
interface SavedButtonProps {
  handleSave: (postId: number) => Promise<void>;

  post: Post;
}
function SaveButton({ handleSave, post }: SavedButtonProps) {
  return (
    <>
      <button
        onClick={() => handleSave(post.id)}
        className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100"
        aria-label={post.isSaved ? "Unsave post" : "Save post"}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill={post.isSaved ? "currentColor" : "none"}
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
          />
        </svg>
      </button>
    </>
  );
}

export default SaveButton;
