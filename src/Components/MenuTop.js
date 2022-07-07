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
import { useEffect, useState } from 'react';

export default function MenuTop() {

    const { register, reset, handleSubmit } = useForm({});

    const [user, setUser] = useState([])

    function login() {
        /* axios.post('http://localhost:5000/login', data , { withCredentials: true, credentials: 'include' }).then(resp => {
            console.log(resp.data);
        }) */
    }

    const submitData = (data) => {
        console.log(data);
        axios.post('http://localhost:5000/login', data, { withCredentials: true, credentials: 'include' }).then(resp => {
            console.log("O valor do nome: "+ resp.data.value);
            setUser(resp.data.name);
            if (resp.data.value == 'invalid') {
                swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Invalid User',
                    timer: 2000
                })
            }
        })
        reset();
    }

    function logout() {
        axios.get('http://localhost:5000/logout', { withCredentials: true, credentials: 'include' }).then(resp => {
            console.log('done');
            setUser('');
        })
    }

    /* const clock = 3000;
    useEffect(() => {
        const id = setInterval(() => {
            axios.get('http://localhost:5000/user', { withCredentials: true, credentials: 'include' }).then(resp => {
                setUser(resp.data)
            })
        }, clock);
        return () => clearInterval(id);
    }, [user]); */

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <form onSubmit={handleSubmit(submitData)}
                >
                    <Toolbar
                    >
                        <Button
                            style={{ color: 'white', fontSize: '13px', float: 'left' }}
                            type='submit'
                            variant='contained'
                            sx={{ border: '1px solid' }}
                        >
                            Login
                        </Button>
                        <Button
                            style={{ color: 'white', fontSize: '13px', float: 'left', marginLeft: '5px' }}
                            onClick={logout}
                            variant='contained'
                            sx={{ border: '1px solid' }}
                        >
                            Logout
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
                        <Typography
                            marginLeft={'15px'}
                        >{user}</Typography>
                    </Toolbar>
                </form>

            </AppBar>
        </Box>
    );
}
