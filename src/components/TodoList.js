import { useDispatch, useSelector } from "react-redux"
import todoSlice from "../features/todoSlice";
import { MdDelete } from "react-icons/md";
import { TbEdit } from "react-icons/tb";
import "./TodoList.css"
import { useState } from "react";

export function TodoList (){
    const todos = useSelector(state=>state.todos)
    const dispatch = useDispatch();
    const [editingId,setEditingId]=useState(null);
    const [editingText,setEditingText]=useState('');
    const {toggleTodo,deleteTodo,editTodo}=todoSlice.actions

    const handelEdit = (e)=>{
        e.preventDefault();
        if(editingText.trim()){
            dispatch(editTodo({id:editingId,newText:editingText}))
            setEditingId(null);
            setEditingText('')
        }
    }


    return(
        <ul >
            {
                todos.map(todo=>(
                    <li key={todo.id}>
                        {editingId === todo.id ? (
                            <form onSubmit={handelEdit}>
                                <input
                                type="text"
                                value={editingText}
                                onChange={(e)=>setEditingText(e.target.value)}
                                 />
                                 <div className="editBox">
                                 <button className="saveBtn" type="submit">save</button>
                                 <button
                                    className="cnlBtn"
                                    type="button"
                                    onClick={()=>{
                                        setEditingId(null)
                                        setEditingText('')
                                    }
                                }
                                 >
                                    cancel
                                 </button>
                                 </div>
                            </form>
                        ):(
                            <>
                             <span 
                            style={{textDecoration: todo.completed  ? "line-through":'none',
                                textDecorationColor: todo.completed ? 'red' : "transparent",
                                fontSize:'20px'
                            }}
                            onClick={()=>dispatch(toggleTodo(todo.id))}
                            autoFocus
                        >
                            {todo.text}
                        </span>

                       <div style={{display:'flex',alignItems:'center'}}>
                       <button
                        className="editBtn"
                        onClick={()=>{
                            setEditingId(todo.id);
                            setEditingText(todo.text);
                        }}
                         >
                            <TbEdit size={20} />
                        </button>

                        <button
                            className="deleteBtn"
                            onClick={()=>dispatch(deleteTodo(todo.id))}
                        ><MdDelete size={20} /></button>

                       </div>
                        
                    
                            </>
                        )}
                   </li>     
                ))
            }
        </ul>
    )
}