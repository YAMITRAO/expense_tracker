import React, { useContext } from 'react'
import SignUp from './Pages/SignUp'
import Welcome from './Pages/Welcome/Welcome'
import Profile from './Pages/Profile/Profile'
import { Switch, Route  } from 'react-router-dom/cjs/react-router-dom.min'
import DataContext from '../store/DataContext'
import EmailVarify from './EmailVarify/EmailVarify'



const Project = () => {
  const ctx = useContext(DataContext);
  let isLogin = !ctx.isSuccessfullyLogin;
  return (
    
   <Switch>
     <Route exact  path="/">  <SignUp/> </Route>
     {/* <Route path="/welcome"> { isLogin ? <SignUp/>  : <Welcome />} </Route> */}
     <Route path="/welcome"> { isLogin ? <SignUp/>  : <EmailVarify/>} </Route>
     <Route path='/profile'> { isLogin ? <SignUp/>  :<Profile/> }</Route>
     <Route path="/verification">{isLogin ? <SignUp/>  : <EmailVarify/>}</Route>
    </Switch>
  
  )
}

export default Project