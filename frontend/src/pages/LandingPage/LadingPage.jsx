import React from 'react'
import Header from '../../components/Header/Header'
import { useNavigate } from 'react-router-dom'


function LadingPage() {
  const navigate = useNavigate()
  return (
    <>
        <Header/>
        <div className='backgroundCard'>
            <div>
                <h1>Make The First Move</h1>
                <h5>Start meeting new people in your area! If you already have an account, sign in to use Stringed on the web.</h5>
            </div>
            <div className='signInUpbuttonDiv'>
                  <button className='join' onClick={()=>navigate('/signUp')}>Join</button>
                  <button className='SignUp' onClick={()=>navigate('/login')}>Sign In</button>
            </div>
        </div>
    </>
  )
}

export default LadingPage
