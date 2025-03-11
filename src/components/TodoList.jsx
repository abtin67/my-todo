import { useDispatch, useSelector } from "react-redux"
import todoSlice from "../features/todoSlice"

export function TodoList (){
    const todos = useSelector(state=>state.todos)
    const dispatch = useDispatch();
    const {toggleTodo,deleteTodo}=todoSlice.actions
    return(
        <ul>
            {
                todos.map(todo=>(
                    <li key={todo.id}>
                        <span 
                            style={{textDecoration: todo.completed  ? "line-through":'none'}}
                            onClick={()=>dispatch(toggleTodo(todo.id))}
                        >
                            {todo.text}
                        </span>
                        <button
                            onClick={()=>dispatch(deleteTodo(todo.id))}
                        >delete</button>
                    </li>
                ))
            }
        </ul>
    )
}