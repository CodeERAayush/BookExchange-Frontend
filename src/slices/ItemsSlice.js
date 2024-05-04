import { createSlice} from "@reduxjs/toolkit"

const ItemSlice = createSlice({
  name: "user",
  initialState: {
    allBooks:[],
    hostelWiseBooks:[],
    categoryHostelWiseBooks:[],
    categoryWiseBooks:[],
    latestBooks:[]
  },
  reducers: {
    setAllBookData(state, action) {
      const tempData={...state};
      tempData['allBooks']=action.payload;
      return tempData;
    },
    addAllBookData(state, action) {
      const tempData={...state};
      tempData['allBooks'].concat(action.payload);
      return tempData;
    },
    addLatestBookData(state, action) {
      const tempData={...state};
      tempData['latestBooks']=action.payload;
      return tempData;
    },
  }
})

export const { setAllBookData,addAllBookData,addLatestBookData } = ItemSlice.actions
export default ItemSlice.reducer