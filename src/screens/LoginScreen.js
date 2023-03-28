import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import React, { useRef, useState } from 'react'
import { auth, db } from '../firebase'

function LoginScreen() {

    // D3CFC2

    const [newAccount, setNewAccount] = useState(true)

    const emailRef = useRef(null)
    const passwordRef = useRef(null)

    const register = (e) => {
        e.preventDefault()
        createUserWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value)
            .then(authUser => {
                console.log(authUser)
                setDoc(doc(db, 'users', authUser.user.uid), {
                    username: '',
                    tasks: [],
                })
            })
            .catch(err => {
                console.error(err)
            })
    }

    const signIn = (e) => {
        e.preventDefault()

    }

    // TODO: Fix chrome auto complete text inputs, figure out why the x will not scale

    return (
        <div className='h-screen-ios min-h-screen sm:h-screen flex flex-col items-center font-main bg-offwhite'>
            <h1 className='tracking-[25px] sm:tracking-[50px] mt-[18vh] text-4xl sm:text-[100px] font-thin ml-[25px] sm:ml-[50px]'>CODE<span className='text-accent transform scale-150'>X</span></h1>


            <div className='w-[30vw] h-[50vh]  min-w-[320px] sm:w-[500px] mt-10 sm:mt-16 p-5 sm:p-16 flex flex-col bg-light rounded-lg shadow-2xl'>

                <h1 className='text-center font-bold tracking-[2px] sm:text-xl'>Create your account</h1>

                <form className='mt-5 space-y-10 flex flex-col items-center'>

                    <input className='bg-offwhite autofill:bg-offwhite focus:bg-white w-[90%] outline-none px-3 py-2 text-md sm:text-2xl border border-black rounded-md placeholder:font-main placeholder:text-gray-400' type='email' placeholder='Email@example.com' ref={emailRef} />


                    <input className='bg-offwhite autofill:bg-offwhite focus:bg-white w-[90%] outline-none px-3 py-2 text-md sm:text-2xl border border-black rounded-md placeholder:font-main placeholder:text-gray-400' type='password' placeholder='Password' ref={passwordRef} />


                    <button className='bg-offwhite w-[90%] px-3 py-2 text-md sm:text-2xl border border-black rounded-md' onClick={register}>Create Account</button>

                    <p className=''>Already have an account? <span className='text-ultrablue' onClick={() => setNewAccount(!newAccount)}>Click here</span></p>

                </form>
            </div>

        </div>
    )
}

export default LoginScreen