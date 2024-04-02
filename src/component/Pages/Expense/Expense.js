import React from 'react'
import ExpenseForm from './ExpenseForm/ExpenseForm'
import ExpenseList from './ExpenseList/ExpenseList'

const Expense = () => {
  return (
    <>
    <ExpenseForm/>
    <hr style={{width:"90%", marginTop:"20px"}}/>
    <ExpenseList/>

    </>
  )
}

export default Expense