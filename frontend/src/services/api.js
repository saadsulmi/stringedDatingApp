import axios from './Axios'

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

export const phoneNumberAPI = (data)=> axios.post("/api/phone",data);

export const OTP_API = (data) => axios.post("/api//verifyOtp", data);

export const googleLoginAPI = (data) => axios.post("/api//googleLogin", data);

export const createAccountAPI = (userData) => axios.post("/api/createAccount", userData,formDataHeaders);

export const userDataApi = () => axios.get("/api//userData", headers);