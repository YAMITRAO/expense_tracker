import React, { useContext } from 'react'
import style from "./Logout.module.css"
import { useDispatch } from 'react-redux';
import { authAction } from '../../../store/CentralReduxReducer/auth-slice';
const Logout = () => {

    const dispatch = useDispatch();

  return (
    <div className={style.container}>
        <div className={style.logoutContainer}>
           <button onClick={ ()=> dispatch( authAction.logouthandler())}> Logout</button>
        </div>
    </div>
  )
}

export default Logout