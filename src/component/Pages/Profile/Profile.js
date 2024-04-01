import React from 'react'
import style from "./Profile.module.css";

const Profile = () => {
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

export default Profile