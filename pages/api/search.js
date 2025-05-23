import ForumApiService from '@/hooks/data/ForumApiService';
export default async function handler(req, res) {
    const { query, type } = req.body;
    const api = ForumApiService();
    try {
        const searchData = await api.search(query, type.toLowerCase());
        return res.json(searchData);
    } catch (error) {
        console.error('Error searching:', error);
        return res.status(500).json({ error: error.message });
    }
}