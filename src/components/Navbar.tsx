'use client'
import React from 'react'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { User } from 'next-auth'
import { Button } from './ui/button'

function Navbar() {
    const { data: session } = useSession()
    const user:User = session?.user as User
    return (
        <nav className="p-4 md:p-6 shadow-md">
            <div className='container mx-auto flex flex-col md:flex-row justify-between items-center'>
                <a href="#" className='text-xl font-bold mb-4 md:mb-0'>Anonymous Message</a>
                {
                    session ? (
                        <>
                            <span className='mr-4'>Welcome, {user?.username || user?.email}</span>
                            <Button onClick={()=>signOut()} className='md-full md:w-auto'>Logout</Button>
                        </>
                    ) : (
                        <Link href="/sign-in">
                            <Button className='md-full md:w-auto'>SignIn</Button>
                        </Link>
                    )
                }
            </div>
        </nav>
    )
}

export default Navbar
