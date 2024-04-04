import Nav from "@/components/nav";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  if (!session) {
    return (
      <div className="bg-blue-900 flex justify-center items-center h-screen w-screen">
        <div className="text-center w-full">
          <button
            className="text-[100px] bg-white p-[100px] rounded-[50%]"
            onClick={() => signIn("google")}
          >
            Login With Google ..
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="text-[100px] bg-blue-700">
      <Nav/>
      <h1 className="text-[100px]">logged in {session.user.email}</h1>
      <button
             className="text-[100px] bg-white p-[100px] rounded-[50%]"
            onClick={() => signOut("google")}
          > sign signOut</button>
    </div>
  );
}
