"use client";
import SavedPost from "../savedpost/SavedPost";
import LeftSide from "@/app/components/__molecules/leftside/LeftSide";
import { User } from "../../../types/Post";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
function SavedPostsClient() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);

  useEffect(() => {
    const userString = localStorage.getItem("currentUser");
    if (userString) {
      try {
        const user = JSON.parse(userString) as { id: number };
        setCurrentUserId(user.id);
      } catch (e) {
        console.error(e);
      }
    }
  }, []);
  const pathname = usePathname();
  const isProfilePage = pathname.includes("/profile");
  
  useEffect(() => {
    const fetchPosts = async () => {
      if (!currentUserId) return;

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
  }, [currentUserId]);

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

  const savedPosts = users
    .flatMap(
      (user) =>
        user.posts?.map((post) => ({
          ...post,
          author: `${user.firstName} ${user.lastName}`,
          authorPic: user.profilePicture,
          authorId: user.id,
          isLiked: (post.likedBy || []).includes(currentUserId || 0),
          isSaved: (post.savedBy || []).includes(currentUserId || 0),
        })) || []
    )
    .filter((post) => post.isSaved)
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

  if (savedPosts.length === 0) {
    return (
      <div className="flex">
      {!isProfilePage && <LeftSide />}
      <p className="max-w-2xl mt-[20px] text-center ml-4 text-[30px] font-bold">
          No saved posts found.
        </p>
      </div>
    );
  }

  return (
    <SavedPost
      loading={loading}
      error={error}
      users={users}
      currentUserId={currentUserId}
      onLike={handleLike}
      onSave={handleSave}
    />
  );
}
export default SavedPostsClient;
