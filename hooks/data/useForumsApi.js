const useForumsApi = () => {
    const fetchUsers = async (page) => {
        const response = await fetch(`${process.env.FORU_MS_API_URL}/users?page=${page}`, {
            method: 'GET',
            headers: {
                'x-api-key': process.env.FORU_MS_API_KEY,
            },
        });
        return await response.json();
    };

    const registerUser = async (username, email, password) => {
        const response = await fetch(`${process.env.FORU_MS_API_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': process.env.FORU_MS_API_KEY,
            },
            body: JSON.stringify({ username, email, password }),
        });
        return await response.json();
    };

    const loginUser = async (email, password) => {
        const response = await fetch(`${process.env.FORU_MS_API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': process.env.FORU_MS_API_KEY,
            },
            body: JSON.stringify({ login: email, password }),
        });
        return await response.json();
    };

    const updateUser = async (id, username, email, password) => {
        const response = await fetch(`${process.env.FORU_MS_API_URL}/user/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': process.env.FORU_MS_API_KEY,
            },
            body: JSON.stringify({ username, email, password }),
        });
        return await response.json();
    };

    const fetchUser = async (token) => {
        const response = await fetch(`${process.env.FORU_MS_API_URL}/auth/me`, {
            method: 'GET',
            headers: {
                'x-api-key': process.env.FORU_MS_API_KEY,
                'Authorization': `Bearer ${token}`,
            },
        });
        return await response.json();
    };

    const deleteUser = async (id) => {
        const response = await fetch(`${process.env.FORU_MS_API_URL}/user/${id}`, {
            method: 'DELETE',
            headers: {
                'x-api-key': process.env.FORU_MS_API_KEY,
            },
        });
        return await response.json();
    };

    const fetchThreads = async (page = 1) => {
        const response = await fetch(`${process.env.FORU_MS_API_URL}/threads?page=${page}`, {
            method: 'GET',
            headers: {
                'x-api-key': process.env.FORU_MS_API_KEY,
            },
        });
        return await response.json();
    };

    const createThread = async (title, body, userId) => {
        const response = await fetch(`${process.env.FORU_MS_API_URL}/thread`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': process.env.FORU_MS_API_KEY,
            },
            body: JSON.stringify({ title, body, userId }),
        });
        return await response.json();
    };

    const fetchThread = async (id) => {
        const response = await fetch(`${process.env.FORU_MS_API_URL}/thread/${id}`, {
            method: 'GET',
            headers: {
                'x-api-key': process.env.FORU_MS_API_KEY,
            },
        });
        return await response.json();
    };

    const updateThread = async (id, title, body) => {
        const response = await fetch(`${process.env.FORU_MS_API_URL}/thread/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': process.env.FORU_MS_API_KEY,
            },
            body: JSON.stringify({ title, body }),
        });
        return await response.json();
    };

    const deleteThread = async (id) => {
        const response = await fetch(`${process.env.FORU_MS_API_URL}/thread/${id}`, {
            method: 'DELETE',
            headers: {
                'x-api-key': process.env.FORU_MS_API_KEY,
            },
        });
        return await response.json();
    };

    const fetchThreadPosts = async (threadId, page = 1) => {
        const response = await fetch(`${process.env.FORU_MS_API_URL}/thread/${threadId}/posts?page=${page}`, {
            method: 'GET',
            headers: {
                'x-api-key': process.env.FORU_MS_API_KEY,
            },
        });
        return await response.json();
    };

    const fetchPosts = async (page = 1) => {
        const response = await fetch(`${process.env.FORU_MS_API_URL}/posts?page=${page}`, {
            method: 'GET',
            headers: {
                'x-api-key': process.env.FORU_MS_API_KEY,
            },
        });
        return await response.json();
    };

    const createPost = async (body, threadId, userId) => {
        const response = await fetch(`${process.env.FORU_MS_API_URL}/post`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': process.env.FORU_MS_API_KEY,
            },
            body: JSON.stringify({ body, threadId, userId }),
        });
        return await response.json();
    };

    const fetchPost = async (id) => {
        const response = await fetch(`${process.env.FORU_MS_API_URL}/post/${id}`, {
            method: 'GET',
            headers: {
                'x-api-key': process.env.FORU_MS_API_KEY,
            },
        });
        return await response.json();
    };

    const updatePost = async (id, body) => {
        const response = await fetch(`${process.env.FORU_MS_API_URL}/post/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': process.env.FORU_MS_API_KEY,
            },
            body: JSON.stringify({ body }),
        });
        return await response.json();
    };

    const deletePost = async (id) => {
        const response = await fetch(`${process.env.FORU_MS_API_URL}/post/${id}`, {
            method: 'DELETE',
            headers: {
                'x-api-key': process.env.FORU_MS_API_KEY,
            },
        });
        return await response.json();
    };

    const search = async (query, type, page = 1) => {
        const response = await fetch(`${process.env.FORU_MS_API_URL}/search/${query}?type=${type}&page=${page}`, {
            method: 'POST',
            headers: {
                'x-api-key': process.env.FORU_MS_API_KEY,
            },
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

export default useForumsApi;