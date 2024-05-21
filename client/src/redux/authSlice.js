import { createSlice } from "@reduxjs/toolkit";


const initialState={
    isLoggedIn:false
}
const authSlice=createSlice({
    name:'auth',
    initialState,
    reducers:{
hello:()=>{

}
    }
})

export const {hello}=authSlice.actions

export default authSlice.reducer;