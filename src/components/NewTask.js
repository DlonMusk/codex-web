import { addDoc, collection } from 'firebase/firestore'
import React, { useRef, useState } from 'react'
import { BsClipboard2Plus, BsClockHistory } from 'react-icons/bs'
import { IoMdCheckmark } from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux'
import { addTask } from '../dataLayer/slices/tasksSlice'
import { selectUser } from '../dataLayer/slices/userSlice'
import { db } from '../firebase'

function NewTask() {

    const [newTaskModalOpen, setNewTaskModalOpen] = useState()
    const taskNameRef = useRef(null)
    const user = useSelector(selectUser)
    const dispatch = useDispatch()

    const createTask = async (e) => {
        e.preventDefault()

        if(taskNameRef.current.value.length < 3){
            alert('Task title must be over 3 characters')
            return
        }
        
        const doc = await addDoc(collection(db, 'users', user?.uid, 'tasks'), {
            title: taskNameRef.current.value,
            type: 'task'
        })

        // dispatch(addTask({
        //     id: doc.id,
        //     title: taskNameRef.current.value,
        //     type: 'task'
        // }))


        console.log(doc.id)

        setNewTaskModalOpen(false)
    }

    const createHabit = async (e) => {
        e.preventDefault()
        
        setNewTaskModalOpen(false)
    }

    return (
        <div>
            <div
                className='flex justify-center space-x-3 items-center h-[40px] sm:h-[50px] m-3 rounded-lg bg-gray-500 cursor-pointer'
                onClick={() => setNewTaskModalOpen(true)}
            >
                <BsClipboard2Plus className='h-7 w-7' />
                <h1 className='font-bold'>New Task</h1>
            </div>
            {newTaskModalOpen && (
                <form className='h-[70px] flex items-center justify-around bg-white m-2 p-1'>
                    <input className='p-2 w-5/12  bg-gray-200 rounded-lg' type="text" placeholder='Task name' ref={taskNameRef}/>
                    <button
                        className='flex  items-center space-x-3 bg-gray-500 p-1 px-2 rounded-lg'
                        onClick={createTask}
                    >
                        <h1 className='font-mono font-semibold w-1/2'>Task</h1>
                        <IoMdCheckmark className='h-5 w-5 ' />
                    </button>
                    <button
                        className='flex  items-center space-x-3 bg-gray-500 p-1 px-2 rounded-lg'
                        onClick={createHabit}
                    >
                        <h1 className='font-mono font-semibold w-1/2'>Habit</h1>
                        <BsClockHistory className='h-5 w-5 ' />
                    </button>
                </form>
            )}
        </div>
    )
}

export default NewTask