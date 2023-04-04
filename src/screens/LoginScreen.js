import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import React, { useRef, useState } from 'react'
import { auth, db } from '../firebase'
import GoogleLogo from '../assets/GoogleLogo.png'

function LoginScreen() {

    // D3CFC2

    const [isNewAccount, setIsNewAccount] = useState(true)

    const emailRef = useRef(null)
    const passwordRef = useRef(null)

    const registerWithEmail = (e) => {
        e.preventDefault()
        createUserWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value)
            .then(authUser => {
                console.log(authUser)
                setDoc(doc(db, 'users', authUser.user.uid), {
                    email: emailRef.current.value,
                })
            })
            .catch(err => {
                console.error(err)
            })
    }

    const continueWithGoogle = (e) => {
        e.preventDefault()

        const provider = new GoogleAuthProvider()
        signInWithPopup(auth, provider)
            .then((result) => {

                const user = result.user;


                console.log(user)
                setDoc(doc(db, 'users', user.uid), {
                    email: user.email,
                    profilePhoto: user.photoURL,
                })
            }).catch((error) => {
                // Handle Errors here.
                const errorMessage = error.message;
                alert(errorMessage)
            });
    }

    const signIn = (e) => {
        e.preventDefault()

        signInWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value)
            .then(authUser => {
                console.log(authUser)
            })
            .catch(err => {
                console.error(err)
            })
    }

    // TODO: Fix chrome auto complete text inputs, figure out why the x will not scale

    return (
        <div className='h-screen-ios min-h-screen sm:h-screen flex flex-col items-center bg-offwhite overflow-hidden'>

            <h1 className='tracking-[25px] sm:tracking-[50px] mt-[10vh] text-4xl md:text-[100px] font-main font-thin ml-[25px] sm:ml-[50px]'>
                CODE<span className='text-accent'>X</span>
            </h1>



            {isNewAccount ? (
                <div className='w-[30vw] h-fit  min-w-[320px] sm:min-w-[400px] sm:max-w-[450px] mt-10 sm:mt-16 p-5 sm:p-16 flex flex-col bg-light rounded-lg shadow-2xl'>

                    <h1 className='text-center font-bold tracking-[2px] sm:text-xl'>Create your account</h1>

                    <form className='mt-5 space-y-10 flex flex-col items-center'>

                        <div className='space-y-2 w-[100%] max-w-[350px] min-w-[250px] flex flex-col items-center'>
                            <input className='bg-offwhite autofill:bg-offwhite focus:bg-white w-[90%] outline-none px-3 py-2 text-md  border border-black rounded-md placeholder:font-main placeholder:text-gray-400' type='email' placeholder='Enter email address' ref={emailRef} />


                            <input className='bg-offwhite autofill:bg-offwhite focus:bg-white w-[90%] outline-none px-3 py-2 text-md border border-black rounded-md placeholder:font-main placeholder:text-gray-400' type='password' placeholder='Enter password' ref={passwordRef} />

                            <button className='bg-accent w-[90%] px-3 py-2 text-md font-semibold border border-black rounded-md' onClick={registerWithEmail}>Create Account</button>
                        </div>

                        <div className='flex w-full items-center justify-center space-x-2'>

                            <div className='bg-black h-[1px] w-[40%]' />
                            <p>OR</p>
                            <div className='bg-black h-[1px] w-[40%]' />
                        </div>





                        <button
                            className='w-[70%] max-w-[350px] min-w-[250px] bg-black rounded-md flex items-center justify-center text-white'
                            onClick={continueWithGoogle}
                        >
                            <img src={GoogleLogo} alt='google logo' className='h-10 w-10' />
                            <p className='font-bold'>Continue with google</p>
                        </button>

                        <p className=''>Already have an account? <span className='text-ultrablue cursor-pointer' onClick={() => setIsNewAccount(!isNewAccount)}>Click here</span></p>

                    </form>
                </div>
            ) : (
                <div className='w-[30vw] h-fit  min-w-[320px] sm:min-w-[400px] sm:max-w-[450px] mt-10 sm:mt-16 p-5 sm:p-16 flex flex-col bg-light rounded-lg shadow-2xl'>

                    <h1 className='text-center font-bold tracking-[2px] sm:text-xl'>Log in with Codex</h1>

                    <form className='mt-5 space-y-10 flex flex-col items-center'>

                        <div className='space-y-2 w-[100%] max-w-[350px] min-w-[250px] flex flex-col items-center'>
                            <input className='bg-offwhite autofill:bg-offwhite focus:bg-white w-[90%] outline-none px-3 py-2 text-md  border border-black rounded-md placeholder:font-main placeholder:text-gray-400' type='email' placeholder='Enter email address' ref={emailRef} />


                            <input className='bg-offwhite autofill:bg-offwhite focus:bg-white w-[90%] outline-none px-3 py-2 text-md border border-black rounded-md placeholder:font-main placeholder:text-gray-400' type='password' placeholder='Enter password' ref={passwordRef} />

                            <button className='bg-accent w-[90%] px-3 py-2 text-md font-semibold border border-black rounded-md' onClick={signIn}>Log in</button>
                        </div>



                        <div className='flex w-full items-center justify-center space-x-2'>
                            <div className='bg-black h-[1px] w-[40%]' />
                            <p>OR</p>
                            <div className='bg-black h-[1px] w-[40%]' />
                        </div>





                        <button
                            className='w-[70%] max-w-[350px] min-w-[250px] bg-black rounded-md flex items-center justify-center text-white'
                            onClick={continueWithGoogle}
                        >
                            <img src={GoogleLogo} alt='google logo' className='h-10 w-10' />
                            <p className='font-bold'>Continue with google</p>
                        </button>

                        <p className=''>Dont have an account? <span className='text-ultrablue cursor-pointer' onClick={() => setIsNewAccount(!isNewAccount)}>Create one</span></p>

                    </form>
                </div>
            )}

        </div>
    )
}

export default LoginScreen