import { 
    Box, 
    Stack, 
    Paper, 
    Avatar, 
    Typography, 
    Button 
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Input from './Input';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { useSignupMutation, useSigninMutation } from '../../features/user/userSlice';
import { setCredentials } from '../../features/auth/authSlice';



const initialState = { 
    firstName: '', 
    lastName: '', 
    email: '', 
    password: '', 
    confirmPassword: '' 
};

const Auth = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [form, setForm] = useState(initialState);
    const [isSignup, setIsSignup] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const [signup, {
        isLoading: isSignupLoading,
    }] = useSignupMutation();

    const [signin, {
        isLoading: isSigninLoading,
    }] = useSigninMutation();

    const handleShowPassword = () => setShowPassword(!showPassword);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
    
    const switchMode = () => {  
        setIsSignup((prevIsSignup) => !prevIsSignup);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isSignup) {
                const result = await signup(form).unwrap();
                dispatch(setCredentials(result));
                navigate('/');
            } else {
                const result = await signin(form).unwrap();
                dispatch(setCredentials(result));
                navigate('/');
            }
        } catch (error) {
            console.log(error);
        }
        
        
      };


  return (
    <Box 
        component="form" 
        onSubmit={handleSubmit}
        sx={{m:5}}
    > 
        <Paper elevation={6}>
        <Stack
            alignItems="center" 
            justifyContent="center"
            spacing={2}  
            direction='column'
            sx={{p:2}}
        >
            <Avatar>
                <LockOutlinedIcon />
            </Avatar>
            <Typography>{ isSignup ? 'Sign up' : 'Sign in' }</Typography>
            
                { isSignup && (
                <>
                <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                </>
                )}
                <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
                { isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" /> }
            
            <Button type="submit" sx={{width: '90%'}} variant="contained" color="primary" >
                { isSignup ? 'Sign Up' : 'Sign In' }
            </Button>

            <Button onClick={switchMode}>
                { isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up" }
             </Button>
            
            </Stack>
        </Paper>
    </Box>
  )
}

export default Auth