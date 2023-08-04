import React from 'react'
import logo from '../../assets/image/stringedlogo.png'
function Header() {
  return (
    <div className='headerSection'>
      <img className='myLogo' src={logo} alt="" />
      <div className='HeaderOptions'>
        <h3>About</h3>
        <h3>Login</h3>
      </div>
    </div>
  )
}

export default Header
