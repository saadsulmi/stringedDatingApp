import { Card, CardContent, Grid, Typography, Button } from "@mui/material";
import React, { useEffect } from "react";
import Card1 from "@mui/joy/Card";
import CardCover from "@mui/joy/CardCover";
import CardContent1 from "@mui/joy/CardContent";
import KeepMountedModal from "../Modal/KeepMountedModal";
import { useState } from "react";
import TextField from '@mui/material/TextField';

function RenderMatchCard({ matches, isLoading }) {
  const [open, setOpen] = React.useState(false);
  const [user, setUser] = useState(null);

  const usersPerPage = 6;

  const [searchName, setSearchName] = useState('');
  const [foundUsers, setFoundUsers] = useState([]);
  const [matchedUsers,setmatchedUsers]=useState([])
  const [currentPage, setCurrentPage] = useState(1);

  
  useEffect(()=>{
    if(searchName==''){
      setCurrentPage(1);
      setmatchedUsers([...matches])
    }else{
      const filteredUsers = matches.filter((user) =>
      user.fullName&&user.fullName.toLowerCase().includes(searchName.toLowerCase())
      );
      setCurrentPage(1);
      setmatchedUsers([...filteredUsers])
    }
  },[searchName])
  
  const totalPages = Math.ceil(matchedUsers.length / usersPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

    // Calculate the index range for the current page
    const startIndex = (currentPage - 1) * usersPerPage;
    const endIndex = startIndex + usersPerPage;
  
    const paginatedUsers = matchedUsers.slice(startIndex, endIndex);

  const handleViewProfile = (item) => {
    setOpen(true);
    setUser(item);
  };

  return (
    <>
     <Grid item xs={2} sm={0}>

</Grid>
<Grid item xs={12} sm={8.2} md={12} lg={12} sx={{ my: 0 }}>
        <Card
          className="CardItems"
          variant="outlined"
          sx={{
            height: '38rem',
            marginTop:"-115px",
            mb: 0,
            borderRadius: 3,
            backdropFilter: "brightness(0.9) blur(15px)",
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            overflow: "hidden",
          }}
        >
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

            {matches.length>0&&(<TextField
              size="small"
              sx={{width:{xs:'300px',md:'500px',xl:'700px'},zIndex:'999',background:'white',borderRadius:'5px'}}
              label="Search by name"
              variant="filled"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
            />)}


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
              height: "100%",
              overflowX:'unset',
            }}
            component={Grid}
            spacing={2}
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
                  sx={{ my: 1,mx:{md:2,lg:0} }}
                >
                  <Card1
                    sx={{
                      width: { xs: '90%', sm: 450, md: 270, lg: 230 },
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
                    <CardContent1
                      sx={{ justifyContent: "flex-end", color: "white" }}
                    >
                      <Typography level="h2" fontSize="lg" mb={1}>
                        {item.fullName}
                      </Typography>
                      <Button
                        sx={{ m: 1 }}
                        color="warning"
                        variant="outlined"
                        onClick={() => handleViewProfile(item)}
                      >
                        View Profile
                      </Button>
                    </CardContent1>
                  </Card1>
                  <KeepMountedModal
                    user={user}
                    setUser={setUser}
                    open={open}
                    setOpen={setOpen}
                    isLoading={isLoading}
                  />
                </Grid>
              );
            })}
          </CardContent>
        </Card>
      </Grid>
    </>
  );
}

export default RenderMatchCard;
