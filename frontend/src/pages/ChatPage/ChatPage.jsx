import React from 'react';
import { Grid } from '@mui/material';
import Sidebar from '../../components/Sidebar/Sidebar';
import ChatContainer from '../../components/Chat/ChatContainer'
import Header from '../../components/Header/Header';

function ChatPage() {
  return (
    <Grid container spacing={12}>
    <Grid item xs={12}>
      <Header />
    </Grid>
    <Grid item xs sx={{display:{xs:'none',md:"block",lg:'block'}}}>
      <Sidebar />
    </Grid>
      <Grid item xs={12} sm={12} md={8} lg={8}>
       <ChatContainer/>
      </Grid>
    </Grid>
  )
}

export default ChatPage