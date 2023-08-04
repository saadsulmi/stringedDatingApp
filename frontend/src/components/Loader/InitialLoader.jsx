import React from 'react'
import Lottie from "lottie-react";
import myanimation from "../../assets/lottie/animation_lkw6y390.json";

function InitialLoader() {
  return (
    <div className='lottieSection'>
      <Lottie style={{width:'500px'}} animationData={myanimation} loop={true} />
    </div>
  )
}

export default InitialLoader
