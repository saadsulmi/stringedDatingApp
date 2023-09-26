import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  Skeleton,
  TextField,
  Typography,
  TextareaAutosize,
} from "@mui/material";
import Slider from '@mui/material/Slider';
import dayjs from "dayjs";
import Chip from "@mui/joy/Chip";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AddIcon from "@mui/icons-material/Add";
import WineBar from "@mui/icons-material/WineBar";
import SmokingRoomsIcon from "@mui/icons-material/SmokingRooms";
import GenderIcon from "../Icons/GenderIcon";
import RelationIcon from "../Icons/RelationIcon";
import ReligionIcon from "../Icons/ReligionIcon";
import React, { useState } from "react";
import { deleteImageApi, fetchLocationApi } from "../../services/api";
import CloseIcon from "@mui/icons-material/Close";
import { validateDate } from "@mui/x-date-pickers/internals";
import { useSelector } from "react-redux";
function EditProfileCard({
  validateInputs,
  userData,
  setUserData,
  error,
  coverPicREF,
  profilePicREF,
  image0,
  image1,
  image2,
  openModal,
  handleSubmit,
  isLoading,
  loader,
  setLoader
}) {

  const [phoneCheck,setPhone]=useState(false);
  const [mailCheck,setMail]=useState(false);
  useState(()=>{
    if(userData.phone!=='null'){
      setPhone(true)
    }
    if(userData.email){
      setMail(true)
    }
  },[])
  const handleProfilePic = (e) => {
    if (e.target.files[0]) {
      setUserData((prev) => ({
        ...prev,
        profilePic: URL.createObjectURL(e.target.files[0]),
      }));
    }
  };
  const handleCoverPic = (e) => {
    if (e.target.files[0]) {
      setUserData((prev) => ({
        ...prev,
        coverPic: URL.createObjectURL(e.target.files[0]),
      }));
    }
  };
  const handleimage1 = (e) => {
    if (e.target.files[0]) {
      setUserData((prev) => ({
        ...prev,
        image0: URL.createObjectURL(e.target.files[0]),
      }));
    }
  };
  const handleimage2 = (e) => {
    if (e.target.files[0]) {
      setUserData((prev) => ({
        ...prev,
        image1: URL.createObjectURL(e.target.files[0]),
      }));
    }
  };
  const handleimage3 = (e) => {
    if (e.target.files[0]) {
      setUserData((prev) => ({
        ...prev,
        image2: URL.createObjectURL(e.target.files[0]),
      }));
    }
  };

const handleClick=()=>{
  if(validateInputs()){
      if (!loader) {
    setLoader(true);
    handleSubmit()
  }
  }
}

const handleDeleteImage=async(path)=>{
  const data={
    path:path
  }
  await deleteImageApi(data)
  }

  const locationSelector = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
         fetchLocationApi(latitude,longitude)
            .then((res) => res.json())
            .then((data) => {
              setUserData((prevState) => ({
                ...prevState,
                location: data.city + "," + data.principalSubdivision,
              }));
            });
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  
  const dateToAge = (data) => {
    const selectedDate = new Date(data.$d);
    const currentDate = new Date();

    const ageDiff = currentDate.getTime() - selectedDate.getTime();
    const ageDate = new Date(ageDiff);

    const calculatedAge = Math.abs(ageDate.getUTCFullYear() - 1970);
    setUserData((prevState) => ({
      ...prevState,
      birthday: data.$d,
      age: calculatedAge,
    }));
  };

  const user = useSelector(state=>state.user.user);
  return (
    <Card
      variant="outlined"
      sx={{
        my: { xs: 9, lg: 0 },
        borderRadius: 6,
        backdropFilter: "brightness(0.9) blur(15px)",
        backgroundColor: "rgba(255, 255, 255,1)",
      }}
    >
      <Box sx={{ width: "100%", height: "40vh", position: "relative" }}>
        <Box
          sx={{
            width: "100%",
            height: "100%",
            backgroundImage: `url(${userData.coverPic})`,
            bgcolor: "grey",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        >
          <Button
            component="label"
            hidden
            sx={{ width: "100%", height: "100%" }}
          >
            <input
              ref={coverPicREF}
              onChange={handleCoverPic}
              hidden
              accept="image/*"
              type="file"
            />
          </Button>
        </Box>
        <Box
          sx={{
            width: { xs: 200, lg: 280 },
            height: { xs: 200, lg: 280 },
            borderRadius: "1rem",
            border:"solid 0.3px white",
            position: "absolute",
            top: "100%",
            left: { sm: "20%", xl: "26%", lg: "13%"},
            transform: "translate(50%, -50%)",
            backgroundImage: `url(${userData.profilePic})`,
            bgcolor: "black",
            backgroundSize: "cover",
          }}
        >
          <Button
            component="label"
            hidden
            sx={{ width: "100%", height: "100%" }}
          >
            <input
              ref={profilePicREF}
              onChange={handleProfilePic}
              hidden
              accept="image/*"
              type="file"
            />
          </Button>
        </Box>
      </Box>

      <CardContent>
        <Grid container spacing={2} sx={{ mt: { xs: 12, lg: 20 } }}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Full Name"
              variant="outlined"
              value={userData.fullName}
              {...(error.fullName ? { error: true } : {})}
              fullWidth
              onChange={(e) =>
                setUserData((prevState) => ({
                  ...prevState,
                  fullName: e.target.value,
                }))
              }
            />
            {error.fullName && (
              <Typography sx={{ color: "red" }}>{error.fullName}</Typography>
            )}
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Email Address"
              variant="outlined"
              value={userData.email}
              {...(error.email ? { error: true } : {})}
              fullWidth
              disabled={mailCheck?'disable':''}
              onChange={(e) =>
                setUserData((prevState) => ({
                  ...prevState,
                  email: e.target.value,
                }))
              }
            />
            {error.email && (
              <Typography sx={{ color: "red" }}>{error.email}</Typography>
            )}
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              sx={{ mt: 1 }}
              label="Phone"
              variant="outlined"
              value={userData.phone}
              onChange={(e) => {
                const inputValue = e.target.value;
                  setUserData((prevState) => ({
                    ...prevState,
                    phone: inputValue,
                  }));
                
              }}
              disabled={phoneCheck?'disable':''}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  label="Birthday"
                  value={dayjs(userData.birthday)}
                  onChange={dateToAge}
                />
              </DemoContainer>
            </LocalizationProvider>
            {error.birthday && (
              <Typography sx={{ color: "red" }}>{error.birthday}</Typography>
            )}
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              sx={{ mt: 2, p: 1, color: "black", bgcolor: "transparent" }}
              color={error.location ? "error" : "inherit"}
              size="small"
              fullWidth
              onClick={locationSelector}
              variant="outlined"
              startIcon={<LocationOnIcon />}
            >
              {userData.location ? userData.location : "Location"}
            </Button>
            {error.location && (
              <Typography sx={{ color: "red" }}>{error.location}</Typography>
            )}
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="bio"
              label="Your Bio"
              multiline
              fullWidth
              {...(error.bio ? { error: true } : {})}
              rows={4}
              value={userData.bio}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, bio: e.target.value }))
              }
            />
              {error.bio && (
              <Typography sx={{ color: "red" }}>{error.bio}</Typography>
            )}
          </Grid>
                  {/* distance to filter */}
                  {user&&user.StringedVipType==='premium'||user.StringedVipType.length>0?(
                    <Grid container item xs={12} xl={12} justifyContent={"center"}>
                    <Grid item xs={12}>
                        <Typography
                                sx={{ marginTop:"20px", fontSize:"18px" }}
                              >
                                {userData.distance === 0 ? "Show Everyone" : `Show Strings Upto ${userData.distance} KM`} 
                        </Typography>
                      </Grid>
                      <Grid item xs={12} justifyContent={"center"}  >
                            <Box
                            sx={{
                              padding: { sm: '0', xl:"0 300px 0 300px"}
                            }} 
                            >
          
                                <Slider
                                  defaultValue={userData.distance}
                                  value={userData.distance}
                                  onChange={(e) =>
                                    setUserData((prev) => ({
                                      ...prev,
                                      distance : e.target.value,
                                    }))
                                  }
                                  step={10}
                                  valueLabelDisplay="auto"
                                />
          
                                </Box>
                      </Grid>
          
                    {/* age filteration */}
                    <Grid item xs={12} alignItems={"center"}>
                            <Typography
                               sx={{ marginTop:"20px", fontSize:"18px" }}
                            >
                              {userData.ageLimit[0] === 18 && userData.ageLimit[1]===99 ? `Show Strings with all Age group` : `Show strings with Age between ${userData.ageLimit[0]} and ${userData.ageLimit[1]}`} 
                            </Typography>
                            <Box sx={{ padding:{xs:"0",xl:"0 200px 0 200px"} }}>
                                <Slider
                                  getAriaLabel={() => 'Temperature range'}
                                  value={userData.ageLimit}
                                  onChange={(event, newValue) => {
                                    setUserData((prev) => ({
                                      ...prev,
                                      ageLimit : newValue,
                                    }))
                                  }}
                                  min={18}
                                  max={99}
                                  valueLabelDisplay="auto"
                                  disableSwap
                                />
                              </Box>
                      </Grid>
                  </Grid>
                  ):(
                    <Grid container item xs={12} xl={12} justifyContent={"center"}>
                    <Grid item xs={12}>
                        <Typography
                                sx={{ marginTop:"20px", fontSize:"18px" }}
                              >
                                Need premium account to filter by distance
                        </Typography>
                      </Grid>
                      <Grid item xs={12} justifyContent={"center"}  >
                            <Box
                            sx={{
                              padding: { sm: '0', xl:"0 300px 0 300px"}
                            }} 
                            >
          
                                <Slider
                                  defaultValue={userData.distance}
                                  value={userData.distance}
                                  onChange={(e) =>
                                    setUserData((prev) => ({
                                      ...prev,
                                      distance : e.target.value,
                                    }))
                                  }
                                  disabled
                                  step={10}
                                  valueLabelDisplay="auto"
                                />
          
                                </Box>
                      </Grid>
          
                    {/* age filteration */}
                    <Grid item xs={12} alignItems={"center"}>
                            <Typography
                               sx={{ marginTop:"20px", fontSize:"18px" }}
                            >
                              Need premium account to filter by Age
                            </Typography>
                            <Box sx={{ padding:{xs:"0",xl:"0 200px 0 200px"} }}>
                                <Slider
                                  getAriaLabel={() => 'Temperature range'}
                                  value={userData.ageLimit}
                                  onChange={(event, newValue) => {
                                    setUserData((prev) => ({
                                      ...prev,
                                      ageLimit : newValue,
                                    }))
                                  }}
                                  min={18}
                                  max={99}
                                  valueLabelDisplay="auto"
                                  disabled
                                  disableSwap
                                />
                              </Box>
                      </Grid>
                  </Grid>
                  )}
        


          <Grid
            item
            xs={12}
            lg
            sx={{
              my: 3,
              display: { xs: "flex", lg: "flex" },
              flexDirection: { xs: "column", lg: "row" },
              justifyContent: "space-between",
            }}
          >
           
            <Grid container item xl={12} justifyContent={"center"}>
            <Chip
              onClick={() => openModal("gender")}
              startDecorator={<GenderIcon />}
              color="neutral"
              size="lg"
              sx={{ m: 1 }}
              variant="soft"
            >
              {isLoading ? <Skeleton /> : userData.gender}
            </Chip>
            <Chip
              sx={{ m: 1 }}
              onClick={() => openModal("faith")}
              startDecorator={<ReligionIcon />}
              color="neutral"
              size="lg"
              variant="soft"
            >
              {isLoading ? <Skeleton /> : userData.faith}
            </Chip>
            <Chip
              sx={{ m: 1 }}
              onClick={() => openModal("realationshipStatus")}
              startDecorator={<RelationIcon />}
              color="neutral"
              size="lg"
              variant="soft"
            >
              {isLoading ? <Skeleton /> : userData.realationshipStatus}
            </Chip>
            <Chip
              sx={{ m: 1 }}
              onClick={() => openModal("smoking")}
              startDecorator={<SmokingRoomsIcon />}
              color="neutral"
              size="lg"
              variant="soft"
            >
              {isLoading ? <Skeleton /> : userData.smoking}
            </Chip>
            <Chip
              sx={{ m: 1 }}
              onClick={() => openModal("drinking")}
              startDecorator={<WineBar />}
              color="neutral"
              size="lg"
              variant="soft"
            >
              {isLoading ? <Skeleton /> : userData.drinking}
            </Chip>

            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "end",
              alignContent: "end",
              alignItems: "end",
            }}
          >
            <Grid container item xl={12} justifyContent={"center"}>


            <Card
              sx={{
                mr: 2,
                mt:2,
                width: { xs: 300, sm: 200, lg: 300 },
                height: { xs: 300, sm: 200, lg: 300 },
                backgroundImage: `url(${userData.image0})`,
                bgcolor: "lightgray",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
                alignItems: "center",
                position: "relative",
              }}
            > 
            {userData.image0&& <IconButton
            sx={{
              position: "absolute",
              top: 5,
              right: 5,
              color: "black",
              backgroundColor: "white",
              zIndex: 1,
            }}
            size="small"
          onClick={() => {
           handleDeleteImage(userData.image0)
            setUserData((prev) => ({
              ...prev,
              image0: "", // Set the image field to an empty string to clear it
            }));
          }}
        ><CloseIcon /></IconButton>
              }
                <Button
                  component="label"
                  hidden
                  sx={{ width: "100%", height: "100%" }}
                >
                  <input
                    ref={image0}
                    hidden
                    accept="image/*"
                    type="file"
                    onChange={(e) => handleimage1(e)}
                  />
                  {userData.image0 ? "" : <AddIcon sx={{ color: "black" }} />}
                </Button>
           
            </Card>

            <Card
              sx={{
                mr: 2,
                mt:2,
                width: { xs: 300, sm: 200, lg: 300 },
                height: { xs: 300, sm: 200, lg: 300 },
                backgroundImage: `url(${userData.image1})`,
                bgcolor: "lightgray",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
                alignItems: "center",
                position: "relative",
              }}
            > 
            {userData.image1&& <IconButton
            sx={{
              position: "absolute",
              top: 5,
              right: 5,
              color: "black",
              backgroundColor: "white",
              zIndex: 1,
            }}
            size="small"
          onClick={() => {
           handleDeleteImage(userData.image1)
            setUserData((prev) => ({
              ...prev,
              image1: "", // Set the image field to an empty string to clear it
            }));
          }}
        ><CloseIcon /></IconButton>
              }
                <Button
                  component="label"
                  hidden
                  sx={{ width: "100%", height: "100%" }}
                >
                  <input
                    ref={image1}
                    hidden
                    accept="image/*"
                    type="file"
                    onChange={(e) => handleimage2(e)}
                  />
                  {userData.image1 ? "" : <AddIcon sx={{ color: "black" }} />}
                </Button>
           
            </Card>

            <Card
              sx={{
                mr: 2,
                mt:2,
                width: { xs: 300, sm: 200, lg: 300 },
                height: { xs: 300, sm: 200, lg: 300 },
                backgroundImage: `url(${userData.image2})`,
                bgcolor: "lightgray",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
                alignItems: "center",
                position: "relative",
              }}
            > 
            {userData.image2&& <IconButton
            sx={{
              position: "absolute",
              top: 5,
              right: 5,
              color: "black",
              backgroundColor: "white",
              zIndex: 1,
            }}
            size="small"
          onClick={() => {
           handleDeleteImage(userData.image2)
            setUserData((prev) => ({
              ...prev,
              image2: "", // Set the image field to an empty string to clear it
            }));
          }}
        ><CloseIcon /></IconButton>
              }
                <Button
                  component="label"
                  hidden
                  sx={{ width: "100%", height: "100%" }}
                >
                  <input
                    ref={image2}
                    hidden
                    accept="image/*"
                    type="file"
                    onChange={(e) => handleimage3(e)}
                  />
                  {userData.image2 ? "" : <AddIcon sx={{ color: "black" }} />}
                </Button>
           
            </Card>
            </Grid>
          </Grid>
          <Grid item sx={{display:'flex',justifyContent:'center',alignContent:'center',alignItems:'center',mt:4}} xs={12}>
            <Button  variant="contained" color="warning" onClick={handleClick}>
              {loader?(
                <>
                Loading...
                </>
              ):(
                <>
                Save Changes
                </>
              )}
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default EditProfileCard;
