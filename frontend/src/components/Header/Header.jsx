import React from 'react'
import logo from '../../assets/image/stringedlogo.png'
import {  useNavigate } from 'react-router-dom'
function Header() {
  const navigate = useNavigate()
  return (
    <div className='headerSection'>
      <img className='myLogo' src={logo} />
      <div className='HeaderOptions'>
        <h3>About</h3>
        <h3>Login</h3>
      </div>
    </div>
  )
}

export default Header
