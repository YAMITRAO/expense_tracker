import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
    isAuth: false,
    userLoginDetails:{

    }

}

const authSlice = createSlice({
    name:"auth",
    initialState: initialAuthState,
    reducers:{
        loginhandler(state, action){ 
            state.isAuth = true;
            state.userLoginDetails = action.payload
        },
        logouthandler(state){
            state.isAuth = false;
            state.userLoginDetails = [];
        }
    } 
})

export const authAction = authSlice.actions;
export default authSlice.reducer;