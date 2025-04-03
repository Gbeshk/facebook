"use client";
import React, { useState, useEffect } from 'react';

type Post = {
  id: number;
  userId: number;
  content: string;
  imageUrl?: string;
  createdAt: string;
  likes: number;
  likedBy: number[];
  comments: string[];
};

type User = {
  id: number;
  firstName: string;
  lastName: string;
  profilePic?: string;
  posts?: Post[];
};

export default function AllPosts() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);

  useEffect(() => {
    const userString = localStorage.getItem('currentUser');
    if (userString) {
      try {
        const user = JSON.parse(userString);
        setCurrentUserId(user.id);
      } catch (e) {
        console.error("Error parsing user:", e);
      }
    }

    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/posts');
        
        if (!response.ok) {
          throw new Error(`Failed to fetch posts: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (!data.users) {
          throw new Error("No users data received");
        }
        
        setUsers(data.users);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setError(error instanceof Error ? error.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleLike = async (postId: number) => {
    if (!currentUserId) return;

    try {
      const currentPost = users
        .flatMap(user => user.posts || [])
        .find(post => post.id === postId);
      
      if (!currentPost) return;

      const isLiked = currentPost.likedBy.includes(currentUserId);

      setUsers(prevUsers => 
        prevUsers.map(user => ({
          ...user,
          posts: user.posts?.map(post => 
            post.id === postId
              ? {
                  ...post,
                  likes: isLiked ? post.likes - 1 : post.likes + 1,
                  likedBy: isLiked
                    ? post.likedBy.filter(id => id !== currentUserId)
                    : [...post.likedBy, currentUserId]
                }
              : post
          )
        }))
      );

      await fetch('/api/posts/like', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ postId, userId: currentUserId }),
      });

    } catch (error) {
      console.error('Error:', error);
      setUsers(prevUsers => 
        prevUsers.map(user => ({
          ...user,
          posts: user.posts?.map(post => {
            if (post.id === postId) {
              const wasLiked = post.likedBy.includes(currentUserId);
              return {
                ...post,
                likes: wasLiked ? post.likes + 1 : post.likes - 1,
                likedBy: wasLiked
                  ? [...post.likedBy, currentUserId]
                  : post.likedBy.filter(id => id !== currentUserId)
              };
            }
            return post;
          })
        }))
      );
    }
  };

  if (loading) {
    return <div className="max-w-2xl mt-[20px] text-center">Loading posts...</div>;
  }

  if (error) {
    return (
      <div className="max-w-2xl mt-[20px] text-center text-red-500">
        Error: {error}
      </div>
    );
  }

  const allPosts = users.flatMap(user => 
    user.posts?.map(post => ({
      ...post,
      author: `${user.firstName} ${user.lastName}`,
      authorPic: user.profilePic,
      isLiked: (post.likedBy || []).includes(currentUserId || 0)
    })) || []
  ).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  if (allPosts.length === 0) {
    return (
      <div className="max-w-2xl mt-[20px] text-center">
        No posts found. Create your first post!
      </div>
    );
  }

  return (
    <div className="max-w-2xl mt-[20px] space-y-4">
      {allPosts.map(post => (
        <div key={post.id} className="bg-white rounded-lg shadow">
          <div className="p-4 flex items-center">
            <div className="w-10 h-10 rounded-full overflow-hidden mr-3 bg-gray-200">
              {post.authorPic ? (
                <img src={post.authorPic} alt={post.author} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500">
                  {post.author.charAt(0)}
                </div>
              )}
            </div>
            <div>
              <p className="font-semibold">{post.author}</p>
              <p className="text-gray-500 text-sm">
                {new Date(post.createdAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>
          </div>

          <div className="px-4 pb-2">
            <p className="text-gray-800 mb-2">{post.content}</p>
            {post.imageUrl && (
              <div className="mt-2 rounded-lg overflow-hidden">
                <img 
                  src={post.imageUrl} 
                  alt="Post content" 
                  className="w-full h-auto max-h-[500px] object-contain"
                />
              </div>
            )}
          </div>

          <div className="px-4 py-2 border-t border-gray-200 text-sm text-gray-500 flex justify-between">
            <span>{post.likes} likes</span>
            <span>{post.comments?.length || 0} comments</span>
          </div>

          <div className="flex border-t border-gray-200 text-gray-500">
            <button 
              onClick={() => handleLike(post.id)}
              className={`flex-1 py-2 flex items-center justify-center space-x-1 hover:bg-gray-100 ${
                post.isLiked ? 'text-blue-500' : ''
              }`}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5" 
                fill={post.isLiked ? "currentColor" : "none"} 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
              </svg>
              <span>Like</span>
            </button>
            <button className="flex-1 py-2 flex items-center justify-center space-x-1 hover:bg-gray-100">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <span>Comment</span>
            </button>
            <button className="flex-1 py-2 flex items-center justify-center space-x-1 hover:bg-gray-100">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              <span>Share</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}