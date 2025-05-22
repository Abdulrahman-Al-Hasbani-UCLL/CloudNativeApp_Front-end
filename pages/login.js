import Meta from "@/components/Meta";
import Sidebar from "@/components/Sidebar";
import Link from "next/link";
import ForumApiService from "@/hooks/data/ForumApiService";
import { useState } from "react";
import { useRouter } from "next/router";

const Login = ({ forumUser }) => {
    const [submittingState, setSubmittingState] = useState(false);
    const [error, setError] = useState(null);
    const router = useRouter();
    const api = ForumApiService();

    if (forumUser?.id) {
        router.push(`/`);
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        setSubmittingState(true);
        setError(null);

        const login = e.target.login.value;
        const password = e.target.password.value;

        try {
            const loginData = await api.loginUser(login, password);
            if (loginData.token) {
                localStorage.setItem("forumUserToken", loginData.token);
                const userData = await api.fetchUser(loginData.token);
                if (userData.id) {
                    localStorage.setItem("forumUser", JSON.stringify(userData));
                    router.push("/");
                }
            } else {
                setError(loginData.error || "Login failed");
            }
        } catch (err) {
            setError("An error occurred during login.");
        }
        setSubmittingState(false);
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setSubmittingState(true);
        setError(null);

        const username = e.target.username.value;
        const email = e.target.email.value;
        const password = e.target.password.value;

        try {
            const registerData = await api.registerUser(username, email, password);
            if (registerData.id) {
                // Optionally, auto-login after registration
                const loginData = await api.loginUser(email, password);
                if (loginData.token) {
                    localStorage.setItem("forumUserToken", loginData.token);
                    const userData = await api.fetchUser(loginData.token);
                        if (userData.id) {
                            localStorage.setItem("forumUser", JSON.stringify(userData));
                            router.push("/");
                        }
                }
            } else {
                setError(registerData.error || "Registration failed");
            }
        } catch (err) {
            setError("An error occurred during registration.");
        }
        setSubmittingState(false);
    };

    return (
        <>
            <Meta title="Login" />
            <div className="flex flex-row w-full">
                <Sidebar data={forumUser} />
                <div className="flex flex-col lg:w-full items-center justify-center mx-auto md:h-screen lg:py-0">
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h3 className="mb-5 text-white-900 font-medium text-xl dark:text-white">Login</h3>
                            {error && <div className="text-red-500">{error}</div>}
                            <form className="space-y-4 md:space-y-6" action="POST" onSubmit={handleLogin}>
                                <div>
                                    <label htmlFor="username-email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        Username/Email
                                    </label>
                                    <input
                                        type="text"
                                        name="login"
                                        id="username-email"
                                        className="
                                            bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg
                                            focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5
                                            dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                                            dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="username/name@company.com"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="login-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        name="password"
                                        id="login-password"
                                        placeholder="••••••••"
                                        className="
                                            bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg
                                             focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5
                                             dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                                             dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="bg-blue-700 text-sm  text-white rounded hover:bg-blue-600 transition duration-150 ease-in-out py-2 px-6"
                                    disabled={submittingState}
                                >
                                    Login
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col lg:w-full items-center justify-center mx-auto md:h-screen lg:py-0">
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h3 className="mb-5 text-white-900 font-medium text-xl dark:text-white">
                                Create an account
                            </h3>
                            {error && <div className="text-red-500">{error}</div>}
                            <form className="space-y-4 md:space-y-6" action="POST" onSubmit={handleRegister}>
                                <div>
                                    <label
                                        htmlFor="username"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Username
                                    </label>
                                    <input
                                        type="text"
                                        name="username"
                                        id="username"
                                        className="
                                            bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600
                                            focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600
                                            dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="my_username"
                                        required
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        className="
                                            bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600
                                            focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600
                                            dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="name@company.com"
                                        required
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="password"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        placeholder="••••••••"
                                        className="
                                            bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600
                                            focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600
                                            dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        required
                                    />
                                </div>
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input
                                            id="terms"
                                            aria-describedby="terms"
                                            type="checkbox"
                                            className="
                                                w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300
                                                dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                                            required
                                        />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label
                                            htmlFor="terms"
                                            className="font-light text-gray-500 dark:text-gray-300"
                                        >
                                            I accept the{" "}
                                            <Link
                                                className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                                                href="#"
                                            >
                                                Terms and conditions
                                            </Link>
                                        </label>
                                    </div>
                                </div>
                                <button
                                    type="submit"
                                    className="bg-blue-700 text-sm text-white rounded hover:bg-blue-600 transition duration-150 ease-in-out py-2 px-6"
                                    disabled={submittingState}
                                >
                                    Create account
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export async function getServerSideProps(context) {
    const api = ForumApiService();
    const { forumUserToken } = context.req.cookies;
    let forumUser = null;

    if (forumUserToken) {
        const userResponse = await api.fetchUser(forumUserToken);
        if (userResponse?.id) {
            forumUser = userResponse;
        }
    }

    return {
        props: {
            forumUser,
        }
    };
}

export default Login;
