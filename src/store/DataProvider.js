import React, { useReducer } from 'react'
import DataContext from './DataContext'
import { useHistory } from 'react-router-dom/cjs/react-router-dom';

const url = 'https://moviereactapp-3a393-default-rtdb.asia-southeast1.firebasedatabase.app/expense_data'


const reducer = (state, action) => {
    if(action.type === "LOGIN_SUCCESS" || action.type === "UPDATE_SUCCESS"){
        state.isSuccessfullyLogin = true;
        state.userData = {
            ...state.userData,
                ...action.data,
            }
        return{
            ...state,    
        }
    }
    if(action.type === "LOGOUT"){
        state.isSuccessfullyLogin = false;
        state.userData = {}
        return { 
            ...state,
         }

    }

    if(action.type === "LOAD_DATA"){
        state.expenseList = [];
        for( let key in action.data ){
            console.log("the key is ");
            console.log(key);
            let loaded_data = {
                id:key,
                amount: action.data[key].data.amount,
                desc: action.data[key].data.desc,
                cate: action.data[key].data.cate,

            }
            console.log("formed data is");
            console.log(loaded_data);
            state.expenseList.push({
                ...loaded_data
            })
            console.log(state.expenseList);
        }
        return{
            ...state
        }
    }
    return state
}


const DataProvider = (props) => {

const getApi = async() => {
    try{
        let getUrl = `${url}.json`
        const response = await fetch(getUrl);
        if(!response.ok){
            const data = await response.json();
            throw new Error(data.error.message);
        }
        const data = await response.json();
        console.log(data)
         dispatchFun({
            type:"LOAD_DATA",
            data:data,
        });
    }
    catch(error){
        console.log("GET_API_ERROR");
    }
    
}

const deleteApi = async(delete_id) => {
    let deleteUrl = `${url}/${delete_id}.json`
    console.log(deleteUrl);
    try{
        const response = await fetch(deleteUrl,{
            method:"DELETE",
            headers:{
                'Content-type' : "application/json"
            }
        })

        if(!response.ok){
            const data = await response.json();
            throw new Error(data.error.message);
        }
        const data = await response.json();
        console.log("Deleted successfully", data);
    }
    catch(error){
        console.log("API_DELETE_ERROR",error)
    }
}

const postApi = async(my_data) => {
    try{
        let postUrl = `${url}.json`
        const response = await fetch(postUrl, {
            method:"POST",
            body:JSON.stringify({
                data:my_data
            }),
            headers:{
                'Content-type':"application/json"
            }
        })

        if(!response.ok){
            const data = await response.json();
            throw new Error(data.error.message);
        }
        // const data = await response.json();
        // console.log(data);
    }
    catch(error){
        console.log("POST_API_ERROR", error)
    }
}

const putApi = async(my_data) => {
    try{
        let putUrl = `${url}/${my_data.id}.json`
        console.log("We are at put api");
        const response = await fetch(putUrl, {
            method:"PUT",
            body:JSON.stringify({
                ...my_data.data
            }),
            headers:{
                'Content-type': "application/json"
            }
        })
        if(!response.ok){
            const data = await response.json();
            throw new Error(data.error.message);
        }
        console.log("Update succesfully at server");
    }
    catch(error){
        console.log("PUT_API_ERROR", error);

    }
}

    const hist = useHistory();

    const [state, dispatchFun] = useReducer(reducer, {
        isSuccessfullyLogin: false,
        userData:{},
        expenseList:[
            
        ],
    })

    const loginHandler = (fun_data) => {
        dispatchFun( {
            type: fun_data.type,
            data: fun_data.data,
        })
        getApi();
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
            hist.push("/welcome");

        }
        catch(error){
            hist.push("/welcome");
            console.log("Verification_SEND", error);
        }

    }

    const handelLogout = () => {
        
        dispatchFun({
            type:"LOGOUT"
        })
    }

    const handleExpense =  async (fun_data) => {
        console.log("Exense added");
        console.log(fun_data.data);
       await postApi(fun_data.data);
       await getApi();
        // dispatchFun( fun_data);
    }

    const handleDelete = async(delete_id) => {
        console.log("Delete the data of id", delete_id);
        await deleteApi(delete_id);
        await getApi();
    }

    const handleUpdate = async(data) => {
        console.log("Update request is here");
        console.log(data);
        await putApi({
            id:data.id,
            data: {data:{
                amount:data.amount,
                desc:data.desc,
                cate:data.cate,
            }
            }
            
        })
        await getApi();
       
    }

   

    let data = {
        isSuccessfullyLogin: state.isSuccessfullyLogin,
        userData: state.userData,
        handleLogin : loginHandler,
        updateProfileHandler : profileHandler ,
        verifyEmail: varificarionhandler,
        logoutHandler: handelLogout,
        expenseList: state.expenseList,
        expensehandler:handleExpense,
        deleteHandler: handleDelete,
        updateHandler : handleUpdate,
    }
  return (
    <DataContext.Provider value={data}>{props.children}</DataContext.Provider>
  )
}

export default DataProvider