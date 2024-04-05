import { createSlice} from "@reduxjs/toolkit"

const userSlice = createSlice({
  name: "message",
  initialState: {
    UserData: {}
  },
  reducers: {
    setUserData(state, action) {
      console.log(action)
      state.UserData = action.payload
    }
  }
})

export const { setUserData } = userSlice.actions
export default userSlice.reducer