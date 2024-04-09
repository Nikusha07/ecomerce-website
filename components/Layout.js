import Nav from "./nav";
import { useSession, signIn } from "next-auth/react";

function Layout({ children }) {
  const { data: session } = useSession();
  if (!session) {
    return (
      <div className="flex justify-center items-center h-screen">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => signIn("google")}
        >
          Login With Google
        </button>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-5 h-screen">
      <div className="col-span-1">
        <Nav />
      </div>
      <div className="col-span-4 bg-white p-8">
        {children}
      </div>
    </div>
  );
}

export default Layout;
