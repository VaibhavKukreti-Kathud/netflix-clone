import { SessionProvider, signIn, signOut, useSession } from "next-auth/react"
export default function Home() {
  const { data: session } = useSession();
  if(!session){
    return (
      <div>
        <h1 className="text-2xl text-white">
          Not signed in
        </h1>
        <button className="bg-red-500 hover:bg-blue-700 text-white py-2 px-4 rounded" onClick={() => signIn("github")}>
          Sign in
        </button>
      </div>
    );
  }else{
    return (
      <div>
        <h1 className="text-2xl text-white">
          {session?.user?.email ?? "Not signed in"}
        </h1>
        <button className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded" onClick={() => signOut()}>
          Sign out
        </button>
      </div>
    );
  };
};
