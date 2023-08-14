import * as React from 'react';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import { Grid, Skeleton } from "@mui/material";
import { Typography,Button } from "@mui/material";
import ImageContent from "../Discover/ImageContent";
import ChipsContent from "../Discover/ChipsContent";
import { ModalOverflow } from '@mui/joy';
export default function KeepMountedModal({user,setUser,open,setOpen,isLoading}) {
  const handleClose=()=>{
    setUser(null)
    setOpen(false)
  }
  return (
    <React.Fragment>
      <Modal keepMounted open={open} onClose={handleClose } >
        <ModalOverflow>

        <ModalDialog
        sx={
          {
            maxWidth:'50rem',
            maxHeight:'20rem',
            borderRadius: "2rem",
            backgroundColor:"rgba(0,0,0,0.8)"
          }
        }
          aria-labelledby="keep-mounted-modal-title"
          aria-describedby="keep-mounted-modal-description"
        >
         <Box  sx={{ width: "100%", height: "15rem", position: "relative" }}>
              <Box
                sx={{ objectFit: "cover",borderRadius: "2rem", width: "100%", height: "100%" }}
                component="img"
                src={user?.coverPic ? user?.coverPic : "/cover-picture.png"}
                loading="lazy"
              />
              <Box
                sx={{
                  objectFit: "cover",
                  width: {xs:150,lg:200},
                  height: {xs:150,lg:200},
                  borderRadius: "10rem",
                  position: "absolute",
                  top: "100%",
                  left: { xs: "14%",sm:'28%', lg: "25%" },
                  transform: "translate(50%, -50%)",
                }}
                loading="lazy"
                component="img"
                src={user?.profilePic ? user?.profilePic : "/avatar.jpg"}
              />
            </Box>
              <Grid container justifyContent={'center'} item xs={12}>
                <Grid item xs={3} lg={3}/>
                <Grid item xs={8} lg={5} sx={{ mt: { xs: 10, lg: 15, xl: 9 } }}>
                
                
                <Grid container item direction={'row'} xs={12}  alignItems={'center'}>
                <Typography
                    sx={{
                      mt:{lg:5},
                      color:"white",
                      fontFamily: "sans-serif",
                      fontSize: { sm: "1.5rem",md:'2rem' },
                      marginLeft:{lg:'0rem',sm:"3.5rem"},
                      fontWeight: "bold",
                    }}
                  >
                    { user?.fullName}
                   
                  </Typography>
                  <Typography sx={{
                      marginLeft:"1rem",
                      mt:{lg:5},
                      color:"white",
                      fontFamily: "sans-serif",
                      fontSize: { sm: "1.5rem",md:'' },
                      fontWeight: "bold",
                    }}  variant="caption">{user?.age}</Typography>
                </Grid>





                 <Grid item direction={'row'} justifyContent={'center'} xs={12} xl={12}>
                      <Typography
                        sx={{
                          color:"white",
                          fontFamily: "sans-serif",
                          fontSize: { sm: "0.9rem",md:'1rem' },
                          marginLeft:{lg:"4.5rem",sm:"7.5rem"}
                        }} 
                        variant="subtitle2"
                      >
                        { user?.location}
                      </Typography>
                 <Typography
                    sx={{
                      mt:{lg:3},
                      
                      color:"white",
                      fontFamily: "sans-serif",
                      fontSize: { sm: "0.8rem",md:'1rem' },
                      marginLeft:{lg:"0rem",sm:"3.5rem"}
                    }} 
                    variant="subtitle2"
                  >
                    { user?.bio}
                  </Typography>
                 </Grid>
              </Grid>
                  <Grid
                    item
                    xs={8}
                    lg={8}
                container
                spacing={2}
                sx={{my:3}}
                  >
                   <ChipsContent isLoading={isLoading} user={user}/>
                  </Grid>
           <ImageContent user={user}/>
              </Grid>
          
        </ModalDialog>
        </ModalOverflow>
      </Modal>
    </React.Fragment>
  );
}