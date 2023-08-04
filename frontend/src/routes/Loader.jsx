import React from 'react'
import { useState,useEffect } from 'react';
import { useLottie } from "lottie-react";
import myanimation from '../assets/lottie/animation_lkw6y390.json'
import { Navigate,Outlet } from 'react-router-dom';
import InitialLoader from '../components/Loader/InitialLoader';
function Loader() {
    const options = {
        animationData: myanimation,
        loop: true
      };
      const { View } = useLottie(options);
      
    const [initial,setInitial]=useState(true);
    useEffect(()=>{
        setTimeout(()=>{
        setInitial(false)
        },5000)
    },[]);
    return initial?<InitialLoader/>:<Outlet/>
}
export default Loader
