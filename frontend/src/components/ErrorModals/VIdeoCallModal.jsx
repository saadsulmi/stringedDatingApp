import React from "react";
import { Modal, Box, Typography, Button, Grid, } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from "react-router-dom";
import lottieanimation from '../../assets/lottie/animation_lmde1kvg.json'
import Lottie from "lottie-react";

function VIdeoCallModal({ open, close }) {

  const onDeclineCall = () => {
    close();
  };

  return (
    <Modal open={open} >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "white",
          p: 10,
          borderRadius: 4,
          maxWidth: 500,
          textAlign: "center",
        }}
      >
        <Button
          sx={{ position: "absolute", top: 8, right: 8 }}
          color="inherit"
          onClick={onDeclineCall}
        >
          <CloseIcon fontSize="large" />
        </Button>

        <Box onClick={onDeclineCall}> 
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
        </Box>
      </Box>
    </Modal>
  );
}

export default VIdeoCallModal;
