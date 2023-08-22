import { configureStore } from '@reduxjs/toolkit'
import AuthReducer from '../features/users/AuthReducer'
import MobileReducer from '../features/users/MobileReducer'
import RegisterReducer from '../features/users/RegisterReducer'
import GoogleReducer from '../features/users/GoogleReducer'
import UserReducer from '../features/users/UserReducer'
import OnlineUserReducer from '../features/users/OnlineUsers'

export const store = configureStore({
    reducer :{
        auth : AuthReducer,
        phone : MobileReducer,
        register : RegisterReducer,
        google : GoogleReducer,
        user : UserReducer,
        onlineUsers : OnlineUserReducer
    }
})

export default store