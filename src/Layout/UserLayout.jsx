import React, { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Footer from '../Components/Footer'
import Navbar from '../Components/Navbar'

function UserLayout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <Navbar />
      <Outlet />
      <Footer/>
    </>
  )
}

export default UserLayout
