import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items:[] ,
}

export const FavouriteSlice = createSlice({
  name: 'Items',
  initialState,
  reducers: {
    add_to_favourite: (state,action) => {
       state?.items?.unshift(action.payload)
    },
    remove_from_favourite: (state,action) => {
     state?.items.forEach((item,index)=>{
      if(item._id===action.payload){
        state?.items?.splice(index,1);
        return
      }
     })
    },
  },
})

// Action creators are generated for each case reducer function
export const {add_to_favourite,remove_from_favourite,check_fav} = FavouriteSlice.actions

export default FavouriteSlice.reducer