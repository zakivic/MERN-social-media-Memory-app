import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: 1
  }

  export const pageSlice = createSlice({
    name: 'page',
    initialState,
    reducers: {
      nextPage: (state) => {
        state.value += 1;
      },
      prevPage: (state) => {
        state.value -= 1;
      },
    }
  })
  
  
  export const { nextPage, prevPage} = pageSlice.actions;
  export default pageSlice.reducer

  
  export const selectCurrentPage = (state) => state.page.value