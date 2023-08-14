import { configureStore } from '@reduxjs/toolkit'
import AuthReducer from '../features/users/AuthReducer'
import MobileReducer from '../features/users/MobileReducer'
import RegisterReducer from '../features/users/RegisterReducer'
import GoogleReducer from '../features/users/GoogleReducer'
import UserReducer from '../features/users/UserReducer'

export const store = configureStore({
    reducer :{
        auth : AuthReducer,
        phone : MobileReducer,
        register : RegisterReducer,
        google : GoogleReducer,
        user : UserReducer
    }
})

export default store