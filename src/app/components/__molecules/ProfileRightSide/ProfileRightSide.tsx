import React from 'react'
import SavedPostsClient from '../../__organisms/SavedPostsclient/SavedPostsClient'
import Post from '../../__organisms/post/Post'
import Image from 'next/image'
import FriendsPageClient from '../../__organisms/FriendsPageclient/FriendsPageClient'
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
  profilePicture: string ;
  coverPhoto?: string;
  createdAt: string;
  posts: Post[];
  year: number;
  month: number;
}
interface ProfileRightSideProps {
    userPosts: Post[]
    chosen: number
     currentUser: User
    
     handleSave: (postId: number) => Promise<void>
     handleLike: (postId: number) => Promise<void>
  }
function ProfileRightSide({chosen, userPosts, currentUser, handleSave,handleLike }:ProfileRightSideProps) {
  return (
    <>
      <div className="max-w-2xl w-full flex flex-col gap-3">
                  {chosen == 1  && <SavedPostsClient />}
                  {(chosen == 0 || chosen == 3 )  && (
                    <>
                      <Post />
                      {userPosts.map((post) => (
                        <div
                          key={post.id}
                          className="bg-white rounded-lg shadow relative max-w-2xl w-full"
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
                                {new Date(post.createdAt).toLocaleDateString(
                                  "en-US",
                                  {
                                    month: "short",
                                    day: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  }
                                )}
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
                    </>
                  )}
                  {chosen == 2 && <FriendsPageClient />}
                </div>
    </>
  )
}

export default ProfileRightSide
