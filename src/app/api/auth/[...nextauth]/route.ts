import NextAuth, {NextAuthOptions} from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import KakaoProvider from "next-auth/providers/kakao";
import FacebookProvider from "next-auth/providers/facebook";
import {MongoDBAdapter} from "@auth/mongodb-adapter";
import clientPromise from "@/lib/mongodb";

const handler = NextAuth({
        // Login Providers,
        providers: [
            GoogleProvider({
                    clientId: process.env.GOOGLE_CLIENT_ID ?? "",
                    clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
                }
            ),
            KakaoProvider({
                    clientId: process.env.KAKAO_CLIENT_ID ?? "",
                    clientSecret: process.env.KAKAO_CLIENT_SECRET ?? "",
                },
            ),
            FacebookProvider({
                    clientId: process.env.FACEBOOK_CLIENT_ID ?? "",
                    clientSecret: process.env.FACEBOOK_CLIENT_SECRET ?? "",
                }
            ),
        ],
        // adapter for mongo db
        adapter: MongoDBAdapter(clientPromise),
    }
);

// if you want to test, sigin in at : http://localhost:3000/api/auth/signin
// if you want to see the session, go to : https://cloud.mongodb.com

export {handler as GET, handler as POST}