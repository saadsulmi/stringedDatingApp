import * as React from "react";
import { Grid, Skeleton, Typography, Card } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import RenderLikedUsersCard from "./RenderLikedUsersCard";
import { SetUserData } from "../../features/users/UserReducer";
import { blockUserApi, disLikeUserApi, showAllLikedUsersApi } from "../../services/api";
import Loader from "../MatchesLoader/Loader";

function LikedUsers() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const [isLoading, setLoading] = useState(true);
  const [likedUsers, setLikedUsers] = useState([]);
const [isEmpty,setIsEmpty]=useState(false)

useEffect(() => {
  if (likedUsers) {
    setLoading(false);
  }
}, [likedUsers]);

const handleUnLikeProfile = async (item) => {
  const id = {
    User: item._id,
  };
  try {
    const { data } = await disLikeUserApi(id);
    console.log("i am unliking this user",data);
    dispatch(SetUserData(data));
    
  } catch (error) {
    console.log(error);
  }
};

const handleBlockUser = async (item) => {
  const id = {
      User: item._id,
    };
    try {
      const { data } = await blockUserApi(id);
      dispatch(SetUserData(data));
      
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    showAllLikedUsersApi().then((res) => {
      if(res.data.length>0){
        console.log("habibi iam here");
        setLikedUsers(res.data);
        console.log(likedUsers);
      }else{
        setTimeout(()=>{
          setIsEmpty(true)
        },500)
      }
      
    });
  }, [user]);
  
  return (
    <Grid container sx={{ minHeight: "84vh" }}>
    
        <Grid item xs={12} lg={11} container sx={{ minHeight: "39rem" }}>
          {likedUsers.length>0 ? (
            <RenderLikedUsersCard
              handleUnLikeProfile={handleUnLikeProfile}
              handleBlockUser={handleBlockUser}
              matches={likedUsers}
              user={user}
            />
          ) : (
            <Card
              variant="outlined"
              sx={{
                width: "100%",
                height: "34rem",
                marginTop:{ xs:"-80px",sm:"-20px",xl:"-35px"},
                borderRadius: 6,
                backdropFilter: "brightness(0.9) blur(15px)",
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                display: "flex",
                justifyContent: "center",
              }}
            >
             {isEmpty?(
   <Grid
   container
   sx={{ display: "flex", justifyContent: "center",alignContent:'center',height:'100%' }}
 >
   <Typography variant="overline" sx={{color:'grey',textAlign:'ce'}} >You liked No one so far</Typography>
 </Grid> 
             ):(
            <Loader user={user}/>
             )} 
            
            </Card>
          )}
        </Grid>
    
    </Grid>
  );
}

export default LikedUsers;
