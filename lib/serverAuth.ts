import { NextApiRequest } from "next";
import prismadb from "./prismadb";
import {getSession} from 'next-auth/react';

const  serverAuth = async (req: NextApiRequest) => {
    const session = await getSession({req});
    if (!session?.user?.email) {
        return new Error("Not authenticated");
    }
    
    const currentUser = await prismadb.user.findUnique({
        where: {
        email: session.user.email
        }
    });
    
    if (!currentUser) {
        return Error("User not found");
    }

    return {currentUser};
}

export default serverAuth;
