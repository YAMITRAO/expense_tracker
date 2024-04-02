import React, { useContext } from 'react'
import DataContext from '../../../../store/DataContext';
import style from "./ExpenseMap.module.css"

const ExpenseMap = (props) => {
    const ctx = useContext(DataContext);

    const edithandler = (e) => {
        props.backData(props.data);
        props.onEdit()
    } 
    
  return (
    <tr  >
                    <td >{props.data.amount} </td>
                    <td >{props.data.desc} </td>
                    <td >{props.data.cate} </td>
                    <td>
                        <button type="button" value={props.data.id}   className={style.edit} onClick={
                            edithandler
                            
                            }>Edit</button>
                    </td>
                    <td> <button type="button" value={props.data.id}   className={style.delete}  onClick={(e)=> ctx.deleteHandler(e.target.value)}>Delete</button></td>
                   </tr>
  )
}

export default ExpenseMap