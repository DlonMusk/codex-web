import { createSlice } from "@reduxjs/toolkit";

export const taskSlice = createSlice({
    name: 'task',
    initialState: {
        selectedTask: null,
    },
    reducers: {
        setSelectedTask: (state, action) => {
            state.selectedTask = action.payload
        },
    }
})

export const { setSelectedTask } = taskSlice.actions

export const selectTask = state => state.task.selectedTask


export default taskSlice.reducer