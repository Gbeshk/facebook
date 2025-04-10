import React from "react";
import RoundImg from "../../__atoms/roundimg/RoundImg";
import Link from "next/link";
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
interface PostProps {
  post: Post;
}
function PostHeader({ post }: PostProps) {
  return (
    <div>
      <div className="p-4 flex  items-center">
        <Link
          href={`/users/${post.userId}`}
          className="w-[50%]  h-[20%]  absolute"
        ></Link>
        <RoundImg post={post} />
        <div>
          <p className="font-semibold">{post.author}</p>
          <p className="text-gray-500 text-sm">
            {new Date(post.createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
      </div>
    </div>
  );
}

export default PostHeader;
