import { configureStore } from "@reduxjs/toolkit";
import authReducer from './Slice'

const store = configureStore({
    reducer:{
        auth:authReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false,
      })
})


export default store ;