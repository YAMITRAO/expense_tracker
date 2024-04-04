import { createSlice } from "@reduxjs/toolkit";

const initialExpenseState = {
    expenseList: []
}
const expenseSlice = createSlice({
    name:"expense",
    initialState:initialExpenseState,
    reducers:{
        expenseListHandler(state, action){
            state.expenseList = [];
            for( let key in action.payload ){
                let loaded_data = {
                    id:key,
                    amount: action.payload[key].data.amount,
                    desc: action.payload[key].data.desc,
                    cate: action.payload[key].data.cate,
                }
                state.expenseList.push({
                    ...loaded_data
                })
        }
    }
}
})

export const expenseAction = expenseSlice.actions;

export default expenseSlice.reducer;
