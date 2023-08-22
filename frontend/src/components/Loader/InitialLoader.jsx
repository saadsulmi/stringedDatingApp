import React from 'react'
import Lottie from "lottie-react";


function InitialLoader(props) {

    const userPresentStyle = { width: '500px' };
    const userAbsentStyle = { width: '200px', marginTop:"-400px" };
  
    const selectedStyle = props.user ? userAbsentStyle : userPresentStyle;
  return (
    <div className='lottieSection'>
      <Lottie style={selectedStyle} animationData={props.image} loop={true} />
    </div>
  )
}

export default InitialLoader
