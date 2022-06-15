import { TextField, Button } from '@mui/material';
import './Style.css';
import { formState, useForm } from 'react-hook-form'
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {

    const { register, handleSubmit, reset } = useForm();
    const [task, setTask] = useState();

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



    return (
        <div className="App">
            <header className="App-header">
                <h3>Enter your new Task</h3>
                <div>
                    <form onSubmit={handleSubmit(onSubmitHandler)}>
                        <input {...register('task')} ></input>
                        <p></p>
                        <button type='submit'>submit</button>
                    </form>
                    {task.map(taskNeat => <h3 key={taskNeat.id}>{taskNeat.task}</h3>)}
                </div>
            </header>
        </div>
    );
}

export default App;
