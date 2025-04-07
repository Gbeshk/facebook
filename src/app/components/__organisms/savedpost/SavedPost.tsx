import PostHeader from "@/app/components/__molecules/postheader/PostHeader";
import PostContent from "@/app/components/__atoms/PostContent/PostContent";
import NumberOfLikes from "@/app/components/__molecules/NumberOfLikes/NumberOfLikes";
import LikeButton from "@/app/components/__atoms/Likebutton/LikeButton";
import CommentButton from "@/app/components/__atoms/CommentButton/CommentButton";
import ShareButton from "@/app/components/__atoms/sharebutton/ShareButton";
import SaveButton from "@/app/components/__atoms/savedbutton/SaveButton";
import LeftSide from "@/app/components/__molecules/leftside/LeftSide";
import { User } from "../../../types/Post";
import { usePathname } from "next/navigation";
import RightSide from "../../__molecules/rightside/RightSide";

interface SavedPostsViewProps {
  loading: boolean;
  error: string | null;
  users: User[];
  currentUserId: number | null;
  onLike: (postId: number) => Promise<void>;
  onSave: (postId: number) => Promise<void>;
}

export default function SavedPost({
  loading,
  error,
  users,
  currentUserId,
  onLike,
  onSave,
}: SavedPostsViewProps) {
  const pathname = usePathname();
  const isProfilePage = pathname.includes("/profile");

  const savedPosts = users
    .flatMap(
      (user) =>
        user.posts?.map((post) => ({
          ...post,
          author: `${user.firstName} ${user.lastName}`,
          authorPic: user.profilePicture,
          authorId: user.id,
          isLiked: (post.likedBy || []).includes(currentUserId || 0),
          isSaved: (post.savedBy || []).includes(currentUserId || 0),
        })) || []
    )
    .filter((post) => post.isSaved)
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

  if (loading) {
    return (
      <div className="max-w-2xl mt-[20px] text-center">Loading posts...</div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mt-[20px] text-center text-red-500">
        Error: {error}
      </div>
    );
  }

  if (savedPosts.length === 0) {
    return (
      <div className="flex">
        {!isProfilePage && <LeftSide />}
        <p className="max-w-2xl mt-[20px] text-center ml-4 text-[30px] font-bold">
          No saved posts found.
        </p>
      </div>
    );
  }

  return (
    <div className="flex justify-between">
      {!isProfilePage && <LeftSide />}
      <div className="max-w-2xl w-full mt-[20px] space-y-4">
        <h1 className="text-[30px] font-bold">Saved Posts</h1>
        {savedPosts.map((post) => (
          <div key={post.id} className="bg-white rounded-lg shadow relative">
            <SaveButton handleSave={onSave} post={post} />
            <PostHeader post={post} />
            <PostContent post={post} />
            <NumberOfLikes post={post} />

            <div className="flex border-t border-gray-200 text-gray-500 p-1">
              <LikeButton post={post} handleLike={onLike} />
              <CommentButton />
              <ShareButton />
            </div>
          </div>
        ))}
      </div>
        {!isProfilePage && (
          <div className="max-w-[400px] w-full mt-2">
            <RightSide />
          </div>
        )}
      </div>
  );
}
