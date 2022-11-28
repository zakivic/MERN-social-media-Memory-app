import { 
  Box,
  SpeedDial,
  SpeedDialIcon,
  SpeedDialAction,
  Snackbar, 
  IconButton,
  Alert
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CloseIcon from '@mui/icons-material/Close';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

import { useDispatch, useSelector } from 'react-redux'
import { toggle, setId } from '../../features/toggle/toggleSlice';
import { selectCurrentUser } from '../../features/auth/authSlice';
import { 
  erroToggle, 
  setMessage, 
  setSeverity, 
  resetState 
} from '../../features/error/errorSlice';
import { 
  selectCurrentMode, 
  toggleTheme 
} from '../../features/theme/themeSlice';




const Menu = () => {

  const dispatch = useDispatch()
  const user = useSelector(selectCurrentUser);
  const mode = useSelector(selectCurrentMode);
  const {open, message, severity} = useSelector((state) => state.errorManager.value);
  let modeIcon;
  let modeTooltip;
  if (mode == 'light') {
    modeIcon = <DarkModeIcon />
    modeTooltip = 'Dark'
  } else {
    modeIcon = <LightModeIcon />
    modeTooltip = 'Light'
  }
  const handleAddAction = () => {
    if (user) {
      dispatch(setId("add"));
      dispatch(toggle());
    } else {
      dispatch(setSeverity('warning'));
      dispatch(setMessage('You have to log In to add a memory!'));
      dispatch(erroToggle());
    }
  }

  const handleSnackbarClose = () => {
    dispatch(resetState());
  };

  const action = (
    <>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={()=> dispatch(erroToggle())}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

  return (
    <Box>
        <SpeedDial 
          ariaLabel="Main Menu" 
          icon={<SpeedDialIcon />}
          sx={{ 
            position: 'fixed', 
            bottom: 16, 
            right: 16 
          }}
        >
          <SpeedDialAction
              icon={<AddCircleOutlineIcon />}
              disabled
              tooltipTitle='Add'
              tooltipOpen
              onClick={handleAddAction}
          />
          <SpeedDialAction
              icon={<SearchIcon />}
              tooltipTitle='Search'
              tooltipOpen
          />
          <SpeedDialAction 
              icon={modeIcon}
              onClick={() => dispatch(toggleTheme())}
              tooltipTitle={modeTooltip}
              tooltipOpen
            />

        </SpeedDial>
        
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          open={open}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
          action={action}
          >
          <Alert 
            onClose={handleSnackbarClose} 
            severity={severity} 
            sx={{ width: '100%' }}
          >
            {message}
          </Alert>

        </Snackbar>
    </Box>
  )
}

export default Menu