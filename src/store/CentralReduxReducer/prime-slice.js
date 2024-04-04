
import { createSlice } from "@reduxjs/toolkit";

const initialPrimeState = {
    isPrime: false,

}

const primeSlice = createSlice({
    name:"Prime",
    initialState:initialPrimeState,
    reducers:{
        activePrime(state){
           state.isPrime=!state.isPrime;
        }, 

    
    }
})

export const primeAction = primeSlice.actions;
export default primeSlice.reducer;