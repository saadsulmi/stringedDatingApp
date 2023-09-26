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


export const phoneNumberAPI = (data)=> axios.post("/phone",data);

export const OTP_API = (data) => axios.post("/verifyOtp", data);

export const googleLoginAPI = (data) => axios.post("/googleLogin", data);

export const createAccountAPI = (userData) => axios.post("/createAccount", userData,formDataHeaders);

export const userDataApi = () => axios.get("/userData", headers);

export const DiscoverUsersApi = () => axios.get("/discover", headers);

export const likeUserApi = (data) => axios.put("/likeUser", data, headers);

export const disLikeUserApi = (data) => axios.put("/dislikeUser", data, headers);

export const fetchLocationApi = (latitude, longitude) => {
    const geoApiUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`;
   return fetch(geoApiUrl);
  };

export const deleteImageApi=(data)=>axios.patch('/deleteImage',data,headers)

export const editUserDataApi = (formData) => axios.patch("/userEdit", formData, formDataHeaders);

export const ReadMsgsApi = (data) => axios.post("/chat/markRead", data, headers);

export const addNewMSgApi = (data) => axios.post("/chat/addmsg", data, headers);

export const getAllmsgsApi = (data) => axios.post("/chat/getmsg", data, headers);

export const getLastMsgsApi = (data) => axios.post("/chat/lastmsg", data, headers);

export const blockUserApi = (data) => axios.put("/blockUser", data, headers);

export const ShowMatchesApi = () => axios.get("/matches", headers);

export const showAllLikedUsersApi = () => axios.get("/allLikedUsers", headers);

export const showAllInterestedUsersApi = () => axios.get("/allInterestedUsers", headers);

export const premiumSubscriptionApi = (data) => axios.post("/payment/premium", data, headers);

export const PaymentSuccessApi = (data) => axios.post("/paymentVerified", data, headers);

export const readNotification = (data)=> axios.post('/readNotification',data,headers);

export const getNotification = (data)=> axios.post('/getNotification',data,headers);

export const searchLikedUserApi = data => axios.post('/searchLikedUser',data,headers);

export const searchMatchedUserApi =data => axios.post("/searchMatchedUser",data, headers);

export const searchRequestedUserApi = data => axios.post('/searchRequestedUser',data,headers);