import { createSlice } from "@reduxjs/toolkit";
import { initialState, type Todo } from "../type/todo";

const todoSlice = createSlice({
    name : "todolist", 
    initialState : initialState, 
    reducers : {
        addTodos : (state , action) => {
            const newTodo:Todo = {
                id : Math.max(0, ...state.todos.map(todo => todo.id) ) +1,
                text : action.payload,
                completed : false
            }
            state.todos.push(newTodo);
        } , 
        deleteTodo : (state, action) => {
            const id = action.payload;
            state.todos = state.todos.filter((todo) => todo.id != id);
        },
        toggleComplete : (state, action) => {
            const id = action.payload;
            const todo = state.todos.find((todo) => todo.id == id);
            todo && (todo.completed = !todo?.completed);
        }
    }
})

export const {addTodos, deleteTodo, toggleComplete} = todoSlice.actions;

export default todoSlice.reducer;