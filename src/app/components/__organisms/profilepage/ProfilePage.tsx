"use client";
import React, { useEffect, useRef, useState } from "react";
import Line from "../../__atoms/line/Line";
import Post from "../post/Post";
import CoverPic from "../../__atoms/coverpic/CoverPic";
import ProfileProfilePic from "../../__molecules/ProfileProfilePic/ProfileProfilePic";
import ProfileName from "../../__molecules/profilename/ProfileName";
import AddStooryBtn from "../../__atoms/Addstorybtn/AddStooryBtn";
import ProfileNav from "../../__molecules/profileNav/ProfileNav";
import Info from "../../__molecules/info/Info";
import ProfileRightSide from "../../__molecules/ProfileRightSide/ProfileRightSide";
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
}
function ProfilePage() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [chosen, setChosen] = useState(0);
  const calculateAge = (currentUser: User) => {
    if (currentUser.year && currentUser.month) {
      const birth = new Date(currentUser.year, currentUser.month - 1);
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
    }

    if (currentUser.year && currentUser.month) {
      const today = new Date();
      let age = today.getFullYear() - currentUser.year;
      const monthDiff = today.getMonth() + 1 - currentUser.month;

      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < 1)) {
        age--;
      }
      return age;
    }

    return null;
  };
  const handleProfilePictureChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!e.target.files?.[0] || !currentUser) return;

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
    }
  };
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
  const handleCoverPhotoUpdate = (newCover: string) => {
    setCurrentUser((prev) => {
      if (!prev) return null;
      const updatedUser = { ...prev, coverPhoto: newCover };
      localStorage.setItem("currentUser", JSON.stringify(updatedUser));
      return updatedUser;
    });
  };
  if (loading) return <div className="text-center p-4">Loading profile...</div>;
  if (error) return <div className="text-center p-4 text-red-500">{error}</div>;
  if (!currentUser)
    return <div className="text-center p-4">User not found</div>;

  return (
    <>
      <div className="w-full min-h-screen bg-gray-200 pb-6 max-md:px-3">
        <div className="w-full  bg-gray-100 ">
          <CoverPic
            currentUser={currentUser}
            onCoverPhotoUpdate={handleCoverPhotoUpdate}
          />
          <div className="h-[128px] max-md:h-[250px] bg-white max-w-[1250px] flex max-md:flex-col mx-auto max-md:justify-normal items-center justify-between relative px-6">
            <ProfileProfilePic
              currentUser={currentUser}
              fileInputRef={fileInputRef}
              handleProfilePictureChange={handleProfilePictureChange}
            />
            <ProfileName currentUser={currentUser} />
            <div className="!mt-5">
              <AddStooryBtn />
            </div>
          </div>
          <div className="h-[44px] bg-white max-w-[1250px] mx-auto px-4">
            <Line />
            <ProfileNav chosen={chosen} setChosen={setChosen} />
          </div>
        </div>
        <ProfileModal
          setChosen={setChosen}
          chosen={chosen}
          currentUser={currentUser}
          calculateAge={calculateAge}
        />
        <div className="flex max-w-[1250px] w-full gap-6 mx-auto max-md:flex-col">
            <Info currentUser={currentUser} calculateAge={calculateAge} />
          <ProfileRightSide
            chosen={chosen}
            userPosts={userPosts}
            currentUser={currentUser}
            handleSave={handleSave}
            handleLike={handleLike}
          />
        </div>
      </div>
    </>
  );
}
export default ProfilePage;
