import { configureStore } from "@reduxjs/toolkit";
import  authSlice  from "../store/CentralReduxReducer/auth-slice";
import expenseSlice from "./CentralReduxReducer/expense-slice";


const CentralStore = configureStore({
    reducer:{ 
        authData: authSlice,
        expenseData: expenseSlice,
    }
})


export default CentralStore;