"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";

type CommentModalProps = {
  postId: number;
  comments: string[];
  onClose: () => void;
  onSubmitComment: (comment: string) => void;
  currentUserId: number | null;
  users: User[];
};

type User = {
  id: number;
  firstName: string;
  lastName: string;
  profilePicture?: string;
};

const CommentModal = ({
  comments,
  onClose,
  onSubmitComment,
  currentUserId,
  users,
}: CommentModalProps) => {
  const [newComment, setNewComment] = React.useState("");
  const modalRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (overlayRef.current && event.target === overlayRef.current) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim() && currentUserId) {
      onSubmitComment(newComment);
      setNewComment("");
    }
  };

  const parsedComments = comments.map((comment) => {
    const [userId, ...contentParts] = comment.split(":");
    const user = users.find((u) => u.id === parseInt(userId));
    return {
      userId: parseInt(userId),
      content: contentParts.join(":"),
      user: user || {
        firstName: "Unknown",
        lastName: "User",
        profilePicture: "",
      },
    };
  });

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 bg-gray- bg-opacity-50 flex justify-center items-center z-50"
    >
      <div
        ref={modalRef}
        className="relative bg-white w-[500px]  p-6 rounded-lg "
      >
        <button
          className="absolute top-4 right-4 text-black text-2xl hover:text-gray-600"
          onClick={onClose}
        >
          &times;
        </button>
        <h3 className="text-center text-lg font-semibold mb-4">Comments</h3>

        <div className="h-96 overflow-y-auto mb-4 space-y-4 pr-2">
          {parsedComments.length === 0 ? (
            <p className="text-gray-500 text-center">No comments yet</p>
          ) : (
            parsedComments.map((comment, index) => (
              <div key={index} className="flex  gap-3 items-center">
                <div className="flex-shrink-0">
                  <Image
                    width={40}
                    height={40}
                    src={comment.user.profilePicture || "/default-avatar.png"}
                    alt="Profile"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </div>
                <div className="bg-gray-100 p-3 rounded-lg flex-1">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="font-semibold">
                      {comment.user.firstName} {comment.user.lastName}
                    </span>
                  </div>
                  <p className="text-gray-800">{comment.content}</p>
                </div>
              </div>
            ))
          )}
        </div>

        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
            className="w-full h-[40px] border border-gray-300 bg-white p-2 rounded-md"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md whitespace-nowrap hover:bg-blue-600 transition-colors"
          >
            Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default CommentModal;
