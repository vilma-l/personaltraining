import { useState, useEffect, useMemo } from 'react';
import { Calendar, Views, dayjsLocalizer } from 'react-big-calendar';
import dayjs from 'dayjs';
import { API_URL_GETTRAIN } from '../constants';

import 'react-big-calendar/lib/css/react-big-calendar.css'

function TrainingCalendar(props) {

    const localizer = dayjsLocalizer(dayjs);

    const {formats} = useMemo(
        () => ({
          formats: {
            eventTimeRangeFormat: ({ start, end }, culture, localizer) =>
              localizer.format(start, 'hh:mm A', culture) +
              ' - ' +
              localizer.format(end, 'hh:mm A', culture),
          },
        }),
        []
      )

    const [trainings, setTrainings] = useState([]);

    const getTrainings = () => {
        fetch(API_URL_GETTRAIN)
        .then(response => response.json())
        .then(data => setTrainings(data))
        .catch(err => console.error(err));
    };

    useEffect(() => {
        getTrainings();
    }, []);

    const events = trainings.map((training) => {
        return {
            id: training.id,
            title: training.activity + ' / ' + training.customer.firstname + ' ' + training.customer.lastname,
            start: new Date(training.date),
            end: new Date(new Date(training.date).setMinutes(training.duration)),
            allDay: false
        }
    })

    return(
        <div>
            <Calendar
                localizer={localizer}
                formats={formats}
                timeslots={4}
                startAccessor='start'
                endAccessor='end'
                events={events}
                views={['month', 'day', 'week']}
                defaultView={Views.WEEK}
                style={{ height: 500 }}
            />
        </div>
    );
}

export default TrainingCalendar;