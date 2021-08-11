// /api/user/change-password
import {getSession} from "next-auth/client"
import { hashPassword, verifyPassword } from "../../../lib/auth";
import { connectToDatabase } from "../../../lib/db";
async function handler (req,res){

    if(req.method !=="PATCH"){
        return;
    }
    const session =await getSession({req:req});
    if(!session){
        res.status(401).json({message:"Not Authenticated!"});
        return;
    }
   
    const userEmail = session.user.email;
    const oldPassword = req.body.oldPassword;
    const newPassword  = req.body.newPassword;
    
    const client= await connectToDatabase();
    const userCollection=await client.db().collection('users');
   const user =await userCollection.findOne({email:userEmail});
  
   if(!user){
       res.status(404).json({message:"User not found"})
       client.close();
       return;
   }
   
   const currentPasswrd = user.password;
   
   const passwordsAreEqual = await verifyPassword(oldPassword,currentPasswrd);
  
   if(!passwordsAreEqual){
       res.status(403).json({message:"Invalid Password"})
       client.close();
       return
   }
   const hashedPassword = await hashPassword(newPassword)
  const result =await userCollection.updateOne({email:userEmail},{$set:{password:hashedPassword}})

  client.close();
  res.status(200).json({message:"Password Created!"})


    
}

export default handler