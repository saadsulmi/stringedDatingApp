import React from 'react'
import Logo from '../../components/Logo/Logo'
import { LiaSmsSolid } from "react-icons/lia";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Navigate, useNavigate } from 'react-router-dom';

function MobileLogin() {
    const navigate = useNavigate()
  return (
    <>
      <Logo/>
      <div className='contentField'>
        
        <h1><LiaSmsSolid style={{padding:"0", margin:"0 10px 0 0"}} /> OTP Login</h1>
        <h3>Enter Your Mobile Number</h3>

        <TextField sx={{marginBottom:"20px",color:"white"}} className='textfield' id="outlined-basic" label="Mobile" variant="outlined" />
        
        <div>
        <Button variant="contained" onClick={()=>navigate('/')}>Send OTP</Button>
        </div>


      </div>
    </>
  )
}

export default MobileLogin
