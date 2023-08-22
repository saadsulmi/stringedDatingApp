import React from 'react'
import { useState,useEffect } from 'react';
import { useLottie } from "lottie-react";
import myanimation from '../assets/lottie/animation_lkw6y390.json'
import { Navigate,Outlet } from 'react-router-dom';
import InitialLoader from '../components/Loader/InitialLoader';
function Loader({user}) {
    const [initial,setInitial]=useState(true);
    useEffect(()=>{
        setTimeout(()=>{
        setInitial(false)
        },3500)
    },[]);
    return initial?<InitialLoader user={user} image={myanimation}/>:<Outlet/>
}
export default Loader
