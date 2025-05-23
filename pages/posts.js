import ForumApiService from '@/hooks/data/ForumApiService';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';

export default function Posts({ data, limit = Infinity }) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [posts, setPosts] = useState(data || []);
    const [forumUser, setForumUser] = useState(null);

    const api = ForumApiService();
    const token = typeof window !== "undefined" ? localStorage.getItem("forumUserToken") : null;

    useEffect(() => {
        if (token) {
            const cachedUser = localStorage.getItem('forumUser');
        if (cachedUser) {
            setForumUser(JSON.parse(cachedUser));
        } else {
            api.fetchUser(token).then(user => setForumUser(user));
        }
        }
    }, []);

    useEffect(() => {
        setIsLoading(false);
        setPosts(data);
    }, [data]);

    const formatDate = (isoString) => {
        const date = new Date(isoString);
        return new Intl.DateTimeFormat('default', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        }).format(date);
    };

    const userLiked = (post) =>
        forumUser && post.likes && post.likes.some(like => like.userId === forumUser.id);

    const onLike = async (postId, alreadyLiked) => {
        const { id } = router.query
        if (alreadyLiked) {
            if (!window.confirm("You already liked this post. Remove your like?")) return;
            setIsLoading(true);
            try {
                const response = await api.unlikePost(postId);
                if (response && response.success) {
                    // window.location.reload();
                    const refreshed = await api.fetchThreadPosts(id, 1)
                    setPosts(refreshed.posts)
                }
            } catch (error) {
                console.error('Error unliking post:', error);
            }
            setIsLoading(false);
        } else {
            setIsLoading(true);
            try {
                const response = await api.likePost(postId);
                if (response && response.success) {
                    // window.location.reload();
                    const refreshed = await api.fetchThreadPosts(id, 1)
                    setPosts(refreshed.posts)
                }
            } catch (error) {
                console.error('Error liking post:', error);
            }
            setIsLoading(false);
        }
    };

    return (
        <>
            {isLoading ? (
                <div role="status">
                    <svg className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-700" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.081</svg>44 27.9921 9.08144 50.5908Z" fill="currentColor" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                    </svg>
                    <span className="sr-only">Loading...</span>
                </div>
            ) : (
                posts?.slice(0, limit)?.map((post) => (
                    <div
                        key={post.id}
                        className="flex items-center mb-7 border border-gray-300 rounded-lg shadow-lg bg-gray-50 p-4"
                    >
                        <div className="w-full">
                            <div className="flex items-center justify-between w-full">
                                <p className="text-xs text-gray-600 mb-4">{formatDate(post.createdAt)}</p>
                            </div>
                            <p className="mt-3 text-gray-600 text-sm">{post.body}</p>
                        </div>
                        <div className="flex items-end mt-4">
                            <span className="text-xs text-blue-600 font-semibold mr-2">
                                {post.likes ? post.likes.length : 0} Likes
                            </span>
                            <button
                                disabled={isLoading}
                                className={`text-xs text-white rounded px-2 py-1 ${userLiked(post) ? 'bg-red-500 hover:bg-red-700' : 'bg-blue-500 hover:bg-blue-700'}`}
                                onClick={() => onLike(post.id, userLiked(post))}
                            >
                                {userLiked(post) ? 'Unlike' : 'Like'}
                            </button>
                        </div>
                    </div>
                ))
            )}
        </>
    );
}