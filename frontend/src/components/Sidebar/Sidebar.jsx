import * as React from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Typography } from "@mui/material";
import {getNotification} from '../../services/api'
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
export default function Sidebar() {

  const user = useSelector(state=>state.user.user)
  const [notification,setNotification]= useState(false)
  console.log("this is my notification",notification);

  useEffect(()=>{
    getNotification()
    .then((res)=>{
      setNotification(res.data)
    }).catch(err=>console.log(err))
  },[])

  useEffect(() => {
    let intervalId; // Variable to store the interval ID
  
    // Define the function to fetch notifications and update state
    const fetchNotifications = () => {
      getNotification()
        .then((res) => {
          setNotification(res.data);
        })
        .catch((err) => console.log(err));
    };
  
    if (!notification) {
      intervalId = setInterval(fetchNotifications, 5000);
    }
  
    // Clear the interval when the component unmounts or when notification changes
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [notification]);
  


  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      backgroundColor: "",
      left: 5,
      color: "yellow",
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      "&::after": {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        borderRadius: "50%",
        animation: "ripple 1.2s infinite ease-in-out",
        border: "1px solid currentColor",
        content: '""',
      },
    },
    "@keyframes ripple": {
      "0%": {
        transform: "scale(1)",
        opacity: 1,
      },
      "100%": {
        transform: "scale(3)",
        opacity: 0,
      },
    },
  }));

  const navigate=useNavigate()

  const navItems=[
    "Discover",
    "Match Request",
    "LikedUsers",
    "Matches",
    "Chat",
    "Premium"
  ]
  return (
    <>
      <Grid
        container
        justifyContent="start"
        alignItems="center"
        sx={{ mt:4 }}
      >
        <Grid item xs={12} marginLeft={3} >
        <Card
      sx={{
        borderRadius: 6,
        backdropFilter: 'brightness(0.9) blur(15px)',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
      }}
    >
      <CardContent>
        <List component="nav">
          {navItems.map(item=>{
            return(
                  <ListItem key={item}>
                      <Button  component="a" onClick={()=>{
                        {item==='Match Request'?setNotification(false):''}
                        navigate(`/${item==='Match Request'?'Request':item}`)}} fullWidth>
                        <Typography  sx={{ color: 'white', letterSpacing: '3px' }} >{item}</Typography>
                      {notification&&item==='Match Request'?(
                      <StyledBadge
                      
                          overlap="circular"
                          anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "right",
                          }}
                          sx={{ mr: 2 }}
                          variant="dot"
                        >
                        </StyledBadge>):('')}
                        <ListItemText />
                      </Button>
                  </ListItem>
                  )
          })
          }
        </List>
      </CardContent>
    </Card>
        </Grid>
      </Grid>
    </>
  );
}
