import React from 'react'
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
}
interface InfoProps {
  currentUser: User;
  calculateAge: (currentUser: User) => number | null
}
function Info({currentUser, calculateAge}:InfoProps) {
  return (
    <>
        <div className="w-[50%]">
            <div className="bg-white rounded-lg shadow p-4 mt-5  w-full">
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
                    {calculateAge(currentUser)} years old
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
    </>
  )
}

export default Info
