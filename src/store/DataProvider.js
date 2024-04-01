import React, { useReducer } from 'react'
import DataContext from './DataContext'

const reducer = (state, action) => {
    if(action.type === "LOGIN_SUCCESS" || action.type === "UPDATE_SUCCESS"){
        console.log("Updating the data");
        state.isSuccessfullyLogin = true;
        state.userData = {
            ...state.userData,
                ...action.data,
            }
        return{
            ...state,    
        }
    }
    return state
}


const DataProvider = (props) => {
    const [state, dispatchFun] = useReducer(reducer, {
        isSuccessfullyLogin: false,
        userData:{},
    })

    const loginHandler = (fun_data) => {
        console.log('login data by google auth api is' );
        console.log(fun_data.data);
        console.log(fun_data.type);
        dispatchFun( {
            type: fun_data.type,
            data: fun_data.data,
        })
    }

    const profileHandler = async( fun_data) => {
        try{
            const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDwcYCFrLAPoOvfWZN6fmD6d8Luyojx3Fw', {
                method:"POST",
                body:JSON.stringify({
                    idToken : state.userData.idToken,
                    displayName: fun_data.fullName,
                    photoUrl: fun_data.photoUrl,
                    deleteAttribute: null,
                    returnSecureToken: false,
    
                }), 
                headers:{
                    'Content-type' : 'application/json'
                }
            })
    
            if(!response.ok){
                const data = await response.json();
                throw new Error(data.error.message);
            }
                console.log("Profile update successfully");
                const data = await response.json();
                console.log(data);
                dispatchFun({
                    type:"UPDATE_SUCCESS",
                    data:data,
                })
        }
        catch(error){
            console.log("UPDATE_ERROR", error);
        }
    }

    const varificarionhandler = async(data) => {
        console.log("Verification clicked");

        try{
            const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDwcYCFrLAPoOvfWZN6fmD6d8Luyojx3Fw', {
                method:"POST",
                body: JSON.stringify({
                    requestType: "VERIFY_EMAIL",
                    idToken: state.userData.idToken,
                }),
                headers:{
                    'Content-type':"application/json"
                }
            })

            if(!response.ok){
                const data = await response.json();
                throw new Error(data.error.message);
            }
            const data = await response.json();
            console.log(data);

        }
        catch(error){
            console.log("Verification_SEND", error);
        }

    }

    let data = {
        isSuccessfullyLogin: state.isSuccessfullyLogin,
        userData: state.userData,
        handleLogin : loginHandler,
        updateProfileHandler : profileHandler ,
        verifyEmail: varificarionhandler,
    }
  return (
    <DataContext.Provider value={data}>{props.children}</DataContext.Provider>
  )
}

export default DataProvider