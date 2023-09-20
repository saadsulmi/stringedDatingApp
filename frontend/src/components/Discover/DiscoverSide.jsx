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
      }, 3000);
    }
  }, [user]);

 
  
  useEffect(() => {
    DiscoverUsersApi()
    .then((res) => {
        setUsers(res.data);
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
        const dislikedUserIds = user?.dislikedUsers.map((dislikedUser) =>
        dislikedUser.toString()
        );
        
        filteredUsers = shuffledUsers?.filter(
          (user) =>
          !likedUserIds.includes(user?._id.toString())&&!dislikedUserIds.includes(user?._id.toString())
          ); 

          if(user&&user.distance>0){
            filteredUsers = filteredUsers.filter((myuser)=>{
              let limits=user.ageLimit[0]
              let lim1=parseInt(limits.slice(0,2))
              let lim2=parseInt(limits.slice(3,6))
            if( lim1<=myuser.age&&lim2>=myuser.age) {
              let {userDistance,realDistance}=distance(myuser.latitude,myuser.longitude);
              if (realDistance<userDistance) return user
            }
          })
        }
      }
      
// Program for distance between two points on earth Haversine formula

function distance(lat1, lon1,
  lat2=user.latitude, lon2=user.longitude)
{
// The math module contains a function
// named toRadians which converts from
// degrees to radians.
lon1 =  lon1 * Math.PI / 180;
lon2 = lon2 * Math.PI / 180;
lat1 = lat1 * Math.PI / 180;
lat2 = lat2 * Math.PI / 180;

// Haversine formula
let dlon = lon2 - lon1;
let dlat = lat2 - lat1;
let a = Math.pow(Math.sin(dlat / 2), 2)
+ Math.cos(lat1) * Math.cos(lat2)
* Math.pow(Math.sin(dlon / 2),2);

let c = 2 * Math.asin(Math.sqrt(a));
let r = 6371;

return({realDistance:Math.round(c * r)+5,userDistance:user.distance});

}


  useEffect(() => {
    //
    
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
