import React, { useContext, useState } from 'react'
import style from "./Profile.module.css";
import GitHubIcon from '@mui/icons-material/GitHub';
import LanguageIcon from '@mui/icons-material/Language';
import DataContext from '../../../store/DataContext';




const Profile = () => {

    const [isProfileVIsible, setIsProfileVisible] = useState(false);
    const ctx = useContext(DataContext);

    const [fullNameValue, setFullNameValue] = useState();
    const [photoUrlValue, setPhotoUrlValue] = useState();
 
    const updateClickHandler = () => {
        let enteredFullName = fullNameValue;
        let enteredPhotoUrl = photoUrlValue;
        const data = {
            fullName: enteredFullName,
            photoUrl: enteredPhotoUrl,
        }
        ctx.updateProfileHandler(data);
    }
  return (
    <>
    <div className={style.container}>
        <div className={style.welcomeTitle}>Winners Never Quit and Quitters Never Win</div>
        <div className={style.profileTab}>Your Profile is 64% completed. A Complete profile has higher changes of landing a job.
        <button onClick={ () => setIsProfileVisible(true)}>
            Complete Now
        </button>
        </div>
    </div><hr/>

    {isProfileVIsible && <div className={style.profileContainer}>

        <div className={style.profileHeader}>
            <div className={style.profileTitle}>Contact details</div>
            <div className={style.cancleButton}>
                <button onClick={()=> setIsProfileVisible(false)}>Cancle</button>
            </div>
        </div>

        <div className={style.inputContainer}>
            <div className={style.profileName}>
                <div className={style.logo}><GitHubIcon/>
                <label>Full Name</label>
                </div>
                <input type="text" placeholder='Enter your full name' onChange={(e)=> setFullNameValue(e.target.value)}/>   
            </div>

            <div className={style.profilePhoto}>
                <div className={style.logo}><LanguageIcon/>
                <label>Profile Photo Url</label>
                </div>
                <input type="text" placeholder='Enter Profile Photo Url' onChange={(e)=> setPhotoUrlValue(e.target.value)}/>
            </div>
        </div>

        <div className={style.updateButton}>
            <button onClick={ updateClickHandler }>Update</button>
        </div>
        <hr className={style.hr}/>
    </div>}
    { !isProfileVIsible && <div className={style.dailyQuote}>It takes courage to grow up and become who you really are</div>}
    
    </>
  )
}

export default Profile