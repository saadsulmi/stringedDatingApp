import { Card, CardContent, Grid, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import React, { useEffect, useState } from "react";
import Card1 from "@mui/joy/Card";
import CardCover from "@mui/joy/CardCover";
import CardContent1 from "@mui/joy/CardContent";
import KeepMountedModal from "../Modal/KeepMountedModal";
import { AiFillHeart } from "react-icons/ai";
import { FaHeartBroken } from "react-icons/fa";
import TextField from '@mui/material/TextField';


function RenderInterestedUsers({
  handleUnLikeProfile,
  handleBlockUser,
  handleLikeProfile,
  matches,
  isLoading,
  user,
}) {
  const [searchName, setSearchName] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [interestedUsers, setInterestedUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState(null);
  
  // Define the number of users to display per page
  const usersPerPage = 6;
  
  const handleViewProfile = (item) => {
    setOpen(true);
    setUsers(item);
  };

  useEffect(() => {
    if (searchName === '') {
      setCurrentPage(1);
      setInterestedUsers([...matches]);
    } else {
      const filteredUsers = matches.filter(
        (user) =>
          user.fullName &&
          user.fullName.toLowerCase().includes(searchName.toLowerCase())
      );
      setCurrentPage(1);
      setInterestedUsers([...filteredUsers]);
    }
  }, [searchName, user, matches]);

  // Calculate the total number of pages
  const totalPages = Math.ceil(interestedUsers.length / usersPerPage);

  // Function to handle page navigation
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Calculate the index range for the current page
  const startIndex = (currentPage - 1) * usersPerPage;
  const endIndex = startIndex + usersPerPage;

  const paginatedUsers = interestedUsers.slice(startIndex, endIndex);

  const search={
    height: "36rem",
    marginTop:{ xs:"-80px",sm:"-20px",xl:"-115px"},
    paddingBottom:"60px",
    borderRadius: 3,
    backdropFilter: "brightness(0.9) blur(15px)",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    overflow: "hidden",
  }

  return (
    <>
      <Grid item xs={1} sm={0}></Grid>
      <Grid item sm={8.2} lg={12} sx={{ my: -6 }}>
        <Card className="CardItems" variant="outlined" sx={search}>
          <Grid item mt={2} xl={12} display={'flex'} justifyContent={'center'} alignItems={'center'}>
          <Grid item  sx={{
                  minWidth:"80px",
                  display:'flex',
                  justifyContent:'center'
                 }}>
            {totalPages > 1&&currentPage > 1 && (
                <Button onClick={() => handlePageChange(currentPage - 1)} 
                variant="contained" 
                color="warning"
                size="small"
                >
                  Prev
                </Button>
              )}
            </Grid>
            {matches.length > 0 && (
              <TextField
                size="small"
                sx={{
                  width: { xs: '300px', md: '500px', xl: '700px' },
                  zIndex: '999',
                  background: 'white',
                  borderRadius: '5px',
                }}
                label="Search by name"
                variant="filled"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
              />
            )}
            
            <Grid item sx={{
              minWidth:"80px"
             }}>
             {totalPages > 1&&currentPage < totalPages && (
                <Button onClick={() => handlePageChange(currentPage + 1)} 
                variant="contained" 
                color="warning"
                size="small"
                >
                  next
                </Button>
              )}
            </Grid>


          </Grid>
          <CardContent
            sx={{
              height: '100%',
              overflowY: {xs:"scroll",md:"unset"},
              "&::-webkit-scrollbar": {
                width: "7px",
              },
              "&::-webkit-scrollbar-track": {
                background: "transparent",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "darkgrey",
                borderRadius: "2rem",
              },
              "&::-webkit-scrollbar-thumb:hover": {
                backgroundColor: "grey",
                borderRadius: "2rem",
              },
            }}
            component={Grid}
            spacing={{}}
            container
          >
            {paginatedUsers?.map((item) => {
              return (
                <Grid
                  key={item._id}
                  item
                  xs={12}
                  md={5}
                  lg={5}
                  xl={4}
                  sx={{ my: 1, mx: { md: 2, lg: 0 } }}
                >
                 <Card1
  sx={{
    width: { xs: '95%', sm: 450, md: 300, lg: 230 },
    height: { xs: 500, sm: 500, md: 230, lg: 230 },
  }}
>
  <CardCover>
    <img src={item.profilePic} loading="lazy" alt="" />
  </CardCover>
  <CardCover
    sx={{
      background:
        "linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 200px), linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0) 300px)",
    }}
  />
  <CardContent1 sx={{ justifyContent: "flex-end", color: "white" }}>
    <Grid item xl={12} marginTop={12}>
      <Typography level="h2" fontSize="lg" mb={1} onClick={() => handleViewProfile(item)}>
        {item.fullName}
      </Typography>
      <Button
        sx={{ backgroundColor: "rgba(0, 120, 200,  0.3)", width: { xs: '150px', xl: "90px" }, mx: 1 }}
        color="info"
        variant="contained"
        onClick={() => handleLikeProfile(item)}
      >
        Match
      </Button>
      <Button
        sx={{ backgroundColor: "rgba(200, 100, 0,  0.3)", width: { xs: '150px', xl: "90px" }, mx: 1 }}
        color="error"
        variant="contained"
        onClick={() => handleUnLikeProfile(item)}
      >
        Reject
      </Button>
    </Grid>
    <Button
      sx={{ m: 1 }}
      color={
        user.blockedUsers.includes(item._id)
          ? "success"
          : "error"
      }
      variant="outlined"
      onClick={() => handleBlockUser(item)}
    >
      {user.blockedUsers.includes(item._id)
        ? "UnBlock"
        : "Block"}
    </Button>
  </CardContent1>
</Card1>
                </Grid>
              );
            })}
          </CardContent>
        </Card>
      </Grid>
    </>
  );
}

export default RenderInterestedUsers;
