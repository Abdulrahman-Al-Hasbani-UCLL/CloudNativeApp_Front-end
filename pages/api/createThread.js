import ForumApiService from '@/hooks/data/ForumApiService';
export default async function handler(req, res) {
    const { title, body, userId } = req.body;
    const api = ForumApiService();
    try {
        const threadData = await api.createThread(title, body, userId);
        return res.json(threadData);
    } catch (error) {
        console.error('Error creating thread:', error);
        return res.status(500).json({ error: error.message });
    }
}