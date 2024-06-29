import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { User } from "./modals/User";
import bcrypt from 'bcryptjs'
import { ConnectToDb } from "./utils";
import GoogleProvider from 'next-auth/providers/google'
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from "./db";


export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  session:{strategy:'jwt'||'database'},
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    Credentials({
      authorize: async (credentials) => {
            await ConnectToDb()
            const user = await User.findOne({email : credentials.email})
            if(!user){
                return null
            }
            const isUser = bcrypt.compareSync(credentials.password,user.password)
            if(!isUser){
                return null
            }
            return user
      },
    }),
  ],
  callbacks:{
    jwt({ token, trigger, session }) {
      if (trigger === "update" && session) {
        // Note, that `session` can be any arbitrary object, remember to validate it!
        token.name = session.name
        token.picture = session.image
        
      }
      return token
    },
  } 
});
