import React, { useState } from 'react'
import style from "./Welcome.module.css";
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Expense from '../Expense/Expense';
import { useSelector } from 'react-redux';


const Welcome = () => {
     const isPrime = useSelector(state => state.primeData.isPrime);
     const [isDark , setIsDark] = useState(false);

     if( isPrime){
      if(isDark){
        document.body.style.backgroundColor = "rgba(213, 159, 117,0.8)"
        // document.getElementById("layout").style.backgroundColor = "rgba(213, 159, 117,0.8)"
      }
      else{
        document.body.style.backgroundColor = "rgba(233, 232, 223,0.8)"
      }
        
     }
     else{
      document.body.style.backgroundColor = "white"
     }
  
  return (
    <>
    <div className={style.container}>
        <div className={style.welcomeTitle}>Welcome to Expense Tracker !!!</div>
       {isPrime && <div className={style.profileColor}>
          {!isDark && <button className={style.dark} onClick={ () => setIsDark(!isDark)}>Theme</button>}
          {isDark && <button className={style.light} onClick={ () => setIsDark(!isDark)}>Theme</button>}
        </div>}
        <div className={style.profileTab}>Your Profile is incomplete.
        <button> <Link to="/profile">Complete Now</Link>
        </button>
        </div>
    </div>
    <hr/>
    <Expense/>
    </>
  )
}

export default Welcome