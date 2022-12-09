import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name:'auth',
    initialState:{
        username : null,
        token:null,
        password:null,
        alertNumber : null,
        GlobalDataUser:null,
    },
    reducers:{
        setGlobalData:(state,action)=>{
            const {Data} = action.payload
            state.GlobalDataUser = Data
        },
        setCredentials:(state,action)=>{
            const {username,userToken,password,number} = action.payload
            state.username = username
            state.token = userToken
            state.password = password
            state.alertNumber = number
        },
        logOut:(state)=>{
            state.username = null
            state.token = null
            state.password = null
            state.alertNumber = null
            state.GlobalDataUser = null 
        },
    }
})

export const {setCredentials,logOut,setGlobalData} = userSlice.actions

export default userSlice.reducer


