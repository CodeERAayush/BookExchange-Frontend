import { createSlice} from "@reduxjs/toolkit"

const userSlice = createSlice({
  name: "user",
  initialState: {
    UserData: {}
  },
  reducers: {
    setUserData(state, action) {
      const tempData={...state};
      tempData['UserData']=action.payload;
      return tempData;
    }
  }
})

export const { setUserData } = userSlice.actions
export default userSlice.reducer