import React from "react";
import { Modal, Box, Typography, Button, Grid, } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import {  useNavigate } from "react-router-dom";
import lottieanimation from '../../assets/lottie/animation_lmde1kvg.json'
import Lottie from "lottie-react";

function VIdeoCallModal({ open, close }) {
  const navigate = useNavigate()
  const onDeclineCall = () => {
    close();
  };

  return (
    <Modal open={open} >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left:{xs:'48%',xl:' "50%"'},
          transform: "translate(-50%, -50%)",
          bgcolor: "white",
          p: 10,
          borderRadius: 4,
          maxWidth: 500,
          textAlign: "center",
        }}
      >
       

        <Box > 
        <Grid
           container
            sx={{ display: "flex", justifyContent: "center",alignContent:'center',height:'100%' }}
        >
      <Grid>
          <Lottie style={{width:'200px'}} animationData={lottieanimation} loop={true}  />
      </Grid>
    </Grid> 
          <Typography variant="overline" color={'black'} textAlign="center">
            Inorder to use Videocall you must have  Premium Subscription
          </Typography>
          <Grid item mt={2} sx={{display:{xs:'flex',xl:''},justifyContent:{xs:'center',xl:''}}}>
          <Button
          variant="contained"
          sx={{width:'150px',marginRight:'15px',background:'yellowgreen',transition:'0.5s',
          '&:hover': {
            background: '#CBED27', // Change to the desired darker yellow color
          },
        }}
        onClick={()=>navigate('/Premium')}
          >
            Get Premium
          </Button>

          <Button
          color="error"
          variant="contained"
          sx={{width:'150px',marginTop:{xs:'',xl:'0'}}}
          onClick={onDeclineCall}
          >Not Now</Button>
          </Grid>
        </Box>
      </Box>
    </Modal>
  );
}

export default VIdeoCallModal;
