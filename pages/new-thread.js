import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Meta from '@/components/Meta/index';
import Sidebar from '@/components/Sidebar/index';
import ForumApiService from '@/hooks/data/ForumApiService';
import toast from 'react-hot-toast';
import Link from 'next/link';

export default function NewThread() {
    const router = useRouter();
    const api = ForumApiService();

    const [isSubmitting, setSubmittingState] = useState(false);
    const [formData, setFormData] = useState({ title: '', body: '' });
    const [forumUser, setForumUser] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const token = typeof window !== "undefined" ? localStorage.getItem("forumUserToken") : null;
        if (token) {
            const api = ForumApiService();
            const cachedUser = localStorage.getItem('forumUser');
            if (cachedUser) {
                setForumUser(JSON.parse(cachedUser));
            } else {
                api.fetchUser(token).then(user => {
                setForumUser(user);
                setLoading(false);
            });
            }
        } else {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (!loading && !forumUser?.id) {
            router.push(`/login`);
        }
    }, [forumUser, loading, router]);

    const onChange = (e) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [e.target.name]: e.target.value,
        }));
    };

    useEffect(() => {
        if (router.isReady) {
            const { title } = router.query;
            setFormData((prev) => ({
                ...prev,
                title: title || '',
            }));
        }
    }, [router.isReady, router.query]);

    const onSubmit = async (e) => {
        e.preventDefault();
        setSubmittingState(true);
        try {
            const data = await api.createThread(formData.title, formData.body, forumUser?.id);
            setSubmittingState(false);
            if (data?.errors) {
                Object.values(data.errors).forEach((error) =>
                    toast.error(error.msg)
                );
            } else if (data?.id) {
                toast.success('Thread successfully created!');
                router.push(`/thread/${data.id}`);
            }
        } catch (error) {
            console.error('Error creating thread:', error);
            setSubmittingState(false);
            toast.error('An error occurred while creating the thread.');
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-gray-600"></div>
            </div>
        );
    }

    return (
        <>
            <Meta title="New thread" />
            <div className="flex flex-no-wrap">
                <Sidebar data={forumUser} />
                <div className="flex flex-row w-full">
                    <div className="flex flex-col lg:w-full items-center justify-center mx-auto md:h-screen lg:py-0">
                        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                    Post a new thread
                                </h1>
                                <form
                                    className="space-y-4 md:space-y-6"
                                    action="POST"
                                    onSubmit={onSubmit}
                                >
                                    <div>
                                        <label
                                            htmlFor="title"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                            Title
                                        </label>
                                        <input
                                            onChange={onChange}
                                            type="text"
                                            name="title"
                                            value={formData.title}
                                            id="title"
                                            className="
                                            bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg
                                            focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5
                                            dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                                            dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="Thread title"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="body"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                            Body
                                        </label>
                                        <textarea
                                            onChange={onChange}
                                            name="body"
                                            id="body"
                                            rows="7"
                                            className="
                                            bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg
                                            focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5
                                            dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                                            dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="Thread body"
                                            required
                                        ></textarea>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="
                                        w-full text-white bg-blue-700 hover:bg-blue-600 focus:ring-4
                                        focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5
                                        py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700
                                        dark:focus:ring-blue-800"
                                    >
                                        Submit thread
                                    </button>
                                </form>
                            </div>
                        </div>

                        <Link href="/" className="btn btn-outline btn-neutral btn-wide mt-5">
                            Back to the forums
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
