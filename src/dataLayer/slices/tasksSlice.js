import { createSlice } from "@reduxjs/toolkit";

export const tasksSlice = createSlice({
    name: 'tasks',
    initialState: {
        tasks: [],
    },
    reducers: {
        addTask: (state, action) => {
            state.tasks.push(action.payload)
        },
        loadTasks: (state, action) => {
            state.tasks = action.payload
        }     
    }
})

export const { addTask, loadTasks } = tasksSlice.actions

export const selectTasks = state => state.tasks.tasks


export default tasksSlice.reducer