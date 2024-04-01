import React from 'react'
import style from "./Welcome.module.css";

const Welcome = () => {
  return (
    <>
    <div className={style.container}>
        <div className={style.welcomeTitle}>Welcome to Expense Tracker !!!</div>
        <div className={style.profileTab}>Your Profile is incomplete.
        <button>
            Complete Now
        </button>
        </div>
    </div>
    <hr/></>
  )
}

export default Welcome