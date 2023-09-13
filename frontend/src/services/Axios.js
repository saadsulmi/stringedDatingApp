import axios from "axios";

//NODE_ENV='development'
//NODE_ENV='production'

// if production baseurl: https://stringed.live/
// if development baseurl: http://localhost:8000/

const URL=import.meta.env.VITE_NODE_ENV==='production'? import.meta.env.VITE_SERVER_URL:import.meta.env.VITE_LOCAL_SERVER_URL;

const instance = axios.create({
  baseURL:URL,
  headers: {
    'Content-Type': 'application/json',
  }
});

export default instance;