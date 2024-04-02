import React from 'react'
import style from "./Welcome.module.css";
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Expense from '../Expense/Expense';


const Welcome = () => {
  
  return (
    <>
    <div className={style.container}>
        <div className={style.welcomeTitle}>Welcome to Expense Tracker !!!</div>
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