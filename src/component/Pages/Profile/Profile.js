import React from 'react'
import style from "./Profile.module.css";

const Profile = () => {
  return (
    <>
    <div className={style.container}>
        <div className={style.welcomeTitle}>Winners Never Quit and Quitters Never Win</div>
        <div className={style.profileTab}>Your Profile is 64% completed. A Complete profile has higher changes of landing a job.
        <button>
            Complete Now
        </button>
        </div>
    </div>
    <hr/></>
  )
}

export default Profile