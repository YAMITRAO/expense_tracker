import React from 'react'
import SignUp from './Pages/SignUp'
import Welcome from './Pages/Welcome/Welcome'
import { Route , Routes, BrowserRouter} from 'react-router-dom'
import Profile from './Pages/Profile/Profile'


const Project = () => {
  return (
    
  <BrowserRouter>
   <Routes>
    
    <Route index exact path="/" element={<SignUp/>} />
    <Route path="/welcome" element={<Welcome/>} />
    <Route path='/profile' element={<Profile/>} />
   </Routes>
    </BrowserRouter>
  )
}

export default Project