import { useState } from "react";
import { useDispatch } from "react-redux";
import todoSlice from "../features/todoSlice";

function AddTodo (){

    const [text , setText]=useState('')
    const dispatch = useDispatch();
    const {add}=todoSlice.actions;

    const handelText=(e)=>{
        e.preventDefault();
        if(text.trim()){
            dispatch(add(text))
            setText('')
        }
    }
    return(
        <form onSubmit={handelText}>
            <input
             type="text"
             value={text}
             onChange={(e)=>setText(e.target.value)}
              />
              <button type="submit">add todo</button>
        </form>
    )
}
export default AddTodo;