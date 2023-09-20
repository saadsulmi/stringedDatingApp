import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Card, CardContent, Grid } from "@mui/material";
import {
  PaymentSuccessApi,
  premiumSubscriptionApi,
} from "../../services/api";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { SetUserData } from "../../features/users/UserReducer";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { style } from "@mui/system";

const SubscriptionDetails = () => {
  let query = new URLSearchParams(window.location.search);
  const user = useSelector((state) => state.user.user);
  const [load, setLoad] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!load && user) {
      setLoad(true);
      if (query.get("pack")) {
        const pack = query.get("pack");
        PaymentSuccessApi({ pack: pack })
          .then((res) => {
            dispatch(SetUserData(res.data));
            navigate("/premium");
          })
          .catch(() => {
            setLoad(false);
          });
      }
    }
  }, [user]);


  const handlePremium = async () => {
    try {
      const data = {
        email: user.email,
      };
      premiumSubscriptionApi(data)
        .then((res) => {
          window.location.href = res.data.url;
        })
        .catch((error) => {
          console.error("Error occurred during API call:", error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const gradientBorder = {
    border: 'solid 2px',
    backgroundImage: 'linear-gradient(90deg, #1C1C1C 0%, #FCC201 100%)',
    borderRadius: '10px',
  }

  const styles = {
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    width: '400px',
    height: '500px',
    background: 'rgba(0,0,0,0.9)', // Vertical gradient
    borderRadius: '10px',
    transition: 'background 5s ease', // Adjust transition duration and easing function
    
  }

  return (
    <Grid
      item
      xs={11.9}
      lg={11}
      container
      sx={{ mb: 10, position: "relative" }}
    >
      <Card
        className="CardItems"
        variant="outlined"
        sx={{
          width: "100%",
          minHeight: "70vh",
          borderRadius: 6,
          backdropFilter: "brightness(0.9) blur(15px)",
          backgroundColor: "rgba(255, 255, 255,1)",
        }}
      >
        <CardContent sx={{display:'flex',justifyContent:'center'}} >
          <Grid container sx={styles}>
            {/* this is the backgroun */}
            <Grid item container sx={{width: '320px', height: '450px',borderRadius:'10px', border:'solid 1px #FCC201', }}>
            <Grid
              item
              xs={12}
              sx={{
                mt: 1,
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              <Typography
                variant="overline"
                noWrap
                mt={5}
                sx={{
                  fontSize:'20px',
                  display: { xs: "flex", md: "flex" },
                  letterSpacing: ".2rem",
                  color: "white",
                  textDecoration: "none",
                }}
              >
                Stringed Premium
              </Typography>
            </Grid>
            <Grid item xs={12} xl={12} sx={{marginTop:{xs:'-20px',xl:'-30px'}, padding:'20px'}}>
             <Typography
                variant="subtitle2"
                sx={{ color: "grey",letterSpacing:'0.2rem' }}
              >
                  Video Call : Premium subscribers can initiate video calls with Matched users
                  Advanced Filter Functionality : Premium subscribers can enjoy advanced filter capabilities. They can filter users based on criteria such as Age and Location
              </Typography> 
              {user?.StringedVipType?.includes("premium") ||
              user?.StringedVipType.includes("premium") ? (
                <Button
                sx={{marginTop:'50px'}}
                  variant="outlined"
                  large
                  fullWidth
                >
                  You have Premium Access
                </Button>
              ) : (
                <Button
                  variant="outlined"
                  color="inherit"
                  large
                  fullWidth
                  onClick={handlePremium}
                  sx={{
                    backgroundColor: "goldenrod",
                    marginTop:'50px',
                    color: "black",
                    "&:hover": {
                      backgroundColor: "black",
                      color: "goldenrod",
                    },
                  }}
                >
                  Access Premium for just Rs 500
                </Button>
              )}
             </Grid>
      
            </Grid>
            
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default SubscriptionDetails;
