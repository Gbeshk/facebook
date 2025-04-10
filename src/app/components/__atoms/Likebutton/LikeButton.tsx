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
  author?: string;
  authorPic?: string;
  isLiked?: boolean;
  isSaved?: boolean;
}
interface LikeIconProps {
  handleLike: (postId: number) => Promise<void>;
  post: Post;
}
function LikeButton({ handleLike, post }: LikeIconProps) {
  return (
    <>
      <button
        onClick={() => handleLike(post.id)}
        className={`flex-1  py-2 flex items-center justify-center space-x-1 hover:bg-gray-100 ${
          post.isLiked ? "text-blue-500" : ""
        }`}
      >
        <div className="flex items-center gap-1"></div>
        <div className="relative">
          <i
            className={`inline-block w-[20px] h-[20px] bg-no-repeat  ${
              !post.isLiked
                ? 'bg-[url("https://static.xx.fbcdn.net/rsrc.php/v4/y6/r/olX2yf1iinG.png")] bg-[0px_-798px] mt-1 icon'
                : 'bg-[url("https://static.xx.fbcdn.net/rsrc.php/v4/y6/r/olX2yf1iinG.png")] bg-[0px_-736px] mt-1'
            }`}
          />
        </div>
        <span className="font-semibold">Like</span>
      </button>
    </>
  );
}

export default LikeButton;
