import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Customerlist from './Customerlist';
import Traininglist from './Traininglist';
import TrainingCalendar from './TrainingCalendar';
import Stats from './Stats';

function Menu() {

    const [value, setValue] = useState('customers');

    const handleChange = (e, newValue) => {
        setValue(newValue);
    };

    return(

        <Box sx={{ width: '100%' }}>
            <Tabs
                value={value}
                onChange={handleChange}
                textColor='secondary'
                indicatorColor='secondary'
            >
                <Tab value='customers' label='Customers' />
                <Tab value='trainings' label='Trainings' />
                <Tab value='trainingcalendar' label='Training Calendar' />
            </Tabs>
            {value === 'customers' && <Customerlist />}
            {value === 'trainings' && <Traininglist />}
            {value === 'trainingcalendar' && <TrainingCalendar />}
        </Box>
    );
}

export default Menu;