import React from 'react';
import { Grid } from '@mui/material';
import Sidebar from '../../components/Sidebar/Sidebar';
import InterestedUsers from '../../components/InterestedUsers/InterestedUsers';

import Header from '../../components/Header/Header';

function InterestedPage() {
  return (
        <Grid container spacing={12}>
        <Grid item xs={12}>
          <Header />
        </Grid>
        <Grid item xs sx={{display:{xs:'none',md:"block",lg:'block'}}}>
          <Sidebar />
        </Grid>
          <Grid item xs={12} sm={12} md={8} lg={8}>
           <InterestedUsers/>
          </Grid>
        </Grid>
  )
}

export default InterestedPage
