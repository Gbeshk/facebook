import React from "react";

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
interface ProfileModalProps {
  currentUser: User;
  setChosen: React.Dispatch<React.SetStateAction<number>>;
  chosen: number;
  calculateAge: (currentUser: User) => number | null;
}
function ProfileModal({
  chosen,
  setChosen,
  currentUser,
  calculateAge,
}: ProfileModalProps) {
  return (
    <>
      {chosen === 3 && (
        <div
          className="fixed inset-0 bg-gray-50  bg-opacity-75 flex items-center justify-center z-50"
          onClick={() => setChosen(0)}
        >
          <div
            className="bg-white rounded-lg shadow-lg p-6 w-full max-w-xl relative mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl"
              onClick={() => setChosen(0)}
            >
              &times;
            </button>
            <div className="space-y-4">
              <h2 className="text-2xl font-bold border-b pb-2">About</h2>
              <div className="space-y-3">
                <div>
                  <p className="text-gray-600 text-sm">Name</p>
                  <p className="font-medium">
                    {currentUser.firstName} {currentUser.lastName}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Email</p>
                  <p className="font-medium break-all">{currentUser.email}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Age</p>
                  <p className="font-medium">
                    {calculateAge(currentUser)} years old
                  </p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Joined Facebook</p>
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
        </div>
      )}
    </>
  );
}

export default ProfileModal;
