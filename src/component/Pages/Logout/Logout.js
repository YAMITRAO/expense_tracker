import React, { useContext } from 'react'
import style from "./Logout.module.css"
import DataContext from '../../../store/DataContext'
const Logout = () => {
    const ctx = useContext(DataContext);

  return (
    <div className={style.container}>
        <div className={style.logoutContainer}>
           <button onClick={ ()=> ctx.logoutHandler()}> Logout</button>
        </div>
    </div>
  )
}

export default Logout