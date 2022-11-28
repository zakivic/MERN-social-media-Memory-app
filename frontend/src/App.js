import { Routes, Route, Navigate  } from "react-router-dom";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import Layout from "./components/Layout";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";

import { getDesignTokens } from './features/theme/theme'
import { selectCurrentMode } from './features/theme/themeSlice';




function App() {

  const mode = useSelector(selectCurrentMode);
  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Navigate to='/posts' />}/>
              <Route path='/posts' element={<Home />}/>
              <Route path='/posts/search' element={<Home />}/>
              <Route path='auth' element={<Auth />}/>
            </Route>
          </Routes>
        </ThemeProvider>
  );
}

export default App;
