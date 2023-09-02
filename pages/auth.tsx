import Input from "@/components/input";
import { useState, useCallback } from "react";
import axios from "axios";
import { signIn, signOut, useSession } from "next-auth/react";
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
        <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-cover ">
            <div className="bg-black w-full h-full lg:bg-opacity-30">
                
               <div className="flex justify-center">
                <div className="
                mt-16
                duration-[150ms]
                shadow-none
                backdrop-blur-[25px]
                bg-white
                bg-opacity-10
                rounded-2xl w-1/3
                border-2
                border-white/[.15]
                focus-within:shadow-xl
                ">
                
                    <div className="py-10 self-center mt-0 mx-10 lg:max-w-md h-full">
                        {/* <h2 className="text-white text-4xl mb-8 font-semibold">
                            {variant === 'login' ? 'Sign in' : 'Register'}
                        </h2> */}
                        <div className="mb-10 mt-4 flex justify-center"><img src="/images/logo.png" alt="logo" className="h-12"></img></div>
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
                    bg-red-600/[0.9] py-3 px-6 rounded-md text-white mt-10 w-full hover:bg-red-600 hover:shadow-xl transition duration-200 ease-out"
                        >{variant === "login" ? "Login" : "Create account"}</button>
                        <p className="text-white/[0.4] mt-6 text-sm">
                            {variant === "login" ? "First time using netflix?" : "Already have an account?"}
                            <span onClick={
                                toggleVariant
                            } className="text-white/[0.8] ml-1 hover:underline cursor-pointer text-sm">{variant === "login" ? "Create an account." : "Sign in."}</span>

                        </p>

                        <div className="flex items-center justify-center gap-4 mt-5">
                            <div className="border border-white/[0.1] w-full"></div>
                            <p className="text-white/[0.3]">Or</p>
                            <div className="border border-white/[0.1] w-full"></div>
                        </div>
                        <div className="flex items-center justify-center gap-4 mt-5">
                            <button onClick={() => {
                                        signIn('google', { callbackUrl: '/' });
                                }}
                                className="bg-white/[0.1] py-3 px-6 rounded-md text-white/[0.8] w-full hover:bg-white/[0.2] hover:text-white hover:shadow-xl transition duration-200 ease-out">
                                <FcGoogle className="inline-block mr-1" /> Google
                            </button>
                            <button onClick={() => {
                                        signIn('github', { callbackUrl: '/' });
                                    }}
                            className="bg-white/[0.1] py-3 px-6 rounded-md text-white/[0.8] w-full hover:bg-white/[0.2] hover:text-white hover:shadow-xl transition duration-200 ease-out">
                            <FaGithub className="inline-block mr-1" /> Github
                            </button>
                        </div>



                        
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Auth;