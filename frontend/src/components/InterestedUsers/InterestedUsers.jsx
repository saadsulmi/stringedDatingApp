import * as React from "react";
import { Grid, Skeleton, Typography, Card } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import RenderInterestedUsers from "./RenderInterestedUsers";
import { SetUserData } from "../../features/users/UserReducer";
import { disLikeUserApi, likeUserApi, showAllInterestedUsersApi,readNotification,searchRequestedUserApi } from "../../services/api";
import Loader from "../MatchesLoader/Loader";


function InterestedUsers() {
  
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const [isLoading, setLoading] = useState(true);
  const [interestedUser, setInterestedUsers] = useState([]);
  const [isEmpty,setIsEmpty]=useState(false)
  
    useEffect(() => {
      showAllInterestedUsersApi().then((res) => {
      if(res.data.length>0){
        setInterestedUsers(res.data);
        if(user)readNotification({userID:user.id})
      }else{
        setTimeout(()=>{
          setIsEmpty(true)
        },500)
      }
      
    })
    
  },[user]);
  
  useEffect(()=>{
    if(user)readNotification({userID:user.id});
  },[])
  
    useEffect(() => {
      if (interestedUser) {
        setLoading(false);
      }
    }, [interestedUser]);
  
    const handleUnLikeProfile = async (item) => {
      const id = {
        User: item._id,
      };
      try {
        const { data } = await disLikeUserApi(id);
        dispatch(SetUserData(data));
        
      } catch (error) {
        console.log(error);
      }
    };


    //new implementation of like
    const handleLikeProfile= async(item)=>{
        const id={
            User:item._id,
        }
        try{
            const {data} = await likeUserApi(id);
            dispatch(SetUserData(data));
        }catch(error){
            console.log(error);
        }
    }
  



  
    return (
      <Grid container sx={{ minHeight: "84vh" }}>
        
          <Grid item xs={12} lg={11} container sx={{ minHeight: "39rem" }}>


            {interestedUser.length>0 ? (
              <RenderInterestedUsers
                handleUnLikeProfile={handleUnLikeProfile}
                handleLikeProfile={handleLikeProfile}
                matches={interestedUser}
                isLoading={isLoading}
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
    <Typography variant="overline" sx={{color:'grey',textAlign:'ce'}}>No one Interested in you so far</Typography>
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

export default InterestedUsers
