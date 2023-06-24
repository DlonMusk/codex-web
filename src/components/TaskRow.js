import { deleteDoc, doc } from 'firebase/firestore'
import React, { useState } from 'react'
import { FaRegTrashAlt } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedTask } from '../dataLayer/slices/taskSlice'
import { selectUser } from '../dataLayer/slices/userSlice'
import { db } from '../firebase'
import TaskConstants from '../constants/TaskConstants'

function TaskRow({ props }) {

  const dispatch = useDispatch()

  const { active, task } = props
  const { taskData, taskId } = task

  const user = useSelector(selectUser)

  console.log(taskData)


  return (
    <div className={`flex items-center h-[40px] sm:h-[60px] justify-between p-2 px-10 rounded-lg  cursor-pointer ${taskData.type === TaskConstants.TASK ? 'hover:bg-blue-500' : 'hover:bg-green-500'} ${active === taskId && taskData.type === TaskConstants.TASK && 'bg-blue-600 hover:bg-blue-600'} ${active === taskId && taskData.type === TaskConstants.HABIT && 'bg-green-600 hover:bg-green-600'}`}>

      <h1 className='font-semibold'>{taskData.title}</h1>

      {active === taskId && (
        <FaRegTrashAlt
         className='h-5 w-5 hover:text-gray-400'
         onClick={(e) => {
          e.stopPropagation()
          // Remove Task from database
          deleteDoc(doc(db, 'users', user.uid, 'tasks', taskId))
          dispatch(setSelectedTask(null))
         }}
         />

      )}
    </div>
  )
}

export default TaskRow