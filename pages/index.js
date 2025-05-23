import { useState, useEffect } from 'react';
import Meta from '@/components/Meta/index';
import Link from 'next/link';
import Sidebar from '@/components/Sidebar/index';
import Search from '../components/threads/search';
import Threads from '../components/threads/threads';
import ForumApiService from '@/hooks/data/ForumApiService';

const Support = ({ threads, currentPage, nextThreadCursor }) => {
    const [title, setTitle] = useState('');
    const [threadsData, setThreadsData] = useState(threads || []);
    const [forumUser, setForumUser] = useState(null);

    useEffect(() => {
        setThreadsData(threads);
    }, [threads]);

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
            });
            } 
        }
    }, []);

    return (
        <>
            <Meta title="Forum Y" />
            <div className="flex flex-no-wrap">
                <Sidebar />
                <div className="w-full">
                    <div className="w-full px-6">
                        <div className="lg:flex flex-wrap">
                            <div className="py-10 lg:w-2/3 w-full md:pr-6 md:border-r border-gray-300">
                                <div>
                                    <Link href="/"><h1 className="text-3xl text-gray-900 font-bold mb-3">Forum Y: The home off cloud engineers</h1></Link>
                                    {forumUser && (<p className="text-gray-600 text-sm">Welcome, {forumUser.username}</p>)}
                                    <div className="flex flex-col mt-10 md:flex-row md:items-center">
                                        <Search onSearchResults={setThreadsData} />
                                        <div className="w-full md:w-1/2 pt-3 md:pt-0 md:pl-3">
                                            <h3 className="text-xl text-gray-900 mb-2">Post a thread</h3>
                                            <div className="flex flex-col">
                                                <label
                                                    htmlFor="post_thread"
                                                    className="hidden text-gray-800 text-sm font-bold leading-tight tracking-normal mb-2"
                                                />
                                                <div className="relative w-full mb-2">
                                                    <input
                                                        id="post_thread"
                                                        className="
                                                            text-gray-600 focus:outline-none focus:border
                                                            focus:border-blue-700 bg-gray-100 font-normal w-full
                                                            h-10 flex items-center pl-4 text-sm border-gray-300
                                                            rounded border"
                                                        placeholder="Type a title"
                                                        onChange={(e) => setTitle(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex flex-col md:flex-row md:items-center">
                                                <div className="w-full md:w-1/2" />
                                                <div className="w-full md:w-1/2 md:flex md:mb-0 mb-4 justify-end">
                                                    <Link
                                                        className="
                                                            bg-blue-700 text-sm text-white rounded
                                                            hover:bg-blue-600 transition duration-150 ease-in-out
                                                            py-2 px-6 sm:mt-0 mt-4"
                                                        href={{
                                                            pathname: forumUser ? '/new-thread' : '/login',
                                                            query: title && { title },
                                                        }}
                                                    >
                                                        Continue
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center mt-6 space-x-4">
                                        {currentPage > 1 ? (
                                            <Link
                                                href={`/?page=${currentPage - 1}`}
                                                className="flex items-center text-blue-500 hover:underline"
                                            >
                                                {/* Left Arrow SVG */}
                                                <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                                                </svg>
                                                Previous
                                            </Link>
                                        ) : <span />}

                                        <span className="text-gray-600">Page {currentPage}</span>

                                        {true ? (
                                            <Link
                                                href={`/?page=${currentPage + 1}`}
                                                className="flex items-center text-blue-500 hover:underline"
                                            >
                                                Next
                                                {/* Right Arrow SVG */}
                                                <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                                </svg>
                                            </Link>
                                        ) : <span />}
                                    </div>
                                    <div className="mt-6">
                                        <Threads data={threadsData} />
                                    </div>
                                    
                                </div>
                            </div>
                            <div className="lg:w-1/3 w-full mt-10 lg:mt-0 px-4">
                                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Forum Highlights</h2>
                                <p className="text-gray-700 text-base">
                                    In this forum you can have disscussions about the latest tech in the world of Cloud computing
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export async function getServerSideProps(context) {
    const api = ForumApiService();
    const page = context.query.page || 1;

    const fetchThreads = async (page = 1) => {
        const threadsResponse = await api.fetchThreads(page);
        return {
            threads: threadsResponse?.threads || [],
            nextThreadCursor: threadsResponse?.nextThreadCursor || null,
        };
    };
    const { threads, nextThreadCursor } = await fetchThreads(page);

    return {
        props: {
            threads,
            currentPage: parseInt(page, 10),
            nextThreadCursor,
        }
    };
}

export default Support;
