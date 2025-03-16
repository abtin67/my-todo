import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import todoSlice from "../features/todoSlice";

import './AddTodo.css'


function AddTodo (){

    const [text , setText]=useState('');
    const [isFocus,setIsFocus]=useState(false)
    const [todos,setTodos]=useState([])
    const dispatch = useDispatch();
    const {add}=todoSlice.actions;
    const inputRef = useRef(null)

    const handelText=(e)=>{
        e.preventDefault();
        if(text.trim()){
            setTodos([...todos,text])
            dispatch(add(text))
            setText('')
        }
        if(inputRef.current){
            inputRef.current.focus()
        }
    }

    const handelCancel = ()=>{
        if(inputRef.current){
            inputRef.current.blur()
            setText('')
        }
    }

    const handelMoseDown =(e)=>{
        e.preventDefault()
    }

    return(
        <form className="formTodo" onSubmit={handelText}>
            <input
            ref={inputRef}
             type="text"
             value={text}
             onChange={(e)=>setText(e.target.value)}
             onFocus={()=> setIsFocus(true)}
             onBlur={()=> setIsFocus(false)}
              />
             {(todos.length > 0 || isFocus) && 
                (<div>
                <button 
                onMouseDown={handelMoseDown}
                className="addBtn"
                 type="submit">add todo</button>
                <button
                 onMouseDown={handelMoseDown}
                 onClick={handelCancel}
                 className="cancelBtn">cansel</button>
                </div>)
             }
        </form>
    )
}
export default AddTodo;