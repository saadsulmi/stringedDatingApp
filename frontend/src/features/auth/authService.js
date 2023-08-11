import axios from 'axios'

const API_URL = '/api/'

const googleRegister= async (userData)=>{
    console.log(userData);
    const response = await axios.post(API_URL+'googleRegister',userData);
    return response.data
}

//user registration

const register = async (userData)=>{
    console.log(userData);
    const response  = await axios.post(API_URL,userData)
    return response.data
}
