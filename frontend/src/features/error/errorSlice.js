import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: { 
        open: false, 
        message: '',
        severity: 'warning'
    }
  }

  export const errorSlice = createSlice({
    name: 'errorManager',
    initialState,
    reducers: {
      erroToggle: (state) => {
        state.value.open = !state.value.open;
      },
      setMessage: (state, action) => {
        state.value.message = action.payload
      },
      setSeverity: (state, action) => {
        state.value.severity = action.payload
      },
      resetState: (state) => {
        state.value = initialState.value
      }
    }
  })
  
  // Action creators are generated for each case reducer function
  export const { 
    erroToggle, 
    setMessage, 
    setSeverity, 
    resetState 
  } = errorSlice.actions;
  export default errorSlice.reducer
