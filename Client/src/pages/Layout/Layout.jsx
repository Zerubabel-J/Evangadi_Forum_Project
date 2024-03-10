import React from 'react'
import NavbarPage from '../Navbar/Navbar'
import Footer from '../Footer/Footer'

const Layout = ({children}) => {
  return (
    <>
      <NavbarPage/>
      {children}
      <Footer/>
    </>
  )
}

export default Layout
