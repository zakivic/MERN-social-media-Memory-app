import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  open: false,
  post: {}
}

export const commentsDrawerSlice = createSlice({
  name: 'commentsManager',
  initialState,
  reducers: {
    toggleDrawer: (state, action) => {
      state.open = !state.open;
      state.post = action.payload;
    },
    resetDrawer: (state) => {
      state = initialState;
    }
  },
})

// Action creators are generated for each case reducer function
export const { toggleDrawer, resetDrawer } = commentsDrawerSlice.actions;
export default commentsDrawerSlice.reducer;

export const selectCurrentDrawerOpen= (state) => state.drawer.open;
export const selectCurrentDrawerPost = (state) => state.drawer.post;