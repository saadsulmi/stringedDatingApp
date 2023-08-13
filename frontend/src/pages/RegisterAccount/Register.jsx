import React, { useState } from 'react'
import Header from '../../components/Header/Header'
import Signup from '../../components/SignUp/Signup'
import Logo from '../../components/Logo/Logo'
import { GoogleOAuthProvider } from '@react-oauth/google';


function Register() {

  return (
    <>
      <Logo/>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENTID}>
      <Signup/>
      </GoogleOAuthProvider>
    </>
  )
}

export default Register
