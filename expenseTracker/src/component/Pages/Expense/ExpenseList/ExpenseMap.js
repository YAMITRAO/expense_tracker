import React, { useContext } from 'react'
import DataContext from '../../../../store/DataContext';
import style from "./ExpenseMap.module.css"
import { deleteApi, getApi } from '../../../../store/Api/Api';
import { useDispatch } from 'react-redux';
import { expenseAction } from '../../../../store/CentralReduxReducer/expense-slice';

const ExpenseMap = (props) => {
    const ctx = useContext(DataContext);
    const dispatch = useDispatch();

    const edithandler = (e) => {
        props.backData(props.data);
        props.onEdit()
    } 

    const deleteHandler =  async(e) => {
      let id = e.target.value;
        await deleteApi(id);
        let s_data = await getApi(); 
        
          console.log(s_data);
          dispatch( expenseAction.expenseListHandler(s_data));
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
                    <td> <button type="button" value={props.data.id}   className={style.delete}  onClick={ deleteHandler}>Delete</button></td>
                   </tr>
  )
}

export default ExpenseMap