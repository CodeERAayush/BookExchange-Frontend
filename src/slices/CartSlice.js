import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items:[] ,
}

export const cartSlice = createSlice({
  name: 'Items',
  initialState,
  reducers: {
    add_item: (state,action) => {
      let found=false;
        for (item of state?.items){
          if(item?._id==action?.payload?._id){
            found=true;
            break;
          }
        }
        if(!found)
       state?.items?.unshift({...action.payload})
    },
    remove_item: (state,action) => {
     state?.items.forEach((item,index)=>{
      if(item._id===action.payload){
        state?.items?.splice(index,1);
        return
      }
     })
    },
    increase_quantity:(state,action)=>{
      for (item of state?.items){
        if(item?._id==action?.payload){
          item.quantity=parseInt(item?.quantity)+1;
          break;
        }
      }
    },
    decrease_quantity:(state,action)=>{
      for (item of state?.items){
        if(item?.id==action?.payload){
          item.quantity=parseInt(item?.quantity)-1;
          break;
        }
      }
    },
  },
})

// Action creators are generated for each case reducer function
export const { add_item, remove_item, increase_quantity,decrease_quantity} = cartSlice.actions

export default cartSlice.reducer