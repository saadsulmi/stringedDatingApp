import React, { useState } from 'react'
import Header from '../../components/Header/Header'
import BaseRegisterPage from '../../components/UserRegistration/BaseRegisterPage'
import Logo from '../../components/Logo/Logo'
import { GoogleOAuthProvider } from '@react-oauth/google';


function Register() {

  return (
    <>
      <Logo/>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENTID}>
      <BaseRegisterPage/>
      </GoogleOAuthProvider>
    </>
  )
}

export default Register
