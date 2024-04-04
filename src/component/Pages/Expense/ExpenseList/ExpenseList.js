import React, { useContext, useRef, useState } from 'react'
import style from "./ExpenseList.module.css"
import { createPortal } from 'react-dom'

import DataContext from '../../../../store/DataContext'
import EditExpense from '../../EditExpense/EditExpense'
import ExpenseMap from './ExpenseMap'
import { useDispatch, useSelector } from 'react-redux'
import { primeAction } from '../../../../store/CentralReduxReducer/prime-slice'


const ExpenseList = () => {
    const ctx = useContext(DataContext);
    // const listData = ctx.expenseList;
    const listData = useSelector(state => state.expenseData.expenseList);
    const isPrime = useSelector(state => state.primeData.isPrime);
    const dispatch = useDispatch();
  


    const amountRef = useRef();
    const descRef = useRef();
    const cateRef = useRef();
    
    const [editData, setEditData] = useState({})    

    const [isEdit, setIsEdit] = useState(false);
    
      let totalExpense = 0

      const onEditForm = (e) => {
        setIsEdit(false);
      }

      const dataFromEditButton = (data) => {
        setEditData( data );
      }

      const activePrimeHandler = () => {
        dispatch(primeAction.activePrime());
      }

  return (
    <>
     <div className={style.container}>

{listData.length >0  && <div className={style.itemContainer}>
         <table>
            <thead>
                <tr>
                    <th>Amount</th>
                    <th>Desc</th>
                    <th>Category</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                 {listData && listData.map( (val) => {
                    totalExpense += +val.amount;
                    console.log(val);
                    return  <ExpenseMap data={val} onEdit={ ()=>setIsEdit(true)} backData={dataFromEditButton}/>
                })}
            </tbody>
            <tfoot>
                <tr>
                    <td colSpan={2}> Total Spand</td>
                    <td colSpan={2}> {totalExpense}</td>
                    {(totalExpense>=10000) && <td><button onClick={ activePrimeHandler } className={!isPrime ? style.prime : style.normal}>{!isPrime ? "Activate Premium" :"Disable Premium"}</button></td>}
                    {(totalExpense < 10000) && <td><button className={style.inactive} disabled>Activate Premium</button></td>}
                </tr>
            </tfoot>
         </table>
       </div>}
       {isPrime && <div className={style.downloadButton}> 
        <button onClick={()=> console.log("Download clicked")}>Download</button></div>}
    </div>
    
    {isEdit && createPortal(<EditExpense  editClick={onEditForm} 
    data = {editData}
    />, document.getElementById('layout'))}
    </>
  )
}

export default ExpenseList