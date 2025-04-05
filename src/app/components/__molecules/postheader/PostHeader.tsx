import React from "react";
import RoundImg from "../../__atoms/roundimg/RoundImg";
import { Post } from "../../../types/Post";
interface PostProps {
  post: Post;
}
function PostHeader({ post }: PostProps) {
  return (
    <div>
      <div className="p-4 flex items-center">
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
