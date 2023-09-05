import React, { useEffect, useState } from "react";
import { MuiTelInput, matchIsValidTel } from "mui-tel-input";
import { Typography, Grid } from "@mui/material";
import "@fontsource/Roboto";

const Phone = ({ changePhone,error,setError }) => {
  const [value, setValue] = React.useState("");
  
  useEffect(() => {
    if(value){
       if (matchIsValidTel(value)) {
      setError(false)
      addPhone();
    }
    }
  }, [value]);

  const handleChange = (newValue) => {
    console.log(newValue);
    setValue(newValue);
  };

  const addPhone = () => {
    changePhone(value);
  };

  return (
    <>

        <Grid container direction={"column"} justifyContent="center" spacing={2}>
        

            <Typography
            variant="h5"
            sx={{
                textAlign: "center",
                mb: { xs: 2, sm: 0, xl:2 },
                fontFamily: "Roboto",
                fontWeight: 800,
                color: "inherit",
                textDecoration: "none",
            }}
            > Enter Your Phone Number </Typography>

            <Typography sx={{ textAlign: "center", mb: 4 }}> We will send an OTP to this phone number </Typography>

           <Grid textAlign={"center"}>

           <MuiTelInput
            defaultCountry="IN"
            variant="standard"
            value={value}
            required
            onChange={handleChange}
            />

           </Grid>
        </Grid>
    </>
  );
};

export default Phone;
