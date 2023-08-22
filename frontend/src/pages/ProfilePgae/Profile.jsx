import React from 'react'
import DiscoverSide from '../../components/Discover/DiscoverSide'
import UserProfile from '../../components/UserProfile/userProfile'
import EditProfile from '../../components/EditProfile/EditProfile'
import { useState } from 'react'
import Header from '../../components/Header/Header'

function Profile() {
  const [edit,setEdit]=useState(false)
  return (
    <div>
        <Header/>
       {!edit?<UserProfile edit={edit} setEdit={setEdit}/>:<EditProfile edit={edit} setEdit={setEdit}/>} 
        
    </div>
  )
}

export default Profile