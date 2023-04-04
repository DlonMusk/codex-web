import { collection, doc } from 'firebase/firestore'
import React from 'react'
import { useDocument } from 'react-firebase-hooks/firestore'
import { useSelector } from 'react-redux'
import { selectUser } from '../dataLayer/slices/userSlice'
import { db } from '../firebase'

function TaskScreen({ task }) {

    // const user = useSelector(selectUser)

    // const [taskData, loading] = useDocument(doc(db, 'users', user.uid, 'tasks', taskId))

    // console.log(taskData?.data())

    console.log(task)

    const {_, taskData } = task

    return (
        <div className='sm:w-3/4 sm:flex hidden h-full bg-ultrablue'>

            {task && (
                <div>{taskData.title}</div>
            )}

        </div>
    )
}

export default TaskScreen