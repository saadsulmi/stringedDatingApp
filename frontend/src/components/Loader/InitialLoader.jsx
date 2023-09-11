import React from 'react'
import Lottie from "lottie-react";


function InitialLoader(props) {

    const userAbsentStyle = { width: '500px' };
    const userPresentStyle = { width: '400px', marginTop:"-370px" };
  
    const selectedStyle = props.user ?userPresentStyle : userAbsentStyle ;
  return (
    <div className='lottieSection'>
      <Lottie style={selectedStyle} animationData={props.image} loop={true} />
    </div>
  )
}

export default InitialLoader
