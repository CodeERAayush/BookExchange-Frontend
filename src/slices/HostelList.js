import { createSlice} from "@reduxjs/toolkit"

const HostelSlice = createSlice({
  name: "message",
  initialState: {
    HostelList: []
  },
  reducers: {
    setHostelList(state, action) {
      let tempHostels={...state}
      const data = action.payload.map(hostel => ({
        label: hostel.hostelName,
        value: hostel._id
      }));
      tempHostels['HostelList']=data;
      return tempHostels;
    },
    addNewHostel(state, action){ 
      let tempHostels={...state}
      const newData={label:action.payload?.hostelName,value:action?.payload?._id}
      state.HostelList.push(newData)
    },
    default: (state) => state
  
  }
})

export const { setHostelList,addNewHostel } = HostelSlice.actions
export default HostelSlice.reducer