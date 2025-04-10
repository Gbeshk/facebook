"use client";
import React, { useState, useEffect } from "react";
import data from "../../../../../data.json";
import Image from "next/image";
import Line from "@/app/components/__atoms/line/Line";
import ProfileNav from "@/app/components/__molecules/profileNav/ProfileNav";
import Info from "@/app/components/__molecules/info/Info";
import SaveButton from "@/app/components/__atoms/savedbutton/SaveButton";
import PostHeader from "@/app/components/__molecules/postheader/PostHeader";
import PostContent from "@/app/components/__atoms/PostContent/PostContent";
import NumberOfLikes from "@/app/components/__molecules/NumberOfLikes/NumberOfLikes";
import LikeButton from "@/app/components/__atoms/Likebutton/LikeButton";
import ShareButton from "@/app/components/__atoms/sharebutton/ShareButton";
import Link from "next/link";
import UserCover from "@/app/components/__molecules/userCover/UserCover";
import UserProfilePic from "@/app/components/__molecules/userprofilepic/UserProfilePic";
import UserInfo from "@/app/components/__molecules/UserInfo/UserInfo";
import UserButton from "../../__molecules/userButton/UserButton";
import ProfileModal from "../../__molecules/profilemodal/ProfileModal";

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
  author?: string;
  authorPic?: string;
  isLiked?: boolean;
  isSaved?: boolean;
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
  posts: Post[];
  year: number;
  month: number;
  friends?: number[];
  friendRequestsSent?: number[];
  friendRequestsReceived?: number[];
}

interface ParamsProps {
  params: {
    id: string;
  };
}

