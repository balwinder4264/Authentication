import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { verifyPassword } from "../../../lib/auth";
import { connectToDatabase } from "../../../lib/db";

export default NextAuth({
    session:{
        jwt:true
    },
    providers:[
        Providers.Credentials({
               async authorize(credentials){
                const client= await  connectToDatabase();
                const userCollection = client.db().collection('users');
                const user=await userCollection.findOne({email:credentials.email});
                if(!user){
                    client.close();
                    throw new Error('No User Find')
                }

              const isvalid= await verifyPassword(credentials.password,user.password);
              if(!isvalid){
                client.close();
                  throw new Error("Could not log you in")
              }
              client.close();
              return {email:user.email}
            }
        })
    ]
});