import React, { useRef, useState } from 'react'
import style from "./SignUp.module.css"

const url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDwcYCFrLAPoOvfWZN6fmD6d8Luyojx3Fw'


const SignUp = () => {

  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();

  const [errorMsg, setErrorMsg] = useState();
  const [successMsg, setSuccessMsg] = useState();

  const [emailValue, setEmailValue] = useState();
  const [passwordValue, setPaswordValue] = useState();
  const [confirmPasswordValue, setConfirmPasswordValue] = useState();
  

  const signUpApi = async(email, pass) =>{
    try{
      const response = await fetch(url, {
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
      data &&  setTimeout( () => {setSuccessMsg()}, 1500)
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

  const formSubmitHandler = (e ) => {
    e.preventDefault();
    // const enteredEmail = emailInputRef.current.value;
    // const enteredPassword = passwordInputRef.current.value;
    // const enteredConfirmPassword = confirmPasswordInputRef.current.value;

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

  return (
   <div className={style.container}>
         <div className={style.formContainer}>
          <h1>SignUp</h1>
          <form onSubmit={ formSubmitHandler}> 
            <div className={style.inputContainer}>

              <div className={style.emailContainer}>
                <label >Email<sup>*</sup></label>
                <input type="email"  placeholder='Enter email' ref={emailInputRef} onChange={(e) => setEmailValue(e.target.value)} value={emailValue} required/>
              </div>

              <div className={style.passwordContainer}>
                <label >Password<sup>*</sup></label>
                <input type="password"  placeholder='Enter password ' ref={passwordInputRef} onChange={(e) => setPaswordValue(e.target.value)} value={passwordValue} required/>
              </div>

              <div className={style.confirmPasswordContainer}>
                <label htmlFor='password'>Confirm Password<sup>*</sup></label>
                <input type="password"  placeholder='Re-enter password 'ref={confirmPasswordInputRef} required onChange={ (e)=> setConfirmPasswordValue(e.target.value)} value={confirmPasswordValue}/>
              </div>

              <div className={style.submitButton}>
                <button type="submit">SignUp</button>
              </div>
            </div>
          </form>
          <div className={`${errorMsg ? style.errors :style.error} ${successMsg ? style.success : style.error}` }>
          {errorMsg} {successMsg}
          </div>
         </div>
   </div>
  )
}

export default SignUp