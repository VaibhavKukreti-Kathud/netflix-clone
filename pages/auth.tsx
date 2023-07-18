import Input from "@/components/input";
import { useState, useCallback } from "react";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

const Auth = () => {
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [variant, setVariant] = useState('login');

    const toggleVariant = useCallback(() => {
        setVariant((prev) => {
            if (prev === 'login') {
                return 'register';
            } else {
                return 'login';
            }
        }
        );
    }, []);

    const login = useCallback(async () => {
        try {
            await signIn('credentials', {
                email,
                password,
                redirect: false,
                callbackUrl: '/'
            });
            router.push('/');
        } catch (error) {
            console.log(error);
        }
    }, [email, password, router]);

    const register = useCallback(async () => {
        try {
            await axios.post('/api/register', {
                email,
                name,
                password
            });
            login();
        } catch (error) {
            console.log(error);
        }
    }, [email, name, password, login]);


    return (
        <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-cover bg-fixed">
            <div className="bg-black w-full h-full lg:bg-opacity-50">
                <nav className="px-12 py-5">
                    <img src="/images/logo.png" alt="logo" className="h-12"></img>
                </nav>
                <div className="flex justify-center">
                    <div className="bg-black px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full h-full">
                        <h2 className="text-white text-4xl mb-8 font-semibold">
                            {variant === 'login' ? 'Sign in' : 'Register'}
                        </h2>
                        <div className="flex flex-col gap-4">
                            {variant === "register" && (<Input
                                label="Username"
                                id="name"
                                value={name}
                                onChange={(event: any) => { setName(event.target.value) }}
                            />)}
                            <Input
                                label="Email"
                                id="email"
                                type="email"
                                value={email}
                                onChange={(event: any) => { setEmail(event.target.value) }}
                            />
                            <Input
                                label="Password"
                                id="password"
                                type="password"
                                value={password}
                                onChange={(event: any) => { setPassword(event.target.value) }}
                            />
                        </div>
                        <button
                            onClick={variant === "login" ? login : register}
                            className="
                    bg-red-600 py-3 px-6 rounded-md text-white mt-10 w-full hover:bg-red-700 transition duration-200 ease-out"
                        >{variant === "login" ? "Login" : "Create account"}</button>

                        <div className="flex items-center justify-center gap-4 mt-8">
                            <div className="border border-gray-500 w-full"></div>
                            <p className="text-gray-500">Or</p>
                            <div className="border border-gray-500 w-full"></div>
                        </div>
                        <div className="flex items-center justify-center gap-4 mt-8">
                            <button onClick={() => signIn("google", { callbackUrl: "/" })} className="bg-gray-800 py-3 px-6 rounded-md text-white w-full hover:bg-gray-900 transition duration-200 ease-out">
                                <FcGoogle className="inline-block mr-2" /> Google
                            </button>
                            <button onClick={() => signIn('github', { callbackUrl: '/' })} className="bg-gray-800 py-3 px-6 rounded-md text-white w-full hover:bg-gray-900 transition duration-200 ease-out">
                                <FaGithub className="inline-block mr-2" /> Github
                            </button>
                        </div>



                        <p className="text-neutral-500 mt-12">
                            {variant === "login" ? "First time using netflix?" : "Already have an account?"}
                            <span onClick={
                                toggleVariant
                            } className="text-white ml-1 hover:underline cursor-pointer">{variant === "login" ? "Create an account." : "Sign in."}</span>

                        </p>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Auth;