function UserClient({ params }: ParamsProps) {
  const userId = parseInt(params.id, 10);
  const [viewedUser, setViewedUser] = useState<User | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [chosen, setChosen] = useState<number>(0);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = data.find((u) => u.id === userId);
    if (user) {
      setViewedUser({
        ...user,
        friends: user.friends || [],
        friendRequestsSent: user.friendRequestsSent || [],
        friendRequestsReceived: user.friendRequestsReceived || [],
      });
    }

    const currentUserData = localStorage.getItem("currentUser");
    if (currentUserData) {
      try {
        const parsedUser = JSON.parse(currentUserData) as User;
        setCurrentUser({
          ...parsedUser,
          friends: parsedUser.friends || [],
          friendRequestsSent: parsedUser.friendRequestsSent || [],
          friendRequestsReceived: parsedUser.friendRequestsReceived || [],
        });
      } catch (e) {
        console.error("Error parsing user:", e);
      }
    }
    setLoading(false);
  }, [userId]);

  useEffect(() => {
    if (viewedUser?.posts) {
      const processedPosts = viewedUser.posts.map((post) => ({
        ...post,
        author: `${viewedUser.firstName} ${viewedUser.lastName}`,
        authorPic: viewedUser.profilePicture,
        likedBy: post.likedBy || [],
        savedBy: post.savedBy || [],
        isLiked: currentUser?.id
          ? post.likedBy.includes(currentUser.id)
          : false,
        isSaved: currentUser?.id
          ? post.savedBy.includes(currentUser.id)
          : false,
      }));

      setPosts(
        processedPosts.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
      );
    }
  }, [viewedUser, currentUser]);

  const calculateAge = (userParam: User) => {
    if (!userParam.year || !userParam.month) return null;
    const today = new Date();
    const birthDate = new Date(userParam.year, userParam.month - 1);
    let age = today.getFullYear() - birthDate.getFullYear();
    if (
      today.getMonth() < birthDate.getMonth() ||
      (today.getMonth() === birthDate.getMonth() &&
        today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  const handleFriendAction = async (action: "send" | "cancel") => {
    if (!currentUser || !viewedUser) return;

    try {
      const endpoint = ["accept", "ignore"].includes(action)
        ? "/api/friends"
        : "/api/friends/request";

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          senderId: currentUser.id,
          receiverId: viewedUser.id,
          action: action.toLowerCase(),
        }),
      });

      if (!response.ok) throw new Error("Action failed");

      const updateLocalState = () => {
        setCurrentUser((prev) => {
          if (!prev) return null;
          const newUser = { ...prev };

          if (action === "send") {
            newUser.friendRequestsSent = [
              ...(prev.friendRequestsSent || []),
              viewedUser.id,
            ];
          } else if (action === "cancel") {
            newUser.friendRequestsSent = (prev.friendRequestsSent || []).filter(
              (id) => id !== viewedUser.id
            );
          }

          localStorage.setItem("currentUser", JSON.stringify(newUser));
          return newUser;
        });

        setViewedUser((prev) => {
          if (!prev) return null;
          const newUser = { ...prev };

          if (action === "send") {
            newUser.friendRequestsReceived = [
              ...(prev.friendRequestsReceived || []),
              currentUser.id,
            ];
          } else if (action === "cancel") {
            newUser.friendRequestsReceived = (
              prev.friendRequestsReceived || []
            ).filter((id) => id !== currentUser.id);
          }

          return newUser;
        });
      };

      updateLocalState();
    } catch (error) {
      console.error("Friend action failed:", error);
    }
  };

  const handleSave = async (postId: number) => {
    if (!currentUser?.id) return;

    try {
      const response = await fetch("/api/posts/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postId, userId: currentUser.id }),
      });

      if (!response.ok) throw new Error("Save failed");
      const result = await response.json();

      setPosts((prevPosts) =>
        prevPosts.map((post) => {
          if (post.id === postId) {
            return {
              ...post,
              savedBy: result.isSaved
                ? [...post.savedBy, currentUser.id]
                : post.savedBy.filter((id) => id !== currentUser.id),
              isSaved: result.isSaved,
            };
          }
          return post;
        })
      );
    } catch (error) {
      console.error("Save error:", error);
    }
  };
  const handleLike = async (postId: number) => {
    if (!currentUser?.id) return;

    try {
      const response = await fetch("/api/posts/like", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postId, userId: currentUser.id }),
      });

      if (!response.ok) throw new Error("Like failed");

      setPosts((prevPosts) =>
        prevPosts.map((post) => {
          if (post.id === postId) {
            const isLiked = post.likedBy.includes(currentUser.id);
            return {
              ...post,
              likes: isLiked ? post.likes - 1 : post.likes + 1,
              likedBy: isLiked
                ? post.likedBy.filter((id) => id !== currentUser.id)
                : [...post.likedBy, currentUser.id],
              isLiked: !isLiked,
            };
          }
          return post;
        })
      );
    } catch (error) {
      console.error("Like error:", error);
    }
  };

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-gray-200 flex items-center justify-center">
        <p className="text-2xl font-semibold">Loading profile...</p>
      </div>
    );
  }

  if (!viewedUser) {
    return (
      <div className="w-full min-h-screen bg-gray-200 flex items-center justify-center">
        <p className="text-2xl font-semibold">User not found</p>
      </div>
    );
  }
  const isFriend = currentUser?.friends?.includes(viewedUser.id) ?? false;
  const hasSentRequest =
    currentUser?.friendRequestsSent?.includes(viewedUser.id) ?? false;

  return (
    <div className="w-full min-h-screen bg-gray-200 pb-6">
      <div className="w-full bg-white">
        <UserCover viewedUser={viewedUser} />
        <div className="h-[128px] max-md:h-[250px] max-md:justify-normal  bg-white max-w-[1250px] flex mx-auto max-md:flex-col items-center justify-between relative px-6">
          <UserProfilePic viewedUser={viewedUser} />

          <UserInfo viewedUser={viewedUser} />
          <div className="!mt-5">
            <UserButton
              currentUser={currentUser}
              viewedUser={viewedUser}
              handleFriendAction={handleFriendAction}
              isFriend={isFriend}
              hasSentRequest={hasSentRequest}
            />
          </div>
        </div>

        <div className="h-[44px] bg-white max-w-[1250px] mx-auto px-4">
          <Line />
          <ProfileNav chosen={chosen} setChosen={setChosen} />
        </div>
      </div>

      <div className="flex max-w-[1250px] w-full max-md:flex-col gap-6 mx-auto max-md:px-3">
        <Info currentUser={viewedUser} calculateAge={calculateAge} />
        {chosen === 3 && (
          <div
            className="fixed inset-0  bg-opacity-50 flex items-center justify-center z-50"
            onClick={() => setChosen(0)}
          >
            <div
              className="bg-white rounded-lg shadow-lg bg-opacity-50 p-6 w-full max-w-xl relative mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <ProfileModal
                chosen={chosen}
                setChosen={setChosen}
                currentUser={viewedUser}
                calculateAge={calculateAge}
              />
            </div>
          </div>
        )}
        {(chosen === 0 || chosen == 3) && (
          <div className="max-w-2xl w-full mt-5 space-y-4">
            {posts.length === 0 ? (
              <h1 className="text-center text-2xl font-bold">No Posts Found</h1>
            ) : (
              posts.map((post) => (
                <div
                  key={post.id}
                  className="bg-white rounded-lg shadow relative"
                >
                  <SaveButton handleSave={handleSave} post={post} />
                  <PostHeader post={post} />
                  <PostContent post={post} />
                  <NumberOfLikes post={post} />
                  <div className="flex border-t border-gray-200 text-gray-500 p-1">
                    <LikeButton post={post} handleLike={handleLike} />
                    <button className="flex-1 py-2 flex items-center justify-center space-x-1 hover:bg-gray-100  transition-colors duration-200">
                      <i
                        className="inline-block w-[20px] h-[20px] bg-no-repeat filter invert-[15%]"
                        style={{
                          backgroundImage:
                            'url("https://static.xx.fbcdn.net/rsrc.php/v4/y6/r/olX2yf1iinG.png")',
                          backgroundPosition: "0px -588px",
                        }}
                      ></i>
                      <span className="font-semibold text-gray-800 ">
                        Comment
                      </span>
                    </button>{" "}
                    <ShareButton />
                  </div>
                </div>
              ))
            )}
          </div>
        )}
        {chosen == 1 && (
          <div className="max-w-2xl flex justify-center  w-full">
            <h1 className="text-2xl font-bold mt-5 ">
              Saved Posts Are Private
            </h1>
          </div>
        )}
        {chosen === 2 && (
          <div className="max-w-2xl w-full mt-6">
            {viewedUser.friends?.length ? (
              <div className="space-y-2">
                {viewedUser.friends.map((friendId) => {
                  const friend = data.find((u) => u.id === friendId);
                  if (!friend) return null;

                  return (
                    <div
                      key={friend.id}
                      className="bg-white rounded-lg h-[70px]"
                    >
                      <Link
                        href={`/users/${friend.id}`}
                        className="flex items-center p-2 hover:bg-gray-100 h-full rounded-lg"
                      >
                        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white">
                          <Image
                            src={friend.profilePicture}
                            alt={friend.firstName}
                            width={48}
                            height={48}
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <div className="ml-3">
                          <p className="font-semibold">
                            {friend.firstName} {friend.lastName}
                          </p>
                        </div>
                      </Link>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-center  text-2xl font-bold">No friends yet</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default UserClient;
