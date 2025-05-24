import { useState, useEffect, useRef } from 'react';
import { PencilIcon } from '@heroicons/react/24/solid';
import ForumApiService from '@/hooks/data/ForumApiService';
import Sidebar from '@/components/Sidebar';

export default function Profile() {
    const api = ForumApiService();

    const [user, setUser] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [form, setForm] = useState({});
    
    const gradients = [
        "from-blue-400 via-purple-300 to-pink-400",
        "from-green-300 via-blue-500 to-purple-600",
        "from-yellow-200 via-green-200 to-green-500",
        "from-pink-200 via-red-300 to-yellow-200",
        "from-indigo-200 via-red-200 to-yellow-100"
    ];
    const [bg, setBg] = useState(gradients[Math.floor(Math.random() * gradients.length)]);

    useEffect(() => {
        setBg(gradients[Math.floor(Math.random() * gradients.length)]);
    }, []);
    const fileInputRef = useRef();

    useEffect(() => {
        const token = typeof window !== "undefined" ? localStorage.getItem("forumUserToken") : null;
        if (token) {
            const cachedUser = localStorage.getItem('forumUser');
            if (cachedUser) {
                setUser(JSON.parse(cachedUser));
            } else {
                api.fetchUser(token).then(setUser);
            }
        }
    }, []);

    useEffect(() => {
        if (user) setForm(user);
        console.log(user)
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (ev) => {
            const img = new window.Image();
            img.onload = () => {
                // Create a canvas to resize the image
                const canvas = document.createElement('canvas');
                const maxSize = 250;
                let width = img.width;
                let height = img.height;

                // Calculate new size while preserving aspect ratio
                if (width > height) {
                    if (width > maxSize) {
                        height *= maxSize / width;
                        width = maxSize;
                    }
                } else {
                    if (height > maxSize) {
                        width *= maxSize / height;
                        height = maxSize;
                    }
                }
                canvas.width = width;
                canvas.height = height;

                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);

                // Get the compressed image as a base64 string (JPEG, quality 0.8)
                const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
                setForm((prev) => ({ ...prev, image: dataUrl }));
            };
            img.src = ev.target.result;
        };
        reader.readAsDataURL(file);
    }
};

    const handleEdit = () => setEditMode(true);
    const handleCancel = () => {
        setEditMode(false);
        setForm(user);
    };

    const handleSave = async () => {
    setEditMode(false);
    const updatedUser = {
        username: form.username,
        email: form.email,
        displayName: form.displayName,
        bio: form.bio,
        url: form.url,
        image: form.image, // This is a base64 string if uploaded TODO: Change to be file upload for blob storage
    };
    await api.updateUser(user.id, updatedUser);
    setUser(form);
    localStorage.setItem('forumUser', JSON.stringify(updatedUser));
};

    if (!user) return <div className="flex justify-center items-center h-64">Loading...</div>;

    return (
        <div className={`min-h-screen w-full bg-gradient-to-br ${bg} flex flex-no-wrap`}>
            <Sidebar />
            <div className='flex flex-1 items-center justify-center'>
                <div className="flex flex-col items-center py-10">
                    <div className="relative">
                        {editMode ? (
                            <div className="flex flex-col items-center">
                                <input
                                    type="file"
                                    accept="image/*"
                                    ref={fileInputRef}
                                    className="hidden"
                                    onChange={handleImageChange}
                                />
                                <div
                                    className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer overflow-hidden"
                                    onClick={() => fileInputRef.current.click()}
                                >
                                    {form.image ? (
                                        <img src={form.image} alt="Profile" className="object-cover w-full h-full" />
                                    ) : (
                                        <span className="text-gray-400">Upload</span>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <img // TODO: fix default img logic 
                                src={user.image ? user.image : 'public/default-profile.png'}
                                alt="Profile"
                                className="w-32 h-32 rounded-full object-cover bg-gray-200"
                            />
                        )}
                        {!editMode && (
                            <button
                                className="absolute bottom-2 right-2 bg-blue-600 p-2 rounded-full text-white hover:bg-blue-700"
                                onClick={handleEdit}
                                title="Edit Profile"
                            >
                                <PencilIcon className="w-5 h-5" />
                            </button>
                        )}
                    </div>
                    <div className="mt-4 text-center w-full max-w-md">
                        <div className="text-xs text-blue-600 mb-1 break-all">{user.url && (editMode ? (
                            <input
                                type="text"
                                name="url"
                                value={form.url || ''}
                                onChange={handleChange}
                                className="border rounded px-2 py-1 w-full text-xs"
                                placeholder="Website URL"
                            />
                        ) : user.url)}</div>
                        <div className="flex items-center justify-center gap-2">
                            <span className="text-3xl font-bold text-gray-800">
                                {editMode ? (
                                    <input
                                        type="text"
                                        name="displayName"
                                        value={form.displayName || ''}
                                        onChange={handleChange}
                                        className="border rounded px-2 py-1 text-2xl font-bold"
                                        placeholder="Display Name"
                                    />
                                ) : user.displayName}
                            </span>
                            <span className="text-lg text-gray-400">@{user.username}</span>
                        </div>
                        <div className="mt-2 text-gray-600">
                            {editMode ? (
                                <textarea
                                    name="bio"
                                    value={form.bio || ''}
                                    onChange={handleChange}
                                    className="border rounded px-2 py-1 w-full"
                                    placeholder="Bio"
                                />
                            ) : user.bio}
                        </div>
                        <div className="mt-2 text-sm text-gray-500">
                            Reputation: <span className="font-semibold text-blue-700">{user.reputation}</span>
                        </div>
                        <div className="mt-6 flex justify-center gap-3">
                            {editMode ? (
                                <>
                                    <button
                                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                                        onClick={handleSave}
                                    >
                                        Save
                                    </button>
                                    <button
                                        className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                                        onClick={handleCancel}
                                    >
                                        Cancel
                                    </button>
                                </>
                            ) : null}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}