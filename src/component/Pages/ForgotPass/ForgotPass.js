import React, { useState } from 'react'
import style from "./Forgotpass.module.css"
// import DataContext from '../../../store/DataContext'
import { useHistory } from 'react-router-dom/cjs/react-router-dom';

const ForgotPass = () => {

    const [email, setEmail] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    const hist = useHistory();

    const updateHandler = async()=> {
        if(email.length > 1 && email.includes("@")){
            try{
                const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDwcYCFrLAPoOvfWZN6fmD6d8Luyojx3Fw', {
                    method:"POST",
                    body:JSON.stringify({
                        requestType:"PASSWORD_RESET",
                        email:email
                    }),
                    headers:{
                        'Content-type':"application/json"
                    }
                })
                if(!response.ok){
                    const data = await response.json();
                    throw new Error(data.error.message);
                }
                const data = await response.json();
                console.log(data);
                setSuccessMsg("Reset Link send to your mail");
                setTimeout( ( )=> setSuccessMsg(""), 1000);
                hist.push('/');

            }
            catch(error){
                setErrorMsg(error);
                setTimeout( ( ) =>  setErrorMsg(""), 1000)
            }
        setEmail("")
    }
        else{alert("Enter a valid email")}
        }
  return (
    <div className={style.container}>
        <div className={style.inputContainer}>
            <label>Enter Email Address</label>
            <input type="email" placeholder='enter email address' onChange={(e)=>setEmail(e.target.value)}  value={email} required/>
            <button type="button" onClick={ updateHandler } >Send Reset Link</button>
           {(errorMsg || successMsg) && <div className={style.errorContainer}> {errorMsg}
           {successMsg}
           </div>}
        </div>
    </div>
  )
}

export default ForgotPass