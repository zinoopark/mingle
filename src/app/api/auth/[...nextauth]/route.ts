import NextAuth, {NextAuthOptions} from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import {SupabaseAdapter} from "@auth/supabase-adapter";
import {Adapter} from "next-auth/adapters";

const handler = NextAuth({
        providers: [
            GoogleProvider({
                    clientId: process.env.GOOGLE_CLIENT_ID ?? "",
                    clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
                }
            ),
        ],
        // adapter for supabase
        adapter: SupabaseAdapter({
            url: process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
            secret: process.env.NEXT_PUBLIC_SUPABASE_ROLE_KEY ?? "",
        }) as Adapter,
    }
);


// if you want to test, sigin in at : http://localhost:3000/api/auth/signin

export {handler as GET, handler as POST}