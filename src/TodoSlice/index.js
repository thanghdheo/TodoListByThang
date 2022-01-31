import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    todoInput: '',
    todos : [],
    todosSearch : [],
    hideAdd : true,
    hideSearch : false,
    filter : 'all'
}

const todoSlice =  createSlice({
    name: 'todo',
    initialState : initialState,
    reducers: {
        setTodo : (state,action) => {
            state.todos = action.payload
        },
        setInput : (state,action) => {
            state.todoInput =  action.payload
        },
        addTodo : (state,action) => {
            state.todos = [...state.todos,action.payload]
        },
        editCompleted : (state,action) => {
            state.todos = state.todos.map(todo =>  todo.id === action.payload? {...todo,isCompleted : !todo.isCompleted} : todo)
        },
        setTodoSearch : (state,action) => {
            state.todosSearch = [...state.todos]
        },
        search : (state,action) => {
            state.todosSearch = action.payload !== '' ?  state.todos.filter(item => item.job.toLowerCase().trim().includes(action.payload.toLowerCase().trim())) : [...state.todos] 
        },
        setHideAdd : (state,action) => {
            state.hideAdd = action.payload
        },
        setHideSearch : (state,action) => {
            state.hideSearch = action.payload
        },
        setFilter : (state,action) => {
            state.filter = action.payload
        }
    }
})

const {reducer,actions} = todoSlice
export const {setInput,addTodo,editCompleted,search,setHideAdd,setHideSearch,setFilter,setTodo,setTodoSearch} = actions
export default reducer