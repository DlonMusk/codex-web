import { addDoc, collection } from 'firebase/firestore'
import React, { useEffect, useRef, useState } from 'react'
import { BsClipboard2Plus, BsClockHistory, BsTree } from 'react-icons/bs'
import { IoMdCheckmark } from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedTask } from '../dataLayer/slices/taskSlice'
import { selectUser } from '../dataLayer/slices/userSlice'
import { db } from '../firebase'
import TaskConstants from '../constants/TaskConstants'

function NewTask() {

    const [newTaskModalOpen, setNewTaskModalOpen] = useState(false)
    const taskNameRef = useRef(null)
    const modalRef = useRef(null)
    const newTaskButtonRef = useRef(null)
    const user = useSelector(selectUser)
    const dispatch = useDispatch()


    const handleClickOutside = (e) => {
        e.stopPropagation()
        if ((!modalRef.current || !modalRef.current.contains(e.target)) && (!newTaskButtonRef.current || !newTaskButtonRef.current.contains(e.target))) {
            setNewTaskModalOpen(false)// Call onClose callback to close the modal
        }
    };

    useEffect(() => {
        document.addEventListener("mouseup", handleClickOutside)
        return () => {
            document.removeEventListener("mouseup", handleClickOutside)
        }
    }, [])

    const createTask = async (e) => {
        e.preventDefault()

        if (taskNameRef.current.value.length < 3) {
            alert('Task title must be over 3 characters')
            return
        }

        const doc = await addDoc(collection(db, 'users', user?.uid, 'tasks'), {
            title: taskNameRef.current.value,
            type: TaskConstants.TASK
        })


        dispatch(setSelectedTask(doc.id))

        setNewTaskModalOpen(false)
    }

    const createHabit = async (e) => {
        e.preventDefault()

        if (taskNameRef.current.value.length < 3) {
            alert('Task title must be over 3 characters')
            return
        }

        const doc = await addDoc(collection(db, 'users', user?.uid, 'tasks'), {
            title: taskNameRef.current.value,
            type: TaskConstants.HABIT
        })


        console.log(doc.id)

        setNewTaskModalOpen(false)
    }

    return (
        <div >
            <div className='flex items-center justify-center'>
                <div
                    className='flex w-11/12 justify-center space-x-3 items-center h-[40px] sm:h-[50px] m-3 rounded-lg bg-gray-500 cursor-pointer hover:shadow-lg'
                    onClick={(e) => setNewTaskModalOpen(!newTaskModalOpen)}
                    ref={newTaskButtonRef}
                >
                    <BsClipboard2Plus className='h-7 w-7' />
                    <h1 className='font-bold'>New Task</h1>
                </div>

            </div>
            {newTaskModalOpen && (
                <form className='h-auto space-y-5 flex flex-col items-center justify-around bg-white m-2 p-3 rounded-lg' ref={modalRef}>

                    <input className='p-2 w-auto  bg-gray-200 rounded-lg' type="text" placeholder='Task name' ref={taskNameRef} />


                    <div className='flex space-x-2'>

                        <button
                            className='flex  items-center space-x-3 bg-blue-500 p-1 px-2 rounded-lg'
                            onClick={createTask}
                        >
                            <h1 className='font-mono font-semibold w-1/2'>Task</h1>
                            <IoMdCheckmark className='h-5 w-5' />
                        </button>

                        <button
                            className='flex items-center space-x-3 bg-green-500 p-1 px-2 rounded-lg'
                            onClick={createHabit}
                        >
                            <h1 className='font-mono font-semibold w-1/2'>Habit</h1>
                            <BsClockHistory className='h-5 w-5' />
                        </button>

                    </div>

                </form>
            )}
        </div>
    )
}

export default NewTask