import { 
    Avatar, 
    ButtonBase, 
    styled, 
    AppBar, 
    Stack,
    Typography,
    Button,
    Toolbar,
    Box,
    Menu,
    MenuItem,
    ListItemIcon,
    ListItemText
} from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { 
    selectCurrentToken, 
    selectCurrentUser, 
    logOut 
} from '../../features/auth/authSlice'; 
import memoryLogo from '../../images/memory_logo.png'




const StyledToolbar = styled(Toolbar)({
    display: "flex",
    color: 'primery',
    justifyContent: "space-between",
  });

const UserBox = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    gap: "10px",
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  }));

const Navbar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const token = useSelector(selectCurrentToken);
    const user = useSelector(selectCurrentUser);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
       };
   
       const handleClose = () => {
           setAnchorEl(null);
       };

    let userContent;
    if (token) {
        userContent = 
        (
         <>  
        <Avatar />
        <Typography color='primary' variant='h6' sx={{m:3}}>{user.name}</Typography>
        <Button 
            color='primary'
            variant="contained" 
            endIcon={<LogoutOutlinedIcon />}
            onClick={()=> dispatch(logOut())}
            >
            Log Out
        </Button>
        </> 
        )
    } else {
        userContent = 
        (
         <>  
        
        <Button 
            color='primary'
            variant="contained" 
            endIcon={<LoginIcon />}
            onClick={()=> navigate('/auth')}
            >
            Log In
        </Button>
        </> 
        ) 
    }
  return (
    <>
        <AppBar position="sticky">
            <StyledToolbar>
                {/* LOGO */}
                <ButtonBase sx={{borderRadius: 15}} onClick={() => navigate('/')}>
                    <img src={memoryLogo} alt="icon" height="100px"/>
                </ButtonBase>
                {/* User Display On mid-and-large Devices */}
                <Stack 
                    bgcolor='custom.main'
                    direction="row" 
                    spacing={2}
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{
                        display: { xs: "none", md: "flex"},
                        p:2,
                        borderRadius:10
                        }}
                    >
                    {userContent}
                </Stack>

                {/* User Display On small Devices */}

                <UserBox onClick={handleClick}>
                <Avatar
                    sx={{ width: 30, height: 30 }}
                />
                </UserBox>
            </StyledToolbar>
        </AppBar>
        <Menu
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
            vertical: "top",
            horizontal: "right",
            }}
            transformOrigin={{
            vertical: "top",
            horizontal: "right",
            }}
        >
            {token? 
            <MenuItem
                onClick={()=> dispatch(logOut())}
            >
                <ListItemIcon>
                    <LogoutOutlinedIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>log Out</ListItemText>
            </MenuItem>
            :
            <MenuItem
                onClick={()=> navigate('/auth')}
            >
                <ListItemIcon>
                    <LoginIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>log In</ListItemText>
            </MenuItem>}
        </Menu>

    </>
  )
}

export default Navbar
