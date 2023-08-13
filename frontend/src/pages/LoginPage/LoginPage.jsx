import React from 'react'
import Header from '../../components/Header/Header'
import Logo from '../../components/Logo/Logo'
import Login from '../../components/Login/Login'
import { GoogleOAuthProvider } from '@react-oauth/google';

function LoginPage() {
  return (
    <>
        <Logo/>

        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENTID}>
        <Login/>
        </GoogleOAuthProvider>
    </>
  )
}

export default LoginPage
