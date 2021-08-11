import { hashPassword } from "../../../lib/auth";
import { connectToDatabase } from "../../../lib/db";

async function handler (req,res){
    if(req.method !=="POST"){
        return;
    }
    const data = req.body;
    const {email,password} = data;
    if(!email || !email.includes('@')||!password|| password.trim().length<7){
        res.status(422).json({message:"Invalid input"});
        return;
    }
   const client= await connectToDatabase();
   const db = client.db();
   const existingUser =await db.collection('users').findOne({
       email:email
   })
   if(existingUser){
   
       res.status(422).json({message:"User already Exsist!"})
       client.close();
    return;

   }
   const hashedPassword =await hashPassword(password);
  const result =await db.collection('users').insertOne({
       email:email,
       password:hashedPassword
   });
   client.close();
   res.status(201).json({message:"Created user!"});
  
}

export default handler;