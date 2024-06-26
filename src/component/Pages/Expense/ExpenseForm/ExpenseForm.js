import React, { useContext, useState } from 'react'
import style from "./ExpenseForm.module.css"
import { useDispatch } from 'react-redux';
import { expenseAction } from '../../../../store/CentralReduxReducer/expense-slice';
import { getApi, postApi } from '../../../../store/Api/Api';

const ExpenseForm = () => {
    

    const dispatch = useDispatch();

    const [amountValue, setAmountValue] = useState("");
    const [descValue, setDescValue] = useState("");
    const [cateValue, setCateValue] = useState("");

    const formSubmitHandler = async(e) => {
        e.preventDefault();
        console.log(amountValue,descValue, cateValue);
        if(cateValue === 'Select' || cateValue === ""){
            alert("Please Select Category");
            return;
        }
        else if(+amountValue < 1 ){
            alert("Amount must be more then 0");
            return
        }
        let data = {
            type:"ADD_TO_EXPENSE",
            data:{
                amount:amountValue,
                desc:descValue,
                cate:cateValue,
            }
        }
        await postApi(data.data);
       const s_data=  await getApi();
       dispatch( expenseAction.expenseListHandler(s_data));

        setAmountValue("");
        setDescValue("");
        setCateValue("Select");
        
    }
 
  return (
    <div className={style.containerForm}>
        <h1>Add Expense</h1>
        <form onSubmit={ formSubmitHandler}>
            <div className={style.inputContainer}>
                
                <label>Amount </label>
                <input type="number" placeholder='Enter Amount Spend' value={amountValue} onChange={(e)=>setAmountValue(e.target.value)} required/>
                <label>Description</label>
                <input type="text" placeholder='Enter Desc or purpose' value={descValue} onChange={(e)=>setDescValue(e.target.value)} required/>
            
                <label>Category</label>
                <select onChange={(e)=>setCateValue(e.target.value)} value={cateValue}>
                    <option>Select</option>
                    <option>Food</option>
                    <option>Petrol</option>
                    <option>Beauty</option>
                    <option>Other</option>
                </select>
                <div>
                <button type='submit'>Add</button>
                <button type="button">Cancle</button>

                </div>
                
                
            </div>
        </form>
    
    </div>

  )
}

export default ExpenseForm