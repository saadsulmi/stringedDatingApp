import React from 'react'
import Header from '../../components/Header/Header'
import { useNavigate } from 'react-router-dom'

function LandingPage() {
    const navigate = useNavigate()
  return (
    <>
        <Header/>
        <div className='main'>
            <div className='backgroundCard'>
                <div>
                    <h1>Make The First Move</h1>
                    <h5>Start meeting new people in your area! If you already have an account, sign in to use Stringed on the web.</h5>
                </div>
                <div className='signInUpbuttonDiv'>
                    <button className='join' onClick={()=>navigate('/signup')}>Join</button>
                    <button className='SignUp' onClick={()=>navigate('/login')}>Sign In</button>
                </div>
            </div>
        </div>
    </>
  )
}

export default LandingPage

