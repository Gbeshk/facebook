import Image from 'next/image';
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
  author?: string;
  authorPic?: string;
  isLiked?: boolean;
  isSaved?: boolean;
}
  interface PostContentProps {
    post: Post;
  }
function PostContent({post}:PostContentProps) {
  return (
    <>
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
    </>
  )
}

export default PostContent
