import React, { useState, useEffect } from "react";
import { API_URL_TRAIN } from "../constants";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

function Stats() {

    const [trainings, setTrainings] = useState([]);

    const getTrainings = () => {
        fetch(API_URL_TRAIN)
        .then(response => response.json())
        .then(data => setTrainings(data))
        .catch(err => console.error(err));
    };

    useEffect(() => {
        getTrainings();
    }, []);

    const data = [
        {
            name: 'test1',
            amount: 100
        }
    ]

    return(

        <ResponsiveContainer width="100%" height="100%">
            <BarChart
                width={500}
                height={500}
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey='name' />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey='name' fill='#8884d8' />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default Stats;