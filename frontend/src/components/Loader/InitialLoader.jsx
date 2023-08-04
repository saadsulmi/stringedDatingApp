import React from 'react'
import Lottie from "lottie-react";


function InitialLoader(props) {
  return (
    <div className='lottieSection'>
      <Lottie style={{width:'500px'}} animationData={props.image} loop={true} />
    </div>
  )
}

export default InitialLoader
