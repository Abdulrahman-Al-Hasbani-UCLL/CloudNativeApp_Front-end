import ForumApiService from '@/hooks/data/ForumApiService';
export default async function handler(req, res) {
    const { body, threadId, userId } = req.body;
    const api = ForumApiService();
    try {
        const postData = await api.createPost(body, threadId, userId);
        return res.json(postData);
    } catch (error) {
        console.error('Error creating post:', error);
        return res.status(500).json({ error: error.message });
    }
}