"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import HeaderLeft from "../headerleft/HeaderLeft";
import HeaderRight from "../headerright/HeaderRight";
import Nav from "../nav/Nav";

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
  year: number;
  month: number;
  friendRequestsReceived: number[];
  friends: number[];
}

function Header() {
  const pathname = usePathname();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userData = localStorage.getItem("currentUser");
    if (userData) {
      try {
        const parsedUser: User = JSON.parse(userData);
        setCurrentUser(parsedUser);
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }

    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/users");
        if (!response.ok) throw new Error("Failed to fetch users");
        const data = await response.json();
        setAllUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (["/signin", "/signup", "/"].includes(pathname)) {
    return null;
  }

  if (loading) {
    return <div className="h-[56px] bg-white"></div>;
  }

  return (
    <header className="flex items-center justify-between p-4 bg-white shadow-md h-[56px]">
      <HeaderLeft />
      <Nav />
      {currentUser && (
        <HeaderRight 
          currentUser={currentUser} 
          allUsers={allUsers}
          setCurrentUser={setCurrentUser}
          setAllUsers={setAllUsers}
        />
      )}
    </header>
  );
}

export default Header;