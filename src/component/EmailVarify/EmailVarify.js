import React, { useContext } from 'react'
import style from "./EmailVarify.module.css"
import DataContext from '../../store/DataContext'


const EmailVarify = () => {
    const ctx = useContext(DataContext);
    
  return (
    <div className={style.container}>

            <div className={style.emailContainer}>
                <label>Verify Email</label>
                <input type="email" required placeholder='Enter email id'/>
                <button onClick={ ()=> ctx.verifyEmail()
                 }>Submit</button>
            </div>
    </div>
  )
}

export default EmailVarify