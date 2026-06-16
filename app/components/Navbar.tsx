import Link from 'next/link'
import React from 'react'

export const Navbar = () => {
  return (
    <nav className='bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white text-black text-center'>
        <div className="flex justify-center m-2">
            <h1 className='text-2xl font-sans '>Tower Of Hanoi</h1>
        </div>
    </nav>
  )
}
