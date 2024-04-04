import React, { useContext, useState } from 'react'
import style from "./SignUp.module.css"
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import DataContext from '../../store/DataContext';
import ForgotPass from './ForgotPass/ForgotPass';
import {  useDispatch } from 'react-redux';
import { authAction } from '../../store/CentralReduxReducer/auth-slice';
import { getApi } from '../../store/Api/Api';
import { expenseAction } from '../../store/CentralReduxReducer/expense-slice';


const signUpurl = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDwcYCFrLAPoOvfWZN6fmD6d8Luyojx3Fw';
const loginurl = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDwcYCFrLAPoOvfWZN6fmD6d8Luyojx3Fw';
const SignUp = () => {

  const dispatch = useDispatch();
  const hist = useHistory();


  const [errorMsg, setErrorMsg] = useState();
  const [successMsg, setSuccessMsg] = useState();

  const [emailValue, setEmailValue] = useState();
  const [passwordValue, setPaswordValue] = useState();
  const [confirmPasswordValue, setConfirmPasswordValue] = useState();

  const [isSignUp, setIsSignUp] = useState(true);
  const [isForgot, setIsForgot] = useState(false);
  

  const signUpApi = async(email, pass) =>{
    try{
      const response = await fetch(signUpurl, {
        method:"POST",
        body:JSON.stringify({
          email:email,
          password:pass,
          returnSecureToken:true,
        }),
        headers:{
          'Content-Type': 'application/json'
        }
      })
      console.log("response data is");
      console.log(response);
      if(!response.ok){
        const data = await response.json();
        console.log(data);
        throw new Error(data.error.message);
      }
      const data = await response.json();
      data && setSuccessMsg("SuccessFully SignUp")
      data &&  setTimeout( () => {
        setSuccessMsg();
        setIsSignUp(true);
      }, 1500)
      setEmailValue( "");
      setPaswordValue("");
      setConfirmPasswordValue("");
      console.log(data);
    }
    catch(error){
      console.log("AUTH_ERROR", error);
      setErrorMsg(`AUTH_ERROR ${error}`);
      setTimeout(()=> {setErrorMsg()}, 1500)

    }
  }

  const loginApi = async(email,pass) => {
    try{
    const response = await fetch(loginurl,{
      method:"POST",
      body:JSON.stringify({
        email:email,
        password:pass,
        returnSecureToken:true,
      })
    })

    if(!response.ok){
      const data = await response.json();
        console.log(data);
        throw new Error(data.error.message);
    }
    let s_data = await getApi(); 
    const data = await response.json();
      data && setSuccessMsg("Login Successfully")
      data &&  setTimeout( () => {
        
         if(s_data){
          console.log(s_data);
          dispatch( expenseAction.expenseListHandler(s_data));
         }
        dispatch( authAction.loginhandler(data));
        // dispatch( expenseAction.expenseListHandler(s_data));
        setSuccessMsg();
        hist.push("/welcome")
        setIsSignUp(true);
      }, 1500)
    setEmailValue("");
    setPaswordValue("");
    setTimeout( () => {  setSuccessMsg()},1500)
    
  }
  catch(error){
    console.log("AUTH_ERROR", error);
    setErrorMsg(`AUTH_ERROR ${error}`);
    setTimeout(()=> {setErrorMsg()}, 1500)
  }
   
  }


  const formSignUpSubmitHandler = (e) => {
    e.preventDefault();
    const enteredEmail = emailValue
    const enteredPassword = passwordValue
    const enteredConfirmPassword = confirmPasswordValue

    if(enteredPassword !== enteredConfirmPassword){
      setErrorMsg("Password mismatch");
      setPaswordValue("");
      setConfirmPasswordValue("");
      setTimeout(()=> {setErrorMsg()},1500)
      return
    }
    else if(enteredPassword.length < 6 ){
      setErrorMsg("Password must be 6 characters long");
      setTimeout(()=> {setErrorMsg()},1500)
      return
    }
    console.log(enteredEmail, enteredPassword, enteredConfirmPassword);
    signUpApi(enteredEmail, enteredPassword);
    
  }

  const formLoginSubmitHandler = (e) => {
    e.preventDefault();

    const enteredEmail = emailValue
    const enteredPassword = passwordValue
    if(enteredPassword.lenght < 6){
      setErrorMsg("Password must be 6 characters long");
      setTimeout(() => {
        setErrorMsg();
      }, 1500);
      return
    }
    loginApi(enteredEmail, enteredPassword);
  }

  if(isForgot){
    
    return <>
    <div className={style.forgotCancle}>
      <button type="button" onClick={()=> setIsForgot(false)}>X</button>
    </div>
    <ForgotPass />
    
    </>
  }

  return (
   <div className={style.container}>
         <div className={style.formContainer}>
          {!isSignUp && <h1>SignUp</h1>}
          {isSignUp && <h1>Login</h1>}
         <form onSubmit={!isSignUp ?formSignUpSubmitHandler : formLoginSubmitHandler}> 
            <div className={style.inputContainer}>

              <div className={style.emailContainer}>
                <label >Email<sup>*</sup></label>
                <input type="email"  placeholder='Enter email'  onChange={(e) => setEmailValue(e.target.value)} value={emailValue} required/>
              </div>

              <div className={style.passwordContainer}>
                <label >Password<sup>*</sup></label>
                <input type="password"  placeholder='Enter password '  onChange={(e) => setPaswordValue(e.target.value)} value={passwordValue} required/>
              </div>

              {!isSignUp && <div className={style.confirmPasswordContainer}>
                <label htmlFor='password'>Confirm Password<sup>*</sup></label>
                <input type="password"  placeholder='Re-enter password ' required onChange={ (e)=> setConfirmPasswordValue(e.target.value)} value={confirmPasswordValue}/>
              </div>}

              <div className={style.submitButton}>
                {!isSignUp && <button>SignUp</button>}
                {isSignUp && <button >LogIn</button>}
              </div>
             { isSignUp && <div className={style.forgot}>
                <button type="button" className={style.forgotPass} onClick={() => setIsForgot(true)}>Forgot Password</button></div>}
            </div>
          </form>
          <div className={`${errorMsg ? style.errors :style.error} ${successMsg ? style.success : style.error}` }>
          {errorMsg} {successMsg}
          </div>
         </div>

         {!isSignUp && <div className={style.haveLogin}>Have an Account? <button onClick={()=> setIsSignUp(true)}>Login</button></div>}
         {isSignUp && <div className={style.haveSignUp}>Do't Have an Account? <button onClick={()=> setIsSignUp(false)}>SignUp</button></div>}
   </div>
  )
}

export default SignUp