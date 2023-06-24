import { collection, doc, getDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useDocument, useDocumentOnce } from 'react-firebase-hooks/firestore'
import { useSelector } from 'react-redux'
import { selectUser } from '../dataLayer/slices/userSlice'
import { db } from '../firebase'

function TaskScreen({ taskId }) {

    const user = useSelector(selectUser)

    const [value, loading, error] =  useDocumentOnce(doc(db, 'users', user.uid, 'tasks', taskId))

    return (
        <div className='sm:w-3/4 sm:flex hidden h-full bg-ultrablue'>

            {value?.data() && (
                <div>{value?.data().title}</div>
            )}

        </div>
    )
}

export default TaskScreen