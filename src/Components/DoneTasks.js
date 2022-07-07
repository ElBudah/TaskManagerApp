import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { ListItem, Typography } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import swal from 'sweetalert2';


export default function DoneTasks() {

    const [open, setOpen] = React.useState(false);
    const [task, setTask] = useState([]);

    const handleClickOpen = () => {

        axios.get('http://localhost:5000/token', { withCredentials: true, credentials: 'include' }).then(resp => {
            if (resp.data.value == undefined) {
                swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Not Authorized',
                    timer: 2000
                })
            } else {
                setOpen(true);
            }

        })
    };

    const handleClose = () => {
        setOpen(false);
    };

    const clock = 5000;
    useEffect(() => {
        const id = setInterval(() => {
            axios.get('http://localhost:5000/donetasks', { withCredentials: true, credentials: 'include' }).then(resp => {
                if (resp.data == null) {
                    setTask('');
                } else {
                    setTask(resp.data.value);
                }
            })
        }, clock);
        return () => clearInterval(id);
    }, [task]);

    return (
        <div>
            <Button variant="contained" onClick={handleClickOpen}
                sx={{ border: '1px solid' }}
            >
                Open Done Tasks
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Done Tasks"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {task.map(taskNeat => <Typography>
                            {taskNeat.task}
                        </Typography>)}
                    </DialogContentText>
                </DialogContent>
            </Dialog>


        </div>
    );
}
