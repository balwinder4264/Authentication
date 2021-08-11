import { useState,useRef } from 'react';

import {signIn} from "next-auth/client"
import classes from './auth-form.module.css';
import {useRouter} from "next/router"
async function createUser(email,password){
  const response =await fetch('api/auth/signup',{
    method:'POST',
    body:JSON.stringify({email,password}),
    headers:{
      "Content-Type":'application/json'
    }
  });
  const data = await response.json();
 
  if(!response.ok){
    throw new Error(data.message||"Somethinf wrong");
  }else{
   return data;
  }
}

function AuthForm() {
  const router = useRouter();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const [isLogin, setIsLogin] = useState(true);

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
  }
  async function submithandler (){
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredpassword = passwordInputRef.current.value;

    //optional :ADD validation


    if(isLogin){
      //login user
    const result= await signIn('credentials',{
      redirect:false,
      email:enteredEmail,
      password:enteredpassword
    });
    console.log(result);
    if(!result.error){
      //do something
      router.replace('/profile')
      
    }
    

    }else{
      try{
        const result = await createUser(enteredEmail,enteredpassword);
        console.log(result);
      }catch(error){
        console.log(error)
      }
     
    }
  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submithandler}>
        <div className={classes.control}>
          <label htmlFor='email' >Your Email</label>
          <input type='email' id='email' required ref={emailInputRef}/>
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' required ref={passwordInputRef}/>
        </div>
        <div className={classes.actions}>
          <button>{isLogin ? 'Login' : 'Create Account'}</button>
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
}

export default AuthForm;
