import * as React from "react";
import { Grid, Skeleton, Typography } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { SetUserData } from "../../features/users/UserReducer";
import RenderContentData from "./RenderContentData";
import {
  DiscoverUsersApi,
  disLikeUserApi,
  likeUserApi,
} from "../../services/api";
import BoilerPlateCode from "../Boilerplate";
export default function DiscoverSide() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const [users, setUsers] = useState([]);
  let [skip, setSkip] = useState(Math.random());
  const [isLoading, setLoading] = useState(true);
  const [shuffledUsers, setShuffledUsers] = useState([]);
  const [tost, settost] = useState({});
  const initial={
    open:false,
    success:false,
    data:''
  }
  useEffect(()=>{
settost(initial)
  },[])
  useEffect(() => {
    if (user) {
      setTimeout(() => {
        setLoading(false);
      }, 4000);
    }
  }, [user]);

 

  useEffect(() => {
    DiscoverUsersApi()
      .then((res) => {
        console.log("hai chellom i aam here",res.data);
        setUsers(res.data);
        console.log("user ok thaan",users);
      })
      .catch((err) => {
        window.location.reload();
      });
  }, [isLoading,user,skip]);

  
   let filteredUsers = [];

  if (users) {
    const likedUserIds = user?.likedUsers.map((likedUser) =>
      likedUser.toString()
    );
    console.log("users i liked are",likedUserIds);
    const dislikedUserIds = user?.dislikedUsers.map((dislikedUser) =>
    dislikedUser.toString()
    );
    console.log("users i disliked are",dislikedUserIds);

    filteredUsers = shuffledUsers?.filter(
      (user) =>
        !likedUserIds.includes(user?._id.toString())&&!dislikedUserIds.includes(user?._id.toString())
    ); 
    console.log(filteredUsers,"eppidi irukk en filteration");
  }

  useEffect(() => {
    // Function to shuffle the array using Fisher-Yates algorithm
    const shuffleArray = (array) => {
      const shuffledArray = array.slice();
      for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [
          shuffledArray[j],
          shuffledArray[i],
        ];
      }
      return shuffledArray;
    };

    setShuffledUsers(shuffleArray(users));
  }, [users]);

  const skipHandler = ()=>{
    setSkip(Math.random())
  }

  const likeHandler = async (id) => {
    const data = {
      User: id,
    };
    try { 
      settost(initial)
      const response = await likeUserApi(data);
      settost({
      data:'Liked user successfully',
      success:true,
      open:true
     })
    
      dispatch(SetUserData(response.data));
   
    } catch (err) {
      settost({
        data:'Falied to like user ',
        success:false,
        open:true
       })
      console.log(err);
    }
  };

 

  const dislikeHandler = async (id) => {
    const data = {
      User: id,
    };
    try {
      settost(initial)
      const response = await disLikeUserApi(data);
      settost({
        data:'Disliked user successfully',
        success:true,
        open:true
       })
       
      dispatch(SetUserData(response.data));
    } catch (err) {
      settost({
        data:'Falied to dislike user ',
        success:false,
        open:true
       })
      console.log(err);
    }
  };
useEffect(()=>{
console.log(tost);
},[tost])
  const setToastClosed=()=>{
    settost(initial)
  }

  return (
    <>
      <Grid container>
        <Grid
          item
          xs={12}
          lg={11}
          container
          sx={{ position: "relative", minHeight: { xs: "90vh", lg: '9' } }}
        >
          {filteredUsers.length>0?<RenderContentData
            user={user}
            isLoading={isLoading}
            filteredUsers={filteredUsers}
            likeHandler={likeHandler}
            dislikeHandler={dislikeHandler}
            skipHandler={skipHandler}
          />:<Grid container item sx={{color:"yellow",width:"100%",height:'70vh',backgroundColor:"rgba(0,0,0,0.2)",borderRadius:"2rem"}} justifyContent={"center"} alignItems={"center"}><Typography>No More Users to discover</Typography></Grid>}
          <BoilerPlateCode success={tost.success} open={tost.open} data={tost.data} setToastClosed={setToastClosed} />
        </Grid>
      </Grid>
    </>
  );
}
