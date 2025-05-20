import ForumApiService from '@/hooks/data/ForumApiService';
export default async function handler(req, res) {
    const { username, email, password } = req.body;
    const api = ForumApiService();
    try {
        const registerData = await api.registerUser(username, email, password);
        return res.json(registerData);
    } catch (error) {
        console.error('Error registering:', error);
        return res.status(500).json({ error: error.message });
    }
}