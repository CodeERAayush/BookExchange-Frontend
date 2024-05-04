import { configureStore } from '@reduxjs/toolkit'
import UserReducer from '../slices/UserDataSlice'
import UploadReducer from '../slices/BackUpload'
import hostelReducer from '../slices/HostelList'
import itemReducer from '../slices/ItemsSlice'
import cartReducer from '../slices/CartSlice'
import favouriteReducer from '../slices/FavouriteSlice'
export const store = configureStore({
  reducer: {
    UserData:UserReducer,
    BackUpload:UploadReducer,
    Hostel:hostelReducer,
    Items:itemReducer,
    cart:cartReducer,
    favourites:favouriteReducer
  },
})