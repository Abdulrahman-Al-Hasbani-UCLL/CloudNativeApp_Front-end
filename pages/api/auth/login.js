import ForumApiService from '@/hooks/data/ForumApiService';
export default async function handler(req, res) {
    const { login, password } = req.body;
    const api = ForumApiService();
    try {
        const loginData = await api.loginUser(login, password);
        return res.json(loginData);
    } catch (error) {
        console.error('Error logging in:', error);
        return res.status(500).json({ error: error.message });
    }
}