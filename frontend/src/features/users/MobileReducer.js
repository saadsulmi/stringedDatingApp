import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'

const initialState = {
    number : null
}

const phoneSlice = createSlice({
    name : 'mobile',
    initialState,
    reducers : {
        setNumber : (state,action)=>{
            state.number = action.payload;
        },
        resetNumber : state =>{
            state.number = null ;
        }
    }
})

export const { setNumber,resetNumber}= phoneSlice.actions
const MobileReducer = phoneSlice.reducer;

export default MobileReducer;