import { useDispatch } from 'react-redux';
import { authAction } from '../../store/CentralReduxReducer/auth-slice';
// import { useDispatch } from 'react-redux';


const url = 'https://moviereactapp-3a393-default-rtdb.asia-southeast1.firebasedatabase.app/expense_data'

   export   const getApi = async() => {
   
        try{
            let getUrl = `${url}.json`
            const response = await fetch(getUrl);
            if(!response.ok){
                const data = await response.json();
                throw new Error(data.error.message);
            }
            const data = await response.json();
            return data;
        }
        catch(error){
            console.log("GET_API_ERROR");
        } 
    }

    export const postApi = async(my_data) => {
        try{
            let postUrl = `${url}.json`
            const response = await fetch(postUrl, {
                method:"POST",
                body:JSON.stringify({
                    data:my_data
                }),
                headers:{
                    'Content-type':"application/json"
                }
            })
            if(!response.ok){
                const data = await response.json();
                throw new Error(data.error.message);
            }
            console.log("post api successfulllllll")
            const data = await response.json();
            console.log(data);
            
        }
        catch(error){
            console.log("POST_API_ERROR", error)
        }
    }

    export const deleteApi = async(delete_id) => {
        console.log(delete_id);
        let deleteUrl = `${url}/${delete_id}.json`
        console.log(deleteUrl);
        try{
            const response = await fetch(deleteUrl,{
                method:"DELETE",
                headers:{
                    'Content-type' : "application/json"
                }
            })
    
            if(!response.ok){
                const data = await response.json();
                throw new Error(data.error.message);
            }
            console.log("Deleted successfully");
        }
        catch(error){
            console.log("API_DELETE_ERROR",error)
        }
    }

    export const putApi = async(my_data) => {
        console.log(my_data)
        try{
            let putUrl = `${url}/${my_data.id}.json`
            console.log("We are at put api");
            const response = await fetch(putUrl, {
                method:"PUT",
                body:JSON.stringify({
                    data:{
                        amount:my_data.amount,
                        desc: my_data.desc,
                        cate:my_data.cate,
                    }
                   
                }),
                headers:{
                    'Content-type': "application/json"
                }
            })
            if(!response.ok){
                const data = await response.json();
                throw new Error(data.error.message);
            }
            console.log("Update succesfully at server");
            const data = await response.json();
            console.log(data);
        }
        catch(error){
            console.log("PUT_API_ERROR", error);
    
        }
    }




