import React, { useContext, useRef, useState } from 'react'
import style from "./ExpenseList.module.css"
import { createPortal } from 'react-dom'

import DataContext from '../../../../store/DataContext'
import EditExpense from '../../EditExpense/EditExpense'
import ExpenseMap from './ExpenseMap'
import { useSelector } from 'react-redux'


const ExpenseList = () => {
    const ctx = useContext(DataContext);
    // const listData = ctx.expenseList;
    const listData = useSelector(state => state.expenseData.expenseList);

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
                    <td colSpan={3}> {totalExpense}</td>
                </tr>
            </tfoot>
         </table>
       </div>}
    </div>
    {isEdit && createPortal(<EditExpense  editClick={onEditForm} 
    data = {editData}
    />, document.getElementById('layout'))}
    </>
  )
}

export default ExpenseList