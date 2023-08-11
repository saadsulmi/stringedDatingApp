import axios from 'axios'

const headers ={
    headers : {
        "auth-token" : JSON.parse(localStorage.getItem("authorization.user"))
    }
}

const formDataHeaders = {
    headers :{
        "auth-token" : JSON.parse(localStorage.getItem("authorization.user")),
        "content-type": "multipart/formdata"
    }
}

export const phoneNumberAPI = (data)=> axios.post("/phone",data);

export const OTP_API = (data) => axios.post("/verifyOtp", data);

export const googleLoginAPI = (data) => axios.post("/googleLogin", data);

export const createAccountAPI = (userData) => axios.post("/createAccount", userData,formDataHeaders);

export const userDataApi = () => axios.get("/userData", headers);