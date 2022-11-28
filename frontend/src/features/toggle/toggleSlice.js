import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: { open: false, id: ''}
}

export const toggleSlice = createSlice({
  name: 'toggleManager',
  initialState,
  reducers: {
    toggle: (state) => {
      state.value.open = !state.value.open;
    },
    setId: (state, action) => {
      state.value.id = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { toggle, setId } = toggleSlice.actions
export default toggleSlice.reducer