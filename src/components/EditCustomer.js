import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { useState } from 'react';

export default function EditCustomer(props) {

    const [customer, setCustomer] = useState({
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        streetaddress: '',
        postcode: '',
        city: ''
    });

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
        setCustomer({
            firstname: props.params.firstname,
            lastname: props.params.lastname,
            email: props.params.email,
            phone: props.params.phone,
            streetaddress: props.params.streetaddress,
            postcode: props.params.postcode,
            city: props.params.city
        });
    };

    const handleClose = (event, reason) => {
        if (reason !== 'backdropClick') {
            setOpen(false);
        }
    };

    const handleSave = () => {
        props.updateCustomer(props.params.links[1].href, customer)
        setOpen(false);
    };

    return(
        <div>
            <Button size='small' onClick={handleClickOpen}>
                Edit
            </Button>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit Customer</DialogTitle>

                <DialogContent>
                    <TextField
                        margin='dense'
                        label="First name"
                        value={customer.firstname}
                        onChange={(e) => setCustomer({...customer, firstname: e.target.value})}
                        fullWidth
                        variant='standard' 
                    />
                    <TextField
                        margin='dense'
                        label='Last name'
                        value={customer.lastname}
                        onChange={(e) => setCustomer({...customer, lastname: e.target.value})}
                        fullWidth
                        variant='standard' 
                    />
                    <TextField
                        margin='dense'
                        label='E-mail'
                        value={customer.email}
                        onChange={(e) => setCustomer({...customer, email: e.target.value})}
                        fullWidth
                        variant='standard' 
                    />
                    <TextField
                        margin='dense'
                        label='Phone number'
                        value={customer.phone}
                        onChange={(e) => setCustomer({...customer, phone: e.target.value})}
                        fullWidth
                        variant='standard' 
                    />
                    <TextField
                        margin='dense'
                        label='Street address'
                        value={customer.streetaddress}
                        onChange={(e) => setCustomer({...customer, streetaddress: e.target.value})}
                        fullWidth
                        variant='standard' 
                    />
                    <TextField
                        margin='dense'
                        label='Post code'
                        value={customer.postcode}
                        onChange={(e) => setCustomer({...customer, postcode: e.target.value})}
                        fullWidth
                        variant='standard' 
                    />
                    <TextField
                        margin='dense'
                        label='City'
                        value={customer.city}
                        onChange={(e) => setCustomer({...customer, city: e.target.value})}
                        fullWidth
                        variant='standard' 
                    />
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleSave}>Save</Button>
                    <Button onClick={handleClose}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}