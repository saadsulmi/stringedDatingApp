import React from 'react';
import { Grid } from '@mui/material';
import Sidebar from '../../components/Sidebar/Sidebar';
import MatchSide from '../../components/Matches/MatchSide';
import Header from '../../components/Header/Header';

function MatchesPage() {
  return (
    <Grid container spacing={12}>
    <Grid item xs={12}>
      <Header />
    </Grid>
    <Grid item xs sx={{display:{xs:'none',md:"block",lg:'block'}}}>
      <Sidebar />
    </Grid>
      <Grid item xs={12} sm={12} md={8} lg={8}>
       <MatchSide/>
      </Grid>
    </Grid>
  )
}

export default MatchesPage