import React from 'react';
import { Grid } from '@mui/material';
import Sidebar from '../../components/Sidebar/Sidebar';
import Discover from '../../components/Discover/DiscoverSide';
import Header from '../../components/Header/Header';

function HomePage() {

  return (
    <Grid container spacing={12} >
      <Grid item xs={12} >
        <Header/>
      </Grid>
      <Grid item xs sx={{display:{xs:'none',md:"block",lg:'block'}}}>
        <Sidebar />
      </Grid>
        <Grid item xs={12} sm={12} md={8} lg={8}>
          <Discover />
        </Grid>
      </Grid>
  );
}

export default HomePage;
