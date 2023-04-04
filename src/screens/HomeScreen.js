import { collection, doc, setDoc } from 'firebase/firestore'
import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Nav from '../components/Nav'
import NewTask from '../components/NewTask'
import TaskRow from '../components/TaskRow'
import { selectUser, setUsername } from '../dataLayer/slices/userSlice'
import { db } from '../firebase'
import { useCollection } from "react-firebase-hooks/firestore"
import TaskScreen from '../components/TaskScreen'

function HomeScreen() {

  const user = useSelector(selectUser)


  const usernameRef = useRef(null)

  const dispatch = useDispatch()

  const [hasUsername, setHasUsername] = useState(false)
  const [selectedTask, setSelectedTask] = useState(null)

  const [tasks] = useCollection(collection(db, 'users', user.uid, 'tasks'))


  console.log(user.uid)

  // const printTasks = () => {
  //   tasks?.docs.map(task => {
  //     console.log(task.data())
  //   })
  // }

  console.log("Selected", selectedTask)

  console.log(hasUsername)

  const createUsername = (e) => {
    e.preventDefault()

    console.log(usernameRef.current.value)

    dispatch(setUsername({
      username: usernameRef.current.value
    }))

    setDoc(doc(db, 'users', user.uid), {
      username: usernameRef.current.value
    }, { merge: true })

    setHasUsername(true)

  }

  const createNewTask = (e) => {

  }

  return (
    <div className='relative flex flex-col h-screen-ios min-h-screen sm:h-screen'>
      <Nav />

      {!user?.username && (
        <div className='h-screen w-screen bg-[#677ba173]'>
          <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[30vw] h-fit min-w-[320px] sm:min-w-[400px] sm:max-w-[450px] p-5 sm:p-12 flex flex-col bg-light rounded-lg shadow-2xl'>
            <form className='flex flex-col items-center justify-around space-y-4'>
              <h1 className='font-bold tracking-widest w-[90%] text-center'>Please enter a username</h1>
              <input className='rounded-sm p-1 w-[80%]' type='text' placeholder='Username' ref={usernameRef} />
              <button className='rounded-sm p-1 w-[80%] bg-white' onClick={createUsername}>Confirm</button>
            </form>
          </div>
        </div>
      )}

      {/* <h1>Hello {user.username} {user.uid}</h1> */}
      <div className='relative flex h-screen'>
        {/* tasks list */}

        <div className='flex-1 flex-col overflow-hidden sm:w-1/4 sm:min-w-[350px] w-screen bg-gray-400 text-black space-y-2 p-2'>
          <NewTask />
          {/* add text if tasks are loading */}
          {!tasks?.empty && (
            tasks?.docs.map(task => (
              <div onClick={() => setSelectedTask({active: task.id, taskData: task.data()})}>
                <TaskRow key={task.id} props={{active: selectedTask?.active, task: {taskId: task.id, taskData: task.data()}}}  />
              </div>
            ))

          )}
        </div>


        {/* task screen */}
        {selectedTask ? (
          <TaskScreen key={selectedTask}  task={selectedTask}/>
        ) : (
          <div className='sm:w-3/4 sm:flex hidden h-full bg-black'>

          </div>
        )}
      </div>

    </div>
  )
}

export default HomeScreen