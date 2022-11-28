import { createSlice } from "@reduxjs/toolkit";

const getPersistedMode = () => {
  
  if(localStorage.getItem("mode") === null){
    const mode = getOSDarkMode();
    localStorage.setItem("mode", mode);
    return mode;
  }else{
    return localStorage.getItem("mode");
  }
}
const getOSDarkMode = () => {
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  return 'light';
}

const initialState = {
  mode: getPersistedMode()
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.mode = state.mode === 'dark' ? 'light' : 'dark';
      localStorage.setItem("mode", state.mode);
    },
  },
});


// Action creators are generated for each case reducer function
export const { toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;
export const selectCurrentMode = (state) => state.theme.mode