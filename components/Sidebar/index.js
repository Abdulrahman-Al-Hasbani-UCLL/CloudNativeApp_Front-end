import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Sidebar = () => {
    const [isMobileNavHidden, setIsMobileNavHidden] = useState(true);
    const [loggedinUser, setLoggedInUser] = useState(false);
    const router = useRouter();
    useEffect(() => {
        const loginToken = localStorage.getItem("forumUserToken");
        if (loginToken) {
            setLoggedInUser(true);
        } else {
            setLoggedInUser(false);
        }
    }, [])

    const sidebarHandler = () => {
        setIsMobileNavHidden(!isMobileNavHidden);
    };

    return (
        <div className="min-h-screen border-r border-gray-100 sticky top-0 h-full bg-gray-100 z-20">
            <div className="relative top-0 min-h-screen bottom-0 flex items-center flex-col p-4">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-menu-2 cursor-pointer mt-4"
                    width={20}
                    height={20}
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="#718096"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    onClick={sidebarHandler}
                >
                    <path stroke="none" d="M0 0h24v24H0z" />
                    <line x1={4} y1={6} x2={20} y2={6} />
                    <line x1={4} y1={12} x2={20} y2={12} />
                    <line x1={4} y1={18} x2={20} y2={18} />
                </svg>
                <ul aria-orientation="vertical" className="rounded py-8">
                    <li className="
                        cursor-pointer text-gray-600 text-sm leading-3 tracking-normal py-1 hover:text-blue-700
                        focus:text-blue-700 focus:outline-none"
                    >
                        <Link href="/">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="icon icon-tabler icon-tabler-grid"
                                width={20}
                                height={20}
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path stroke="none" d="M0 0h24v24H0z" />
                                <rect x={4} y={4} width={6} height={6} rx={1} />
                                <rect x={14} y={4} width={6} height={6} rx={1} />
                                <rect x={4} y={14} width={6} height={6} rx={1} />
                                <rect x={14} y={14} width={6} height={6} rx={1} />
                            </svg>
                        </Link>
                    </li>
                    <li className="
                        cursor-pointer text-gray-600 text-sm leading-3 tracking-normal mt-6 py-1
                        hover:text-blue-700 focus:text-blue-700 focus:outline-none flex items-center"
                    >
                        {loggedinUser ? (
                            <div>
                                {/* Logout icon */}
                                <button
                                    onClick={() => {
                                        setLoggedInUser(false);
                                        localStorage.removeItem("forumUserToken");
                                        alert("Logout sucessfull");
                                        router.push('/login');
                                    }}
                                    className="flex items-center"
                                >

                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="icon icon-tabler icon-tabler-logout"
                                        width={20}
                                        height={20}
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        fill="none"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path stroke="none" d="M0 0h24v24H0z" />
                                        <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
                                        <path d="M9 12h12l-3 -3" />
                                        <path d="M18 15l3 -3" />
                                    </svg>
                                </button>
                                {/* Profile icon */}
                                <button
                                    onClick={() => {
                                        router.push("/profile");
                                    }}>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="icon icon-tabler icon-tabler-acocunt mt-8"
                                        width={20}
                                        height={20}
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        fill="none"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path stroke="none" d="M0 0h24v24H0z" />
                                        <circle cx={12} cy={7} r={4} />
                                        <path d="M5.5 21h13a2 2 0 0 0 2-2v-1a7 7 0 0 0-14 0v1a2 2 0 0 0 2 2z" />
                                    </svg>

                                </button>
                            </div>
                        ) : (
                            <Link href="/login" className="flex items-center">
                                {/* Login/Register icon */}
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="icon icon-tabler icon-tabler-login"
                                    width={20}
                                    height={20}
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    aria-hidden="true"
                                >
                                    <path stroke="none" d="M0 0h24v24H0z" />
                                    <path d="M16 12h4" />
                                    <path d="M18 14v-4" />
                                    <path d="M4 18v-1a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v1a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1z" />
                                    <circle cx={8} cy={8} r={3} />
                                </svg>
                            </Link>
                        )}
                    </li>
                </ul>
            </div>
            <div
                className={`
                    absolute top-0 min-h-screen left-0 ml-10 flex items-start flex-col bg-gray-100 transition 
                    duration-300 ease-in-out transform 
                    ${isMobileNavHidden
                        ? '-left-full opacity-0 pointer-events-none'
                        : 'left-0 opacity-100 pointer-events-auto'}
                `}
                id="mobile-nav"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="opacity-0 pointer-events-none icon icon-tabler icon-tabler-menu-2 cursor-pointer mt-8"
                    width={20}
                    height={20}
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="#718096"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    onClick={sidebarHandler}
                >
                    <path stroke="none" d="M0 0h24v24H0z" />
                    <line x1={4} y1={6} x2={20} y2={6} />
                    <line x1={4} y1={12} x2={20} y2={12} />
                    <line x1={4} y1={18} x2={20} y2={18} />
                </svg>
                <ul
                    aria-orientation="vertical"
                    className="rounded py-8 pl-2 pr-32 whitespace-no-wrap"
                >
                    <li className="
                        cursor-pointer text-gray-600 text-sm leading-3 tracking-normal py-2
                        hover:text-blue-700 focus:text-blue-700 focus:outline-none"
                    >
                        <Link href="/" className="ml-2">
                            Home
                        </Link>
                    </li>

                    <li className="
                        cursor-pointer text-gray-600 text-sm tracking-normal mt-2 py-2
                        hover:text-blue-700 focus:text-blue-700 focus:outline-none flex items-center"
                    >
                        {loggedinUser ? (
                            <div>
                                <button
                                    onClick={() => {
                                        setLoggedInUser(false);
                                        localStorage.removeItem("forumUserToken")
                                        alert("Logout sucessfull");
                                        router.push('/login');
                                    }}
                                    className="flex items-center"
                                >
                                    <span className="ml-2 mt-3">Logout</span>
                                </button>

                                <Link href="/profile" className="flex items-center mt-8">
                                    <span className="ml-2">Profile</span>
                                </Link>
                            </div>
                        ) : (
                            <Link href="/login" className="flex items-center">
                                <span className="ml-2">Login/Register</span>
                            </Link>
                        )}
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
