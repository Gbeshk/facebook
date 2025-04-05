"use client";
import React, { useState, useEffect } from "react";
import SuggestedFriends from "@/app/components/__organisms/suggestedfriends/SuggestedFriends";
export interface User {
  id: number;
  firstName: string;
  lastName: string;
  profilePicture: string;
  friendRequestsSent?: number[];
  friendRequestsReceived?: number[];
}

export interface FullUser extends User {
  friendRequestsSent: number[];
  friendRequestsReceived: number[];
}
function FriendsPageClient() {
  const [users, setUsers] = useState<FullUser[]>([]);
  const [currentUser, setCurrentUser] = useState<FullUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch("/api/users");
        if (!response.ok) throw new Error("Failed to load users");
        
        const data: FullUser[] = await response.json();
        setUsers(data);

        const userString = localStorage.getItem("currentUser");
        if (userString) {
          try {
            const parsedUser: FullUser = JSON.parse(userString);
            const validUser = data.find(u => u.id === parsedUser.id);
            setCurrentUser(validUser || null);
          } catch (e) {
            console.error("Invalid user data:", e);
            localStorage.removeItem("currentUser");
          }
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load data");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const handleFriendAction = async (targetUserId: number) => {
    if (!currentUser) return;

    try {
      const isRequestSent = currentUser.friendRequestsSent.includes(targetUserId);
      const action = isRequestSent ? "cancel" : "send";

      const response = await fetch("/api/friends/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          senderId: currentUser.id,
          receiverId: targetUserId,
          action,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Request failed");
      }

      const result = await response.json();
      setUsers(result.users);

      const updatedCurrentUser = result.users.find((u: FullUser) => u.id === currentUser.id);
      if (updatedCurrentUser) {
        setCurrentUser(updatedCurrentUser);
        localStorage.setItem("currentUser", JSON.stringify(updatedCurrentUser));
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Action failed");
      setTimeout(() => setError(null), 5000);
    }
  };

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <SuggestedFriends
      users={users.filter(u => u.id !== currentUser?.id)}
      currentUser={currentUser}
      handleFriendAction={handleFriendAction}
    />
  );
}

export default FriendsPageClient;