import { configureStore } from "@reduxjs/toolkit";
import todoSlice from "./features/todoSlice";

const Store = configureStore({
    reducer:{
        todos : todoSlice.reducer
    }
})
export default Store;