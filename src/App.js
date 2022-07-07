import { TextField, Button, Stack, ListItem, Card, CardContent, Typography, IconButton, Icon, createTheme, Toolbar } from '@mui/material';
import './Style.css';
import { formState, useForm } from 'react-hook-form'
import { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuTop from './Components/MenuTop';
import swal from 'sweetalert2';


function App() {

    const { register, handleSubmit, reset } = useForm();
    const [task, setTask] = useState([]);

    const onSubmitHandler = (data) => {
        console.log(data);
        axios.post('http://localhost:5000/', data, { withCredentials: true, credentials: 'include' }).then(resp => {
            //Condition to check if user is authorized
            if (resp.data.value == 'invalid') {
                swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Not authorazied'
                })
            }
        })
        reset();
    }

    /* function getData(){
        setTimeout(function async(){
            axios.get('http://localhost:5000').then(response => {
                console.log(response.data)
                setTask(response.data);
            })
            getData();
        },
        30000
        )
    }
    getData(); */

    const clock = 5000;
    useEffect(() => {
        const id = setInterval(() => {
            axios.get('http://localhost:5000/', { withCredentials: true, credentials: 'include' }).then(resp => {
                if (resp.data == null) {
                    setTask('');
                } else {
                    setTask(resp.data);
                }
            })
        }, clock);
        return () => clearInterval(id);
    }, [task]);


    //Delete task function
    function del() {

        let id = window.localStorage.getItem('id');

        axios.get('http://localhost:5000/token', { withCredentials: true, credentials: 'include' }).then(resp => {
            console.log(resp.data.value);
            if (resp.data.value == undefined) {
                swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Not Authorized',
                    timer: 2000
                })
            } else {
                axios.delete('http://localhost:5000/delete', {
                    data: {
                        idselected: id
                    }
                }).then(response => {

                })
            }
        })
    }

    //Finish task function
    function check() {
        let id = window.localStorage.getItem('id');

        axios.get('http://localhost:5000/token', { withCredentials: true, credentials: 'include' }).then(resp => {
            console.log(resp.data.value);
            if (resp.data.value == undefined) {
                swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Not Authorized',
                    timer: 2000
                })
            } else {
                axios.delete('http://localhost:5000/done', {
                    data: {
                        idselected: id
                    }
                }).then(resp => {

                })
            }
        })
    }

    return (
        <Fragment>
            <div className='login'>
                <MenuTop></MenuTop>
            </div>
            <div className="App">
                <header className="App-header">
                    <div className='test'>
                        
                        <form onSubmit={handleSubmit(onSubmitHandler)}>
                            <TextField {...register('task')} 
                            autoComplete='off' 
                            variant='standard' 
                            placeholder='Enter your new task'
                            
                            style={{marginTop: '15px'}}
                            ></TextField>
                            <p></p>
                            <Button type='submit' color='primary' variant='contained'>Submit</Button>
                        </form>

                        <List>
                            {task.map(taskNeat => <ListItem
                                key={taskNeat.id}
                                style={{
                                    textDecoration: taskNeat.status ? 'line-through' : 'none',
                                    backgroundColor: '#2e77d1',
                                    borderRadius: '7px',
                                    marginTop: '10px',
                                    height: '38px',
                                    color: '#ffffff'
                                }}
                                onMouseOver={(itemID) => window.localStorage.setItem('id', taskNeat.id)}
                            >
                                <ListItemButton
                                    style={{ height: '38px' }}
                                >
                                    <ListItemIcon
                                    >
                                        <CheckIcon
                                            style={{ color: '#ffffff' }}
                                            onClick={check}
                                        />
                                    </ListItemIcon>
                                    <ListItemText primary={taskNeat.task} />
                                    <ListItemIcon>
                                        <DeleteIcon
                                            style={{ color: '#ffffff', marginLeft: '50px' }}
                                            onClick={del}
                                        />
                                    </ListItemIcon>
                                </ListItemButton>
                            </ListItem>)}
                        </List>
                    </div>
                </header>
            </div>
        </Fragment>
    );
}

export default App;
