export type Post = {
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
    authorId?: number;
    isSaved: boolean;
  };
  export type User = {
    id: number;
    firstName: string;
    lastName: string;
    profilePicture?: string;
    posts?: Post[];
  };