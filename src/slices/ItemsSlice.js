import { createSlice} from "@reduxjs/toolkit"

const ItemSlice = createSlice({
  name: "user",
  initialState: {
    allBooks:[],
    hostelWiseBooks:[],
    categoryHostelWiseBooks:[],
    categoryWiseBooks:[],
    latestBooks:[],
    myBooks:[]
  },
  reducers: {
    setAllBookData(state, action) {
      const tempData={...state};
      tempData['allBooks']=action.payload;
      return tempData;
    },
    addAllBookData(state, action) {
      const tempData={...state};
      // console.log("payload: ",action?.payload)
      tempData['allBooks']=[...tempData['allBooks'],...action.payload]
      return tempData;
    },
    addLatestBookData(state, action) {
      const tempData={...state};
      tempData['latestBooks']=action.payload;
      return tempData;
    },
    addMyBook(state,action){
      const tempData={...state};
      tempData['myBooks']=action?.payload;
      return tempData;

    }
  }
})

export const { setAllBookData,addAllBookData,addLatestBookData,addMyBook } = ItemSlice.actions
export default ItemSlice.reducer