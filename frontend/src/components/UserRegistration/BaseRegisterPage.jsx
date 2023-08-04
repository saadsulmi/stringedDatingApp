import React from 'react'
import { FaGoogle } from 'react-icons/fa';
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom';

function BaseRegisterPage() {
    const navigate = useNavigate()
  return (
    <div className='signupBlock'>
      <h3>Welcome! How do you want to get started?</h3>
      <Button sx={{borderRadius:"25px",border:"none",marginTop:"70px",height:"40px"}} variant="contained" disableElevation>
        <FaGoogle style={{padding:"0px", marginRight:"10px"}}/>
        Continue with Google
      </Button>

      <div className='breakSection'>
      <hr />
      <h6>or</h6>
      <hr/>
      </div>
      <h4 onClick={()=>navigate('/mobile')}>use mobile number</h4>

    </div>
  )
}

export default BaseRegisterPage
