import React, { Children } from 'react'
import { Navbar } from '../components/Navbar';
import Footer from '../components/Footer';

const layout = ({children}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
        <Navbar />
        {children}
    </>
  )
}

export default layout