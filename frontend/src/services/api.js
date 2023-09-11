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

export const OTP_API = (data) => axios.post("/api/verifyOtp", data);

export const googleLoginAPI = (data) => axios.post("/api/googleLogin", data);

export const createAccountAPI = (userData) => axios.post("/api/createAccount", userData,formDataHeaders);

export const userDataApi = () => axios.get("/api/userData", headers);

export const DiscoverUsersApi = () => axios.get("/api/discover", headers);

export const likeUserApi = (data) => axios.put("/api/likeUser", data, headers);

export const disLikeUserApi = (data) => axios.put("/api/dislikeUser", data, headers);

export const fetchLocationApi = (latitude, longitude) => {
    const geoApiUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`;
   return fetch(geoApiUrl);
  };

export const deleteImageApi=(data)=>axios.patch('/api/deleteImage',data,headers)

export const editUserDataApi = (formData) => axios.patch("/api/userEdit", formData, formDataHeaders);

export const ReadMsgsApi = (data) => axios.post("/api/chat/markRead", data, headers);

export const addNewMSgApi = (data) => axios.post("/api/chat/addmsg", data, headers);

export const getAllmsgsApi = (data) => axios.post("/api/chat/getmsg", data, headers);

export const getLastMsgsApi = (data) => axios.post("/api/chat/lastmsg", data, headers);

export const blockUserApi = (data) => axios.put("/api/blockUser", data, headers);

export const ShowMatchesApi = () => axios.get("/api/matches", headers);

export const showAllLikedUsersApi = () => axios.get("/api/allLikedUsers", headers);

export const showAllInterestedUsersApi = () => axios.get("/api/allInterestedUsers", headers);

export const premiumSubscriptionApi = (data) => axios.post("/api/payment/premium", data, headers);

export const PaymentSuccessApi = (data) => axios.post("/api/paymentVerified", data, headers);