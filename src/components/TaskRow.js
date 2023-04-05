import { deleteDoc, doc } from 'firebase/firestore'
import React, { useState } from 'react'
import { FaRegTrashAlt } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedTask } from '../dataLayer/slices/taskSlice'
import { selectUser } from '../dataLayer/slices/userSlice'
import { db } from '../firebase'

function TaskRow({ props }) {

  const dispatch = useDispatch()

  const { active, task } = props
  const { taskData, taskId } = task

  const user = useSelector(selectUser)


  return (
    <div className={`flex items-center h-[40px] sm:h-[60px]  p-2 px-10 rounded-lg hover:bg-gray-500 cursor-pointer ${active === taskId ? 'bg-gray-600 hover:bg-gray-600 justify-between' : 'bg-gray-400'}`}>
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