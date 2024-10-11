import React from 'react'
import { Outlet } from 'react-router-dom'
import PlayCenterIcon from './PlayCenterIcon'

const Layout = () => {
  return (
    <>
    <Outlet/>
    <PlayCenterIcon/>
    </>
  )
}

export default Layout