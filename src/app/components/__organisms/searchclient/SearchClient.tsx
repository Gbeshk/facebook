"use client";

import LeftSide from "@/app/components/__molecules/leftside/LeftSide";
import RightSide from "@/app/components/__molecules/rightside/RightSide";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import data from "../../../../../data.json";
import Link from "next/link";
import SaveButton from "@/app/components/__atoms/savedbutton/SaveButton";
import PostHeader from "@/app/components/__molecules/postheader/PostHeader";
import PostContent from "@/app/components/__atoms/PostContent/PostContent";
import NumberOfLikes from "@/app/components/__molecules/NumberOfLikes/NumberOfLikes";
import LikeButton from "@/app/components/__atoms/Likebutton/LikeButton";
import CommentButton from "@/app/components/__atoms/CommentButton/CommentButton";
import ShareButton from "@/app/components/__atoms/sharebutton/ShareButton";
import Image from "next/image";

interface Post {
  id: number;
  userId: number;
  content: string;
  imageUrl?: string;
  createdAt: string;
  likes: number;
  likedBy: number[];
  comments: string[];
  savedBy: number[];
}

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  profilePicture: string;
  coverPhoto?: string;
  createdAt: string;
  year: number;
  month: number;
  friends?: number[];
  friendRequestsSent?: number[];
  friendRequestsReceived?: number[];
  password?: string;
  posts: Post[];
}

interface PostWithUser extends Post {
  author: string;
  authorPic: string;
  isLiked: boolean;
  isSaved: boolean;
}

function SearchClient() {
  const [searchResults, setSearchResults] = useState<{
    users: User[];
    posts: PostWithUser[];
  }>({ users: [], posts: [] });
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);
  const pathname = usePathname();
  const searchQuery = pathname.split("/").pop() || "";

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
  }, []);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const filteredUsers = data.filter((user) =>
          `${user.firstName} ${user.lastName} ${user.email}`
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        );
        const filteredPosts = data.flatMap((user: User) =>
          user.posts
            .filter((post: Post) =>
              post.content?.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((post: Post) => ({
              ...post,
              author: `${user.firstName} ${user.lastName}`,
              authorPic: user.profilePicture,
              likedBy: post.likedBy || [],
              savedBy: post.savedBy || [],
              isLiked: (post.likedBy as number[]).includes(currentUserId ?? -1),
              isSaved: (post.savedBy as number[]).includes(currentUserId ?? -1),
            }))
        );

        setSearchResults({
          users: filteredUsers,
          posts: filteredPosts.sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          ),
        });
      } catch (error) {
        console.error("Search error:", error);
      }
    };

    if (searchQuery) {
      fetchSearchResults();
    }
  }, [searchQuery, currentUserId]);

  const handleLike = async (postId: number) => {
    if (!currentUserId) return;

    try {
      const response = await fetch("/api/posts/like", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postId, userId: currentUserId }),
      });

      if (!response.ok) throw new Error("Like failed");

      const { likes, isLiked } = await response.json();

      setSearchResults((prev) => ({
        ...prev,
        posts: prev.posts.map((post) =>
          post.id === postId
            ? {
                ...post,
                likes,
                isLiked,
                likedBy: isLiked
                  ? [...(post.likedBy || []), currentUserId]
                  : (post.likedBy || []).filter((id) => id !== currentUserId),
              }
            : post
        ),
      }));
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

      setSearchResults((prev) => ({
        ...prev,
        posts: prev.posts.map((post) => {
          if (post.id === postId) {
            const isSaved = post.savedBy.includes(currentUserId);
            return {
              ...post,
              savedBy: isSaved
                ? post.savedBy.filter((id) => id !== currentUserId)
                : [...post.savedBy, currentUserId],
              isSaved: !isSaved,
            };
          }
          return post;
        }),
      }));
    } catch (error) {
      console.error("Save error:", error);
    }
  };

  return (
    <div className="flex w-full items-center justify-center">
      <div className="flex justify-between mt-5 w-[1800px]">
        <div className="block  max-lg:hidden lg:max-w-[400px] lg:w-full">
          <LeftSide />
        </div>
        <div className="flex flex-col max-w-2xl w-full mx-4">
          <h1 className="text-2xl font-bold mb-6">
            Search Results for: {searchQuery}
          </h1>

          {searchResults.users.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Users</h2>
              <div className="space-y-4">
                {searchResults.users.map((user) => (
                  <Link
                    href={`/users/${user.id}`}
                    key={user.id}
                    className="bg-white rounded-lg p-4 shadow flex items-center"
                  >
                    <Image
                      src={user.profilePicture || "/default-avatar.png"}
                      alt={`${user.firstName} ${user.lastName}`}
                      className="w-10 h-10 rounded-full mr-4"
                      width={40}
                      height={40}
                    />
                    <div>
                      <p className="font-medium">
                        {user.firstName} {user.lastName}
                      </p>
                      <p className="text-gray-500 text-sm">{user.email}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {searchResults.posts.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Posts</h2>
              <div className="space-y-4">
                {searchResults.posts.map((post) => (
                  <div
                    key={post.id}
                    className="bg-white rounded-lg shadow relative"
                  >
                    <Link
                      href={`/users/${post.userId}`}
                      className="w-full absolute"
                    />
                    <SaveButton
                      handleSave={() => handleSave(post.id)}
                      post={post}
                    />
                    <PostHeader post={post} />
                    <PostContent post={post} />
                    <NumberOfLikes post={post} />

                    <div className="flex border-t border-gray-200 text-gray-500 p-1">
                      <LikeButton
                        post={post}
                        handleLike={() => handleLike(post.id)}
                      />
                      <CommentButton onClick={() => {}} />
                      <ShareButton />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {searchResults.users.length === 0 &&
            searchResults.posts.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">
                  No results found for &quot;{searchQuery}&quot;
                </p>
              </div>
            )}
        </div>
        <div className="max-md:hidden inline-block  max-w-[400px] w-full">
          <RightSide />
        </div>
      </div>
    </div>
  );
}

export default SearchClient;
