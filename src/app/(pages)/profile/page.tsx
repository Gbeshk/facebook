"use client";
import React, { useEffect, useState, useRef } from "react";
import Post from "@/app/components/__organisms/post/Post";
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
  birthDate: string;
  gender: string;
  profilePicture: string;
  coverPhoto?: string;
  createdAt: string;
  posts: Post[];
}

const Profile = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const calculateAge = (birthDate: string) => {
    const birth = new Date(birthDate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birth.getDate())
    ) {
      age--;
    }
    return age;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userString = localStorage.getItem("currentUser");
        if (!userString) throw new Error("User not logged in");

        const parsedUser: User = JSON.parse(userString);
        setCurrentUser(parsedUser);
        setCurrentUserId(parsedUser.id);

        const response = await fetch("/api/posts");
        if (!response.ok) throw new Error("Failed to fetch posts");

        const data = await response.json();
        const allPosts = data.users.flatMap((user: User) => user.posts || []);

        const filteredPosts = allPosts
          .filter((post: Post) => post.userId === parsedUser.id)
          .sort(
            (a: Post, b: Post) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );

        setUserPosts(filteredPosts);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
        setLoading(false);
      }
    };

    fetchData();
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

      setUserPosts((prevPosts) =>
        prevPosts.map((post) => {
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
        })
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

      setUserPosts((prevPosts) =>
        prevPosts.map((post) => {
          if (post.id === postId) {
            return {
              ...post,
              savedBy: result.isSaved
                ? [...post.savedBy, currentUserId]
                : post.savedBy.filter((id) => id !== currentUserId),
            };
          }
          return post;
        })
      );
    } catch (error) {
      console.error("Save error:", error);
    }
  };

  const handleProfilePictureClick = () => {
    fileInputRef.current?.click();
  };

  const handleProfilePictureChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!e.target.files?.[0] || !currentUser) return;

    setIsUpdatingProfile(true);
    try {
      const formData = new FormData();
      formData.append("userId", currentUser.id.toString());
      formData.append("file", e.target.files[0]);

      const response = await fetch("/api/users/update-profile-picture", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Update failed");

      const result = await response.json();

      setCurrentUser((prev) =>
        prev ? { ...prev, profilePicture: result.profilePicture } : null
      );

      const updatedUser = {
        ...currentUser,
        profilePicture: result.profilePicture,
      };
      localStorage.setItem("currentUser", JSON.stringify(updatedUser));

      if (fileInputRef.current) fileInputRef.current.value = "";
      window.location.reload();

    } catch (error) {
      console.error("Error updating profile picture:", error);
      alert("Failed to update profile picture. Please try again.");
    } finally {
      setIsUpdatingProfile(false);
    }
  };

  if (loading) return <div className="text-center p-4">Loading profile...</div>;
  if (error) return <div className="text-center p-4 text-red-500">{error}</div>;
  if (!currentUser)
    return <div className="text-center p-4">User not found</div>;

  return (
    <div className="bg-[#f0f2f5] min-h-screen">
      <div className="h-60 bg-gray-200 relative">
        {currentUser.coverPhoto ? (
          <Image
          width={100}
          height={100}
            src={currentUser.coverPhoto}
            alt="Cover"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-300" />
        )}

        <div className="absolute -bottom-16 left-4">
          <div
            className="relative w-32 h-32 rounded-full border-4 border-white overflow-hidden cursor-pointer group"
            onClick={handleProfilePictureClick}
          >
            <Image 
            width={100}
            height={100}
              src={currentUser.profilePicture}
              alt={`${currentUser.firstName} ${currentUser.lastName}`}
              className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>

            {isUpdatingProfile && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
              </div>
            )}
          </div>
        </div>
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleProfilePictureChange}
        accept="image/*"
        className="hidden"
      />

      <div className="pt-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="w-full md:w-1/3 space-y-4">
              <div className="bg-white rounded-lg shadow p-4">
                <h2 className="text-xl font-bold mb-4">About</h2>
                <div className="space-y-3">
                  <div>
                    <p className="text-gray-600">Name</p>
                    <p className="font-medium">
                      {currentUser.firstName} {currentUser.lastName}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">Email</p>
                    <p className="font-medium">{currentUser.email}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Age</p>
                    <p className="font-medium">
                      {calculateAge(currentUser.birthDate)} years old
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">Joined Facebook</p>
                    <p className="font-medium">
                      {new Date(currentUser.createdAt).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "long",
                        }
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full md:w-2/3 space-y-4">
              <Post />

              {userPosts.map((post) => (
                <div
                  key={post.id}
                  className="bg-white rounded-lg shadow relative"
                >
                  <button
                    onClick={() => handleSave(post.id)}
                    className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100"
                    aria-label={
                      post.savedBy.includes(currentUser.id)
                        ? "Unsave post"
                        : "Save post"
                    }
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill={
                        post.savedBy.includes(currentUser.id)
                          ? "currentColor"
                          : "none"
                      }
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

                  <div className="p-4 flex items-center">
                    <div className="w-10 h-10 rounded-full overflow-hidden mr-3 bg-gray-100">
                      <Image 
                      width={100}
                      height={100}
                        src={currentUser.profilePicture}
                        alt={`${currentUser.firstName} ${currentUser.lastName}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-semibold">
                        {currentUser.firstName} {currentUser.lastName}
                      </p>
                      <p className="text-gray-500 text-sm">
                        {new Date(post.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>

                  <div className="px-4 pb-2">
                    <p className="text-gray-800 mb-2">{post.content}</p>
                    {post.imageUrl && (
                      <div className="mt-2 rounded-lg overflow-hidden">
                        <Image
                        width={100}
                        height={100}
                          src={post.imageUrl}
                          alt="Post content"
                          className="w-full h-auto max-h-[500px] object-contain"
                        />
                      </div>
                    )}
                  </div>

                  <div className="px-4 py-2 border-t border-gray-200 text-sm text-gray-500 flex justify-between">
                    <span>{post.likes} likes</span>
                    <span>{post.comments.length} comments</span>
                  </div>

                  <div className="flex border-t border-gray-200 text-gray-500">
                    <button
                      onClick={() => handleLike(post.id)}
                      className={`flex-1 py-2 flex items-center justify-center space-x-1 hover:bg-gray-100 ${
                        post.likedBy.includes(currentUser.id)
                          ? "text-blue-500"
                          : ""
                      }`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill={
                          post.likedBy.includes(currentUser.id)
                            ? "currentColor"
                            : "none"
                        }
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                        />
                      </svg>
                      <span>Like</span>
                    </button>
                    <button className="flex-1 py-2 flex items-center justify-center space-x-1 hover:bg-gray-100">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                        />
                      </svg>
                      <span>Comment</span>
                    </button>
                    <button className="flex-1 py-2 flex items-center justify-center space-x-1 hover:bg-gray-100">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                        />
                      </svg>
                      <span>Share</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
