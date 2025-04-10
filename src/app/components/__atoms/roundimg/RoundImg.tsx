import React from "react";
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
  author?: string;
  authorPic?: string;
  isLiked?: boolean;
  isSaved?: boolean;
}
interface RoundImgProps {
  post: Post;
}

function RoundImg({ post }: RoundImgProps) {
  return (
    <div className="w-10 h-10 rounded-full flex justify-center items-center overflow-hidden mr-3 bg-gray-100">
      <Image
        src={post.authorPic || '/default-avatar.png'}
        alt={post.author || 'User avatar'}
        width={40}
        height={40}
        className="w-full h-full object-cover"
      />
    </div>
  );
}

export default RoundImg;