import { TextField, Button, Stack, ListItem, Card, CardContent, Typography, IconButton, Icon } from '@mui/material';
import './Style.css';
import { formState, useForm } from 'react-hook-form'
import { useState, useEffect } from 'react';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';

function App() {

    const { register, handleSubmit, reset } = useForm();
    const [task, setTask] = useState([]);

    const onSubmitHandler = (data) => {
        console.log(data);
        axios.post('http://localhost:5000/', data).then(response => {

        })
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
            axios.get('http://localhost:5000').then(resp => {
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
    function check(){
        let id  = window.localStorage.getItem('id');

        axios.delete('http://localhost:5000/done', {
            data: {
                idselected : id
            }
        }).then(resp => {

        })
    }


    return (
        <div className="App">
            <header className="App-header">
                <h3>Enter your new Task</h3>
                <div className='test'>
                    <form onSubmit={handleSubmit(onSubmitHandler)}>
                        <input {...register('task')} ></input>
                        <p></p>
                        <button type='submit'>submit</button>
                    </form>
                    {/* {task.map(taskNeat => <h2 key={taskNeat.id}>{taskNeat.task}</h2>)} */}
                    {task.map(taskNeat => <Card
                        key={taskNeat.id}
                        onMouseOver={(itemID) => window.localStorage.setItem('id', taskNeat.id)}
                        className="myCard">{taskNeat.task}

                        <div className='interactions'>
                            <DeleteIcon
                                style={{ float: 'right', marginRight: '10px', marginTop: '5px' }}
                                color='primary'
                                onClick={del}
                            ></DeleteIcon>
                            <CheckIcon
                                style={{ float: 'right', marginRight: '10px', marginTop: '5px' }}
                                color='success'
                                onClick={check}
                            >
                            </CheckIcon>

                        </div>

                    </Card>)}
                </div>
            </header>
        </div>
    );
}

export default App;
