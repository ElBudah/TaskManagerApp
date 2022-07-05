import { TextField, Button, Stack, ListItem, Card, CardContent, Typography, IconButton, Icon, createTheme } from '@mui/material';
import './Style.css';
import { formState, useForm } from 'react-hook-form'
import { useState, useEffect } from 'react';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';




function App() {

    const { register, handleSubmit, reset } = useForm();
    const [task, setTask] = useState([]);

    const onSubmitHandler = (data) => {
        console.log(data);
        axios.post('http://localhost:5000/', data, { withCredentials: true, credentials: 'include' }).then(response => {

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
            axios.get('http://localhost:5000/').then(resp => {
                setTask(resp.data);
            })
        }, clock);
        return () => clearInterval(id);
    }, [task]);


    //Delete task function
    function del() {

        let id = window.localStorage.getItem('id');

        axios.delete('http://localhost:5000/delete', {
            data: {
                idselected: id
            }
        }).then(response => {

        })
    }


    //Finish task function
    function check() {
        let id = window.localStorage.getItem('id');

        axios.delete('http://localhost:5000/done', {
            data: {
                idselected: id
            }
        }).then(resp => {

        })
    }

    function log() {
        axios.post('http://localhost:5000/login', {}, { withCredentials: true, credentials: 'include' }).then(resp => {
            console.log(resp.data);
        })

    }

    function show() {
        axios.get('http://localhost:5000/token', { withCredentials: true, credentials: 'include' }).then(resp => {
            console.log(resp.data)
        })
    }

    function destroy() {
        axios.get('http://localhost:5000/destroy', { withCredentials: true, credentials: 'include' }).then(resp => {
            console.log('done');
        })
    }

    return (
        <div className="App">
            <header className="App-header">
                <h3>Enter your new Task</h3>
                <div className='test'>
                    <form onSubmit={handleSubmit(onSubmitHandler)}>
                        <input {...register('task')} autoComplete='off' ></input>
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
                                    />
                                </ListItemIcon>
                                <ListItemText primary={taskNeat.task} />
                                <ListItemIcon>
                                    <DeleteIcon
                                        style={{ color: '#ffffff', marginLeft: '50px' }}
                                    />

                                </ListItemIcon>
                            </ListItemButton>
                        </ListItem>)}

                    </List>

                    {/* <Stack
                        direction='column'
                        spacing={1}
                        marginTop='10px'
                    >
                        {task.map(taskNeat => <Button
                            key={taskNeat.id}
                            color='primary'
                            variant='contained'
                            style={{ textDecoration: taskNeat.status ? 'line-through' : 'none' }}
                            onMouseOver={(itemID) => window.localStorage.setItem('id', taskNeat.id)}
                            startIcon={<CheckIcon onClick={check}></CheckIcon>}
                            endIcon={<DeleteIcon onClick={del}></DeleteIcon>}
                        >
                            {taskNeat.task}
                        </Button>)}
                    </Stack> */}

                    <Button
                        style={{ marginTop: '10px' }}
                        variant='contained'
                        color='primary'
                        onClick={log}>
                        Login
                    </Button>
                    <p></p>
                    <Button
                        style={{ marginTop: '10px' }}
                        variant='contained'
                        color='primary'
                        onClick={show}
                    >
                        Token
                    </Button>
                    <p></p>
                    <Button
                        style={{ marginTop: '10px' }}
                        variant='contained'
                        color='primary'
                        onClick={destroy}
                    >
                        destroy
                    </Button>
                    <p></p>


                </div>
            </header>
        </div>
    );
}

export default App;
