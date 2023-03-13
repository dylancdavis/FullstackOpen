import { createSlice } from "@reduxjs/toolkit"

const searchSlice = createSlice({
  name: 'search',
  initialState: '',
  reducers: {
    setSearch(state, action) {
      return action.payload
    }
  }
})

export default searchSlice.reducer
export const { setSearch } = searchSlice.actions