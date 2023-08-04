import React from 'react'
import { useState,useEffect } from 'react';
import { useLottie } from "lottie-react";
import myanimation from '../../assets/lottie/animation_lkwb37nh.json'
import { Navigate,Outlet, useNavigate } from 'react-router-dom';
import InitialLoader from '../../components/Loader/InitialLoader';
function Loader() {
  
    const navigate = useNavigate('')
    const [initial,setInitial]=useState(true);
    useEffect(()=>{
        setTimeout(()=>{
        setInitial(false);
        navigate('/')
        },5000)
    },[]);
    return initial?<InitialLoader image={myanimation}/>:<Outlet/>
}
export default Loader
