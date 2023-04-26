import React, { useState, useEffect } from "react";
import { API_URL_CUST } from "../constants";
import { AgGridReact } from "ag-grid-react";
import { Button } from "@mui/material";
import { CSVLink } from "react-csv";
import EditCustomer from "./EditCustomer";
import AddCustomer from "./AddCustomer";

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

function Customerlist() {

    const [customers, setCustomers] = useState([]);
    const [open, setOpen] = useState(false);

    const [columnDefs] = useState([
        {field: 'firstname', headerName: 'First name', sortable: true, filter: true, width: 150},
        {field: 'lastname', headerName: 'Last name', sortable: true, filter: true, width: 150},
        {field: 'streetaddress', headerName: 'Street address', sortable: true, filter: true},
        {field: 'postcode', headerName: 'Post code', sortable: true, filter: true, width: 150},
        {field: 'city', sortable: true, filter: true, width: 150},
        {field: 'email', headerName: 'E-mail', sortable: true, filter: true},
        {field: 'phone', headerName: 'Phone number', sortable: true, filter: true},
        {cellRenderer: params => <EditCustomer updateCustomer={updateCustomer} 
            params={params.data} />,
            width: 120},
        {cellRenderer: params => 
            <Button size="small" color="error" onClick={() => deleteCustomer(params)}>
                Delete
                </Button>,
                width: 120}
    ]);

    const getCustomers = () => {
        fetch(API_URL_CUST)
        .then(response => response.json())
        .then(data => setCustomers(data.content))
        .catch(err => console.error(err));
    };

    useEffect(() => {
        getCustomers();
    }, []);

    const addCustomer = (customer) => {
        fetch(API_URL_CUST, {
            method: 'POST',
            headers: {'Content-type':'application/json'},
            body: JSON.stringify(customer)
        })
        .then(response => {
            if (response.ok)
                getCustomers();
            else
                alert('Something went wrong when adding a new customer.');
        })
        .catch(err => console.error(err));
    };

    const deleteCustomer = (params) => {
        if (window.confirm("Are you sure you want to delete this customer?")) {
            fetch(params.data.links[1].href, {method: 'DELETE'})
            .then(response => {
                if (response.ok) {
                    setOpen(true)
                    getCustomers();
                }
                else
                    alert("Something went wrong with deleting a customer: " + response.statusText);
            })
            .catch(err => console.error(err));
        }
    };

    const updateCustomer = (url, updatedCustomer) => {
        fetch(url, {
            method: 'PUT',
            headers: {'Content-type':'application/json'},
            body: JSON.stringify(updatedCustomer)
        })
        .then(response => {
            if (response.ok) {
                setOpen(true)
                getCustomers();
            }
            else
                alert("Something went wrong with editing a customer: " + response.statusText);
        })
    };

    return(
        <>
        <AddCustomer addCustomer={addCustomer} />
        <CSVLink data={customers}>Download Customer Data in CSV</CSVLink>
        <div 
        className="ag-theme-alpine" 
        style={{height: 600, width: "100%", margin: "auto"}}>
            <AgGridReact 
                rowData={customers}
                columnDefs={columnDefs}
            />
        </div>
        </>
    );
}

export default Customerlist;