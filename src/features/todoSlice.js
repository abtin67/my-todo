import { createSlice } from "@reduxjs/toolkit";

const loadTodos = () => {
  const storedTOdos = JSON.parse(localStorage.getItem("todos")) || [];
  return storedTOdos;
};

const saveTodos = (todos) => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

const todoSlice = createSlice({

  name: "todos",
  initialState: loadTodos(),

  reducers: {
    add: (state, action) => {
      state.push({ id: Date.now(), text: action.payload, completed: false });
      saveTodos(state)
    },
    toggleTodo: (state, action) => {
      const todo = state.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
        saveTodos(state)
      }
    },
    deleteTodo: (state, action) => {
      const newState =state.filter((todo) => todo.id !== action.payload);
      saveTodos(newState);
      return newState
    },
    editTodo: (state,action)=>{
        const {id,newText}=action.payload;
        const todo =state.find(todo => todo.id === id)
        if(todo){
            todo.text = newText;
            saveTodos(state)
        }
    }
  },
});
export default todoSlice;
