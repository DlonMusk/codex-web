import { collection, doc } from 'firebase/firestore'
import React from 'react'
import { useDocument } from 'react-firebase-hooks/firestore'
import { useSelector } from 'react-redux'
import { selectUser } from '../dataLayer/slices/userSlice'
import { db } from '../firebase'

function TaskScreen({ taskId }) {

    const user = useSelector(selectUser)

    const [taskData, loading] = useDocument(doc(db, 'users', user.uid, 'tasks', taskId))

    console.log(taskData?.data())

    return (
        <div className='sm:w-3/4 sm:flex hidden h-full bg-ultrablue'>

            {taskData && (
                <div>{taskData?.data()?.title}</div>
            )}

        </div>
    )
}

export default TaskScreen