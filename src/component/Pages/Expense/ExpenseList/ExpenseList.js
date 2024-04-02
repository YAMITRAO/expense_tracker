import React, { useContext, useState } from 'react'
import style from "./ExpenseList.module.css"
import ExpenseForm from '../ExpenseForm/ExpenseForm'
import DataContext from '../../../../store/DataContext'

const ExpenseList = () => {
    const ctx = useContext(DataContext);
    const listData = ctx.expenseList;
    
      let totalExpense = 0
  return (
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
                    return   <tr key={val.id}>
                    <td>{val.amount}</td>
                    <td>{val.desc} </td>
                    <td>{val.cate}</td>
                    <td>
                        <button type="button" value={val.id} className={style.edit}>Edit</button>
                    </td>
                    <td> <button type="button" value={val.id} className={style.delete}>Delete</button></td>
                   </tr>
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
  )
}

export default ExpenseList