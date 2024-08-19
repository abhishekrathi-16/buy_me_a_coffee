import NextAuth, { AuthOptions } from "next-auth";
import { authOptions } from "@/lib/authOptions";

const handler = NextAuth(authOptions as AuthOptions);

export { handler as GET, handler as POST };
