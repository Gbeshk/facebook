"use client";
import React, { useState, useEffect } from "react"

interface User {
  id: number
  firstName: string
  lastName: string
  profilePicture: string
  friendRequestsSent?: number[]
  friendRequestsReceived?: number[]
}

interface FriendListProps {
  initialUsers: User[]
}

export default function FriendList({ initialUsers }: FriendListProps) {
  const [users, setUsers] = useState<User[]>(initialUsers)
  const [currentUser, setCurrentUser] = useState<User | null>(null)

  useEffect(() => {
    const userString = localStorage.getItem("currentUser")
    if (userString) {
      try {
        const user = JSON.parse(userString)
        if (user?.id) setCurrentUser(user)
      } catch (e) {
        console.error("Error parsing user:", e)
      }
    }
  }, [])

  const handleFriendRequest = async (targetUserId: number) => {
    if (!currentUser?.id) {
      alert("Please log in first!")
      return
    }

    try {
      const response = await fetch('/api/friends/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          senderId: currentUser.id,
          receiverId: targetUserId
        })
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()
      setUsers(result.users)
      
    } catch (error) {
      console.error("Friend request failed:", error)
      alert("Friend request failed. Please try again.")
    }
  }

  return (
    <div className="flex flex-wrap">
      {users.map((user) => (
        <div key={user.id} className="hover:bg-gray-50 rounded-lg transition-colors w-1/3 p-3">
          <div className="w-full bg-gray-200 rounded-lg overflow-hidden mb-2 flex items-center justify-center">
            <img
            width={100}
            height={100}
              src={user.profilePicture} 
              alt={`${user.firstName} ${user.lastName}`}
              className="w-full h-48 object-cover rounded-lg"
            />
          </div>
          <div className="text-center">
            <p className="font-medium">
              {user.firstName} {user.lastName}
            </p>
            <div className="flex justify-center space-x-2 mt-2">
              <button
                onClick={() => handleFriendRequest(user.id)}
                className={`text-white px-3 py-1 rounded-md text-sm font-medium w-[90%] ${
                  currentUser?.friendRequestsSent?.includes(user.id)
                    ? "bg-white text-blue-500 hover:bg-gray-200"
                    : "bg-blue-500 hover:bg-blue-600"
                }`}
              >
                {currentUser?.friendRequestsSent?.includes(user.id) 
                  ? "Request Sent" 
                  : "Add Friend"}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}