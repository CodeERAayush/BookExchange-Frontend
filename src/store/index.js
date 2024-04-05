import { configureStore } from '@reduxjs/toolkit'
import UserReducer from '../slices/UserDataSlice'
import UploadReducer from '../slices/BackUpload'
export const store = configureStore({
  reducer: {
    UserData:UserReducer,
    BackUpload:UploadReducer
  },
})