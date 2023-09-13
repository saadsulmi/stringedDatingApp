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
export default function Sidebar() {
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
            <Button  component="a" onClick={()=>navigate(`/${item==='Match Request'?'Request':item}`)} fullWidth>
              <Typography  sx={{ color: 'white', letterSpacing: '3px' }} >{item}</Typography>
              <ListItemText />
            </Button>
          </ListItem>
            )
          })}
        </List>
      </CardContent>
    </Card>
        </Grid>
      </Grid>
    </>
  );
}
