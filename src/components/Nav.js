import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { logout, selectUser } from '../dataLayer/slices/userSlice'
import { FaUserCircle } from 'react-icons/fa'
import { auth } from '../firebase'

function Nav() {

    const user = useSelector(selectUser)
    const [optionsOpen, setOptionsOpen] = useState(false)


    return (
        <div className='sticky top-0 z-10 h-[70px] w-full bg-offwhite flex justify-center'>
            <div className='relative flex justify-between items-center p-5 w-full sm:max-w-7xl'>
                {/* CODEX */}
                <h1 className='font-bold font-main uppercase tracking-[10px] sm:text-2xl sm:tracking-[15px]'>{user.username && `${user.username}'S`} CODE<span className='text-accent'>X</span></h1>
                {/* profile img */}
                {user.profilePhoto ? (
                    <img className='rounded-full h-10 w-10' src={user.profilePhoto} alt='profile img' onClick={() => setOptionsOpen(!optionsOpen)}></img>
                ) : (
                    <FaUserCircle className='h-10 w-10' onClick={() => setOptionsOpen(!optionsOpen)} />
                )}

                {optionsOpen && (
                    <div className='absolute flex flex-col items-center justify-evenly h-fit w-fit min-w-[120px] right-2 top-20 fit bg-white border border-black'>
                        <button className='tracking-widest bg-white p-3 border-b border-black'>
                            Stats
                        </button>

                        <button 
                        className='tracking-widest bg-white p-3'
                        onClick={() => {
                            logout()
                            auth.signOut()
                        }}
                        >
                            Log out
                        </button>
                    </div>
                )}
            </div>


        </div>
    )
}

export default Nav