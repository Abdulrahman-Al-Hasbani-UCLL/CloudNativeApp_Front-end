const ForumApiService = () => {
    const API_URL = process.env.NEXT_PUBLIC_FORU_MS_API_URL;

    const fetchUsers = async (page) => {
        const userToken = typeof window !== "undefined" ? localStorage.getItem("forumUserToken") : null;
        const response = await fetch(`${API_URL}/users?page=${page}`, {
            method: 'GET',
            headers: {
                ...(userToken && { 'Authorization': `Bearer ${userToken}` }),
            },
        });
        return await response.json();
    };

    const registerUser = async (username, email, password) => {
        const response = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, email, password }),
        });
        return await response.json();
    };

    const loginUser = async (email, password) => {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ login: email, password }),
        });
        return await response.json();
    };

    const updateUser = async (id, username, email, password) => {
        const userToken = typeof window !== "undefined" ? localStorage.getItem("forumUserToken") : null;
        const response = await fetch(`${API_URL}/user/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                ...(userToken && { 'Authorization': `Bearer ${userToken}` }),
            },
            body: JSON.stringify({ username, email, password }),
        });
        return await response.json();
    };

    const fetchUser = async (token) => {
        const response = await fetch(`${API_URL}/auth/me`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        return await response.json();
    };

    const deleteUser = async (id) => {
        const userToken = typeof window !== "undefined" ? localStorage.getItem("forumUserToken") : null;
        const response = await fetch(`${API_URL}/user/${id}`, {
            method: 'DELETE',
            headers: {
                ...(userToken && { 'Authorization': `Bearer ${userToken}` }),
            },
        });
        return await response.json();
    };

    const fetchThreads = async (page = 1) => {
        const response = await fetch(`${API_URL}/threads?page=${page}`, {
            method: 'GET',
            headers: {
            },
        });
        return await response.json();
    };

    const createThread = async (title, body, userId) => {
        const userToken = typeof window !== "undefined" ? localStorage.getItem("forumUserToken") : null;
        const response = await fetch(`${API_URL}/thread`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...(userToken && { 'Authorization': `Bearer ${userToken}` }),
            },
            body: JSON.stringify({ title, body, userId }),
        });
        return await response.json();
    };

    const fetchThread = async (id) => {
        const response = await fetch(`${API_URL}/thread/${id}`, {
            method: 'GET',
            headers: {
            },
        });
        return await response.json();
    };

    const updateThread = async (id, title, body) => {
        const userToken = typeof window !== "undefined" ? localStorage.getItem("forumUserToken") : null;
        const response = await fetch(`${API_URL}/thread/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                ...(userToken && { 'Authorization': `Bearer ${userToken}` }),
            },
            body: JSON.stringify({ title, body }),
        });
        return await response.json();
    };

    const deleteThread = async (id) => {
        const userToken = typeof window !== "undefined" ? localStorage.getItem("forumUserToken") : null;
        const response = await fetch(`${API_URL}/thread/${id}`, {
            method: 'DELETE',
            headers: {
                ...(userToken && { 'Authorization': `Bearer ${userToken}` }),
            },
        });
        return await response.json();
    };

    const fetchThreadPosts = async (threadId, page = 1) => {
        const userToken = typeof window !== "undefined" ? localStorage.getItem("forumUserToken") : null;
        const response = await fetch(`${API_URL}/thread/${threadId}/posts?page=${page}`, {
            method: 'GET',
            headers: {
                ...(userToken && { 'Authorization': `Bearer ${userToken}` }),
            },
        });
        return await response.json();
    };

    const fetchPosts = async (page = 1) => {
        const userToken = typeof window !== "undefined" ? localStorage.getItem("forumUserToken") : null;
        const response = await fetch(`${API_URL}/posts?page=${page}`, {
            method: 'GET',
            headers: {
                ...(userToken && { 'Authorization': `Bearer ${userToken}` }),
            },
        });
        return await response.json();
    };

    const createPost = async (body, threadId, userId) => {
        const userToken = typeof window !== "undefined" ? localStorage.getItem("forumUserToken") : null;
        const response = await fetch(`${API_URL}/post`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...(userToken && { 'Authorization': `Bearer ${userToken}` }),
            },
            body: JSON.stringify({ body, threadId, userId }),
        });
        return await response.json();
    };

    const fetchPost = async (id) => {
        const userToken = typeof window !== "undefined" ? localStorage.getItem("forumUserToken") : null;
        const response = await fetch(`${API_URL}/post/${id}`, {
            method: 'GET',
            headers: {
                ...(userToken && { 'Authorization': `Bearer ${userToken}` }),
            },
        });
        return await response.json();
    };

    const updatePost = async (id, body) => {
        const userToken = typeof window !== "undefined" ? localStorage.getItem("forumUserToken") : null;
        const response = await fetch(`${API_URL}/post/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                ...(userToken && { 'Authorization': `Bearer ${userToken}` }),
            },
            body: JSON.stringify({ body }),
        });
        return await response.json();
    };

    const deletePost = async (id) => {
        const userToken = typeof window !== "undefined" ? localStorage.getItem("forumUserToken") : null;
        const response = await fetch(`${API_URL}/post/${id}`, {
            method: 'DELETE',
            headers: {
                ...(userToken && { 'Authorization': `Bearer ${userToken}` }),
            },
        });
        return await response.json();
    };

    const search = async (query, type, page = 1) => {
        const userToken = typeof window !== "undefined" ? localStorage.getItem("forumUserToken") : null;
        const response = await fetch(`${API_URL}/search?page=${page}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...(userToken && { 'Authorization': `Bearer ${userToken}` }),
            },
            body: JSON.stringify({ query, type }),
        });
        return await response.json();
    };

    return {
        fetchUsers,
        registerUser,
        loginUser,
        updateUser,
        fetchUser,
        deleteUser,
        fetchThreads,
        createThread,
        fetchThread,
        updateThread,
        deleteThread,
        fetchThreadPosts,
        fetchPosts,
        createPost,
        fetchPost,
        updatePost,
        deletePost,
        search,
    };
};

export default ForumApiService;