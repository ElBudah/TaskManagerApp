import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Button, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import LogoutIcon from '@mui/icons-material/Logout';
import swal from 'sweetalert2';

export default function MenuTop() {

    const { register, reset, handleSubmit } = useForm({});

    function login() {
        /* axios.post('http://localhost:5000/login', data , { withCredentials: true, credentials: 'include' }).then(resp => {
            console.log(resp.data);
        }) */
    }

    const submitData = (data) => {
        console.log(data);
        axios.post('http://localhost:5000/login', data, { withCredentials: true, credentials: 'include' }).then(resp => {
            console.log(resp.data);
            if(resp.data.value == 'zero'){
                swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Invalid User'
                })
            }
        })
        reset();
    }

    function logout() {

    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <form onSubmit={handleSubmit(submitData)}
                >
                    <Toolbar
                    >
                        <Button
                            style={{ color: 'white', fontSize: '17px', float: 'left' }}
                            type='submit'
                            variant='contained'
                            sx={{ border: '2px solid' }}
                        >
                            Login
                        </Button>
                        <TextField
                            variant='standard'
                            placeholder='User Name'
                            sx={{ input: { color: 'white', opacity: 20 } }}
                            style={{ marginLeft: '10px', borderColor: 'white' }}
                            autoComplete='off'
                            {...register('txtName')}
                        />
                        <TextField
                            variant='standard'
                            placeholder='Password'
                            type='password'
                            sx={{ input: { color: 'white' } }}
                            style={{ marginLeft: '10px' }}
                            {...register('txtPassword')}
                            autoComplete='off'
                        />
                    </Toolbar>
                </form>
            </AppBar>
        </Box>
    );
}
