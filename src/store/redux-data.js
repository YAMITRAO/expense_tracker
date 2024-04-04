import { configureStore } from "@reduxjs/toolkit";
import  authSlice  from "../store/CentralReduxReducer/auth-slice";
import expenseSlice from "./CentralReduxReducer/expense-slice";
import primeSlice from "./CentralReduxReducer/prime-slice";


const CentralStore = configureStore({
    reducer:{ 
        authData: authSlice,
        expenseData: expenseSlice,
        primeData : primeSlice,
    }
})


export default CentralStore;