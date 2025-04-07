"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  profilePicture: string;
}

function RightSide() {
  const pathname = usePathname();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const isHomePage = pathname === "/home";

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/users");
        const data = await response.json();

        const currentUser = localStorage.getItem("currentUser");
        if (currentUser) {
          const parsedUser = JSON.parse(currentUser);
          setUsers(data.filter((user: User) => user.id !== parsedUser.id));
        } else {
          setUsers(data);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div
        className={` h-screen max-w-[400px] w-full p-4 ${
          isHomePage ? "bg-gray-100" : "bg-white"
        }`}
      >
        <div className="animate-pulse space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center p-2">
              <div className="rounded-full bg-gray-200 h-12 w-12"></div>
              <div className="ml-3 flex-1">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      className={` h-screen max-w-[400px] w-full p-4 overflow-y-auto ${
        isHomePage ? "bg-gray-100" : "bg-white "
      }`}
    >
      <h2 className="text-xl font-bold text-gray-800 mb-6 pl-2">All Users</h2>
      <div className="space-y-4">
        {users.map((user) => (
          <div
            key={user.id}
            className="flex items-center p-2 hover:bg-gray-100 rounded-xl transition-colors"
          >
            <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-sm">
              <Image
                src={user.profilePicture}
                alt={`${user.firstName} ${user.lastName}`}
                width={48}
                height={48}
                className="object-cover"
              />
            </div>
            <div className="ml-3">
              <p className="font-semibold text-gray-800">
                {user.firstName} {user.lastName}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RightSide;
