import React, { useState, useEffect } from "react";
import { API_URL_GETTRAIN } from "../constants";
import { API_URL_TRAIN } from "../constants";
import { AgGridReact } from "ag-grid-react";
import dayjs from "dayjs";
import { Button } from "@mui/material";

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import AddTraining from "./AddTraining";

function Traininglist() {

    const [trainings, setTrainings] = useState([]);
    const [open, setOpen] = useState(false);

    const [columnDefs] = useState([
        {field: 'date', headerName: "Date and Time", sortable: true, filter: true, 
            valueFormatter: params => dayjs(params.value).format("DD.MM.YYYY HH:mm")},
        {field: 'activity', sortable: true, filter: true},
        {field: 'duration', sortable: true, filter: true},
        {field: 'customerFirstname,', headerName: 'Customer', 
            valueGetter: (params) => {
                return params.data.customer?.firstname + ' ' + params.data.customer?.lastname
            }, sortable: true, filter: true},
        {cellRenderer: params => 
            <Button size="small" color="error" onClick={() => deleteTraining(params)}>
                Delete
                </Button>,
                width: 120}
    ]);

    const getTrainings = () => {
        fetch(API_URL_GETTRAIN)
        .then(response => response.json())
        .then(data => setTrainings(data))
        .catch(err => console.error(err));
    };

    useEffect(() => {
        getTrainings();
    }, []);

    const addTraining = (training) => {
        fetch(API_URL_TRAIN, {
            method: 'POST',
            headers: {'Content-type':'application/json'},
            body: JSON.stringify(training)
        })
        .then(response => {
            if (response.ok)
                getTrainings();
            else
                alert('Something went wrong when adding a new training.');
        })
        .catch(err => console.error(err));
    };

    const deleteTraining = (params) => {
        if (window.confirm("Are you sure you want to delete this training?")) {
            fetch(API_URL_TRAIN + '/' + params.data.id, {method: 'DELETE'})
            .then(response => {
                if (response.ok) {
                    setOpen(true)
                    getTrainings();
                }
                else
                    alert("Something went wrong in deleting a training: " + response.statusText);
            })
            .catch(err => console.error(err));
        }
    };

    return(
        <>
        <AddTraining addTraining={addTraining} />
        <div 
        className="ag-theme-alpine" 
        style={{height: 500, width: "100%", margin: "auto"}}>
            <AgGridReact 
                rowData={trainings}
                columnDefs={columnDefs}
            />
        </div>
        </>
    );
}

export default Traininglist;