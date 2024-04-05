import { createSlice} from "@reduxjs/toolkit"

const uploadSlice = createSlice({
  name: "message",
  initialState: {
    uploading:false
  },
  reducers: {
    setUpload(state, action) {
    //   console.log("true aya ?? ",typeof(action.payload))
      state.uploading = action.payload
    }
  }
})

export const { setUpload } = uploadSlice.actions
export default uploadSlice.reducer