import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import todoSlice from "../features/todoSlice";

import './AddTodo.css'


function AddTodo (){

    const [text , setText]=useState('');
    const [isFocus,setIsFocus]=useState(false)
    const [todos,setTodos]=useState([]);
    const [editingId,setEditingId]=useState(null);
    const [editingText,setEditingText]=useState('');
    const dispatch = useDispatch();
    const {add,editTodo}=todoSlice.actions;
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

    const handelEdit = (e)=>{
        e.preventDefault();
        if(editingText.trim()){
            dispatch(editTodo({id:editingId,newText:editingText}))
            setEditingId(null);
            setEditingText('')
        }
    }

    

    return(
        <form className="formTodo" onSubmit={editingId===null?handelText:handelEdit}>
            <input
            ref={inputRef}
             type="text"
             value={editingId===null? text : editingText}
             onChange={(e)=>
                editingId === null ?
                setText(e.target.value)
                : setEditingText(e.target.value)
            }
            placeholder={editingId === null ? "یک کار اضافه کن...":"ویرایش"}
             onFocus={()=> setIsFocus(true)}
             onBlur={()=> setIsFocus(false)}
              />
             {(todos.length > 0 || isFocus) && 
                (<div>
                <button 
                onMouseDown={handelMoseDown}
                className="addBtn"
                 type="submit">اضافه کن</button>
                <button
                 onMouseDown={handelMoseDown}
                 onClick={handelCancel}
                 className="cancelBtn">بی خیال</button>
                </div>)
             }
        </form>
    )
}
export default AddTodo;