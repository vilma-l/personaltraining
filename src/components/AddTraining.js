import { useState, useEffect } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { API_URL_CUST } from '../constants';

export default function AddTraining(props) {

    const [training, setTraining] = useState({
        date: '',
        activity: '',
        duration: '',
        customer: ''
    });

    const [customers, setCustomers] = useState([]);

    const getCustomers = () => {
        fetch(API_URL_CUST)
        .then(response => response.json())
        .then(data => setCustomers(data.content))
        .catch(err => console.error(err));
    };

    useEffect(() => {
        getCustomers();
    }, []);

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason !== 'backdropClick') {
            setOpen(false);
        }
    };

    const handleSave = () => {
        props.addTraining(training)
        setOpen(false);
    };

    return(
        <div>
            <Button onClick={handleClickOpen}>
                Add New Training
            </Button>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add New Training</DialogTitle>

                <DialogContent>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                     <DemoContainer components={['DateTimePicker']}>
                        <DateTimePicker
                            margin='dense'
                            label='Date and Time'
                            value={training.date}
                            format='DD.MM.YYYY HH:mm'
                            onChange={(datetimeValue) => {
                                setTraining({...training, date: datetimeValue});
                            }}
                            fullWidth
                            variant='standard'
                        />
                     </DemoContainer>
                    </LocalizationProvider>
                    
                    <TextField
                        margin='dense'
                        label='Activity'
                        value={training.activity}
                        onChange={(e) => setTraining({...training, activity: e.target.value})}
                        fullWidth
                        variant='standard'
                    />
                    <TextField
                        margin='dense'
                        label='Duration'
                        value={training.duration}
                        onChange={(e) => setTraining({...training, duration: e.target.value})}
                        fullWidth
                        variant='standard'
                    />
                    <TextField
                        select
                        margin='dense'
                        label='Customer'
                        defaultValue={training.customer}
                        SelectProps={{
                            native: true,
                            }}
                            onChange={(e) => setTraining({...training, customer: e.target.value})}
                        fullWidth
                        variant='standard'
                    >
                        {customers.map((data) => (
                            <option key={data.links[0].href} value={data.links[0].href}>
                                {data.firstname + ' ' + data.lastname}
                            </option>
                        ))}
                    </TextField>
                    
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleSave}>Save</Button>
                    <Button onClick={handleClose}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}