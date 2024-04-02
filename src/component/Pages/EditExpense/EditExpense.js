 import React, { useContext, useState } from 'react'
 import style from "./EditExpense.module.css"
 import MonetizationOnIcon from '@mui/icons-material//MonetizationOn';
 import DescriptionIcon from '@mui/icons-material/Description';
 import CategoryIcon from '@mui/icons-material/Category';
import DataContext from '../../../store/DataContext';

 
 const EditExpense = (props) => {
    // console.log(props.data.amount);
    const ctx = useContext(DataContext);
    
    const [amountValue, setAmountValue] = useState(props.data.amount);
    const [descValue, setDescValue] = useState(props.data.desc);
    const [cateValue, setCateValue] = useState(props.data.cate);

    const updateHandler = (e) =>{
        let data = {
            id: props.data.id,
            amount: amountValue,
            desc:descValue,
            cate: cateValue,
        }
        ctx.updateHandler(data);
        props.editClick();

    }
   return (
     <div className={style.container}>
        
        <div className={style.formContainer}>
        <h1>Edit Entry</h1>
            <div className={style.amountContainer}>
                <MonetizationOnIcon />
                <input type="number" placeholder='enter amount' value={+amountValue} onChange={(e) => setAmountValue(e.target.value)}/>
            </div>

           < div className={style.descContainer}>
                <DescriptionIcon />
                <input type="text" placeholder='enter desc' value={descValue} onChange={(e)=> setDescValue(e.target.value)}/>
            </div>

            < div className={style.cateContainer}>
                <CategoryIcon />
                <select value={cateValue} onChange={(e)=> setCateValue(e.target.value)}>
                    <option>Select</option>
                    <option>Food</option>
                    <option>Petrol</option>
                    <option>Beauty</option>
                    <option>Other</option>
                </select>
            </div>

            <div className={style.buttonContainer}>
                <button className={style.updateButton} type="button"  onClick={ updateHandler}>Update</button>
                <button className={style.cancleButton} type="button" onClick={props.editClick}>Cancle</button>
            </div>
            
        </div>
     </div>
   )
 }
 
 export default EditExpense