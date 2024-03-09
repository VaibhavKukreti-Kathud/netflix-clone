import { NextPageContext } from "next";
import {  getSession,signOut, useSession} from "next-auth/react";
import { use } from "react";


export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);
  if(!session){
    return {
      redirect:{
        destination: "/auth",
        permanent: false
      }
    }
  }
  return {
    props: {}
  }
}

export default function Home() {

  const session = useSession();
  const user = session?.data?.user;
  
  return (
    <div>
      <h1 className="text-2xl text-white">
        Welcome {user?.name}!
      </h1>
      <button className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded" onClick={() => signOut(
        {callbackUrl: "/auth"}
      )}>
        Sign out
      </button>
    </div>
  );
    
  
};
