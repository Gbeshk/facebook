"use client";
import React, { useState, useEffect } from "react";
import SaveButton from "../../__atoms/savedbutton/SaveButton";
import PostHeader from "../postheader/PostHeader";
import PostContent from "../../__atoms/PostContent/PostContent";
import NumberOfLikes from "../NumberOfLikes/NumberOfLikes";
import LikeButton from "../../__atoms/Likebutton/LikeButton";
import ShareButton from "../../__atoms/sharebutton/ShareButton";
import CommentButton from "../../__atoms/CommentButton/CommentButton";

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
};

type User = {
  id: number;
  firstName: string;
  lastName: string;
  profilePicture?: string;
  posts?: Post[];
};

export default function AllPosts() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);

  useEffect(() => {
    const userString = localStorage.getItem("currentUser");
    if (userString) {
      try {
        const user = JSON.parse(userString);
        setCurrentUserId(user.id);
      } catch (e) {
        console.error("Error parsing user:", e);
      }
    }

    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/posts");
        if (!response.ok)
          throw new Error(`Failed to fetch posts: ${response.status}`);
        const data = await response.json();

        if (!data.users) throw new Error("No users data received");

        setUsers(
          data.users.map((user: User) => ({
            ...user,
            posts:
              user.posts?.map((post) => ({
                ...post,
                likedBy: post.likedBy || [],
                savedBy: post.savedBy || [],
              })) || [],
          }))
        );
      } catch (error) {
        setError(error instanceof Error ? error.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleLike = async (postId: number) => {
    if (!currentUserId) return;

    try {
      const response = await fetch("/api/posts/like", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postId, userId: currentUserId }),
      });

      if (!response.ok) throw new Error("Like failed");

      setUsers((prevUsers) =>
        prevUsers.map((user) => ({
          ...user,
          posts: user.posts?.map((post) => {
            if (post.id === postId) {
              const isLiked = post.likedBy.includes(currentUserId);
              return {
                ...post,
                likes: isLiked ? post.likes - 1 : post.likes + 1,
                likedBy: isLiked
                  ? post.likedBy.filter((id) => id !== currentUserId)
                  : [...post.likedBy, currentUserId],
              };
            }
            return post;
          }),
        }))
      );
    } catch (error) {
      console.error("Like error:", error);
    }
  };

  const handleSave = async (postId: number) => {
    if (!currentUserId) return;

    try {
      const response = await fetch("/api/posts/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postId, userId: currentUserId }),
      });

      if (!response.ok) throw new Error("Save failed");
      const result = await response.json();

      setUsers((prevUsers) =>
        prevUsers.map((user) => ({
          ...user,
          posts: user.posts?.map((post) => {
            if (post.id === postId) {
              return {
                ...post,
                savedBy: result.isSaved
                  ? [...post.savedBy, currentUserId]
                  : post.savedBy.filter((id) => id !== currentUserId),
              };
            }
            return post;
          }),
        }))
      );
    } catch (error) {
      console.error("Save error:", error);
    }
  };

  if (loading)
    return (
      <div className="max-w-2xl mt-[20px] text-center">Loading posts...</div>
    );
  if (error)
    return (
      <div className="max-w-2xl mt-[20px] text-center text-red-500">
        Error: {error}
      </div>
    );

  const allPosts = users
    .flatMap(
      (user) =>
        user.posts?.map((post) => ({
          ...post,
          author: `${user.firstName} ${user.lastName}`,
          authorPic: user.profilePicture,
          isLiked: post.likedBy.includes(currentUserId || 0),
          isSaved: post.savedBy.includes(currentUserId || 0),
        })) || []
    )
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

  if (!allPosts.length)
    return (
      <div className="max-w-2xl mt-[20px] text-center">No posts found</div>
    );

  return (
    <div className="max-w-2xl mt-[20px] space-y-4">
      {allPosts.map((post) => (
          <div key={post.id} className="bg-white rounded-lg shadow relative">
          <SaveButton handleSave={handleSave} post={post} />
          <PostHeader post={post} />
          <PostContent post={post} />
          <NumberOfLikes post={post} />

          <div className="flex border-t border-gray-200 text-gray-500 p-1">
            <LikeButton post={post} handleLike={handleLike} />
            <CommentButton />
            <ShareButton />
          </div>
        </div>
      ))}
    </div>
  );
}
