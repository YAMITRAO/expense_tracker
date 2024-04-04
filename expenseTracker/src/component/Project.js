import React, { useContext } from 'react'
import SignUp from './Pages/SignUp'
import Welcome from './Pages/Welcome/Welcome'
import Profile from './Pages/Profile/Profile'
import { Switch, Route  } from 'react-router-dom/cjs/react-router-dom.min'
import DataContext from '../store/DataContext'
import EmailVarify from './EmailVarify/EmailVarify'
import Logout from './Pages/Logout/Logout'
import EditExpense from './Pages/EditExpense/EditExpense'
import { useSelector } from 'react-redux'
import { authAction } from '../store/CentralReduxReducer/auth-slice'



const Project = () => {
  const ctx = useContext(DataContext);
  let isLogin = !useSelector(state=> state.authData.isAuth);
  return (
    <>
   <Switch>
     <Route exact  path="/">  <SignUp/> </Route>
     {/* <Route exact  path="/">  <Welcome/> </Route> */}
     <Route path="/welcome"> { isLogin ? <SignUp/>  : <Welcome />} </Route>
     <Route path='/profile'> { isLogin ? <SignUp/>  :<Profile/> }</Route>
     <Route path="/verification">{isLogin ? <SignUp/>  : <EmailVarify/>}</Route>
     <Route path="*"><div style={{textAlign:"center", fontSize:"30px", marginTop:"30px"}}>Error_Bad_URL Entered</div></Route>
    </Switch>
    {!isLogin && <Logout/>}
    </>
  
  )
}

export default Project