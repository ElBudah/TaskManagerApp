import { TextField, Button, Stack, ListItem, Card, CardContent, Typography, IconButton, Icon, createTheme } from '@mui/material';
import './Style.css';
import { formState, useForm } from 'react-hook-form'
import { useState, useEffect } from 'react';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import Chip from '@mui/material/Chip';
import InboxIcon from '@mui/icons-material/Inbox';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import DraftsIcon from '@mui/icons-material/Drafts';



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

    function testPath() {
        alert('test')
    }

    return (
        <div className="App">
            <header className="App-header">
                <h3>Enter your new Task</h3>
                <div className='test'>
                    <form onSubmit={handleSubmit(onSubmitHandler)}>
                        <input {...register('task')} autoComplete='off' ></input>
                        <p></p>
                        <Button type='submit' color='secondary' variant='contained'>Submit</Button>
                    </form>
                    {/* {task.map(taskNeat => <h2 key={taskNeat.id}>{taskNeat.task}</h2>)} */}
                    {/* {task.map(taskNeat => <Card
                        key={taskNeat.id}
                        style={{ textDecoration: taskNeat.status ? 'line-through' : 'none' }}
                        onMouseOver={(itemID) => window.localStorage.setItem('id', taskNeat.id)}
                        className="myCard">

                        {taskNeat.task}
                        <div className='interactions'>
                            <DeleteIcon
                                style={{ float: 'right', marginTop: '5px' }}
                                color='primary'
                                onClick={del}
                            ></DeleteIcon>
                            <CheckIcon
                                style={{ float: 'right', marginTop: '5px' }}
                                color='success'
                                onClick={check}
                            >
                            </CheckIcon>
                        </div>

                    </Card>)} */}

                    {/*  <Stack direction='column' spacing={1} marginTop='10px' >
                        {task.map(taskNeat =>
                            <Chip
                                key={taskNeat.id}
                                style={{ textDecoration: taskNeat.status ? 'line-through' : 'none' }}
                                label={taskNeat.task}
                                onDelete={del}
                            >
                                <DeleteIcon
                                    style={{ float: 'right', marginTop: '5px' }}
                                    color='primary'
                                    onClick={del}
                                ></DeleteIcon>
                                <CheckIcon
                                    style={{ float: 'right', marginTop: '5px' }}
                                    color='success'
                                    onClick={check}
                                >
                                </CheckIcon>
                            </Chip>)}
                    </Stack>
 */}

                    <Stack
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
                    </Stack>

                    <Button
                        style={{ marginTop: '10px' }}
                        variant='contained'
                        color='secondary'
                        onClick={log}>
                        Login
                    </Button>
                    <p></p>
                    <Button
                        style={{ marginTop: '10px' }}
                        variant='contained'
                        color='secondary'
                        onClick={show}
                    >
                        Token
                    </Button>
                    <p></p>
                    <Button
                        style={{ marginTop: '10px' }}
                        variant='contained'
                        color='secondary'
                        onClick={destroy}
                    >
                        destroy
                    </Button>
                    <p></p>
                    <InboxIcon
                        onClick={testPath}
                    >

                    </InboxIcon>
                    <List>
                        {task.map(taskNeat => <ListItem
                            key={taskNeat.id}
                            style={{
                                textDecoration: taskNeat.status ? 'line-through' : 'none',
                                backgroundColor: 'primary',
                                borderRadius: '7px',
                                marginTop: '10px',
                                height: '38px',
                                color: '#ffffff'
                            }}
                            onMouseOver={(itemID) => window.localStorage.setItem('id', taskNeat.id)}
                        >
                            <ListItemButton
                            style={{height: '38px'}}
                            
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
                                        style={{ color: '#ffffff' , marginLeft: '50px'}}
                                    />

                                </ListItemIcon>
                            </ListItemButton>
                        </ListItem>)}

                    </List>
                </div>
            </header>
        </div>
    );
}

export default App;
