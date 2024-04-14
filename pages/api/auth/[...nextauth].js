import clientPromise from "@/lib/mongodb";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import NextAuth, { getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
const adminEmails = ["nikatefnadze3@gmail.com"]

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
  callbacks: {
    session: ({session, token, user }) => {
      if(adminEmails.includes(session?.user?.email)){
        return session;
      }else {
        return "this email not can use admin panel"
      }
    },
  },
}


export default NextAuth(authOptions);


export async function isAdminReq(req, res) {
  const session = await getServerSession({ req, res });
  if (!session || !session.user || !adminEmails.includes(session.user.email)) {
    return false; 
  }
  return true;
}