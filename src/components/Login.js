import { response } from 'express';
import React from 'react';
import { Redirect } from 'react-router-dom';
import apiClient from '../services/api';

const Login = (props) => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [toHome, setToHome] = React.useState(false);
    const [authError, setAuthError] = React.useState(false);
    const [unknownError, setUnknownError] = React.useState(false);
    
    const handleSubmit = (e) => {
        e.preventDefault();
        setAuthError(false);
        setUnknownError(false);
        apiClient.get('/sanctum/csrf-cookie').then(response => {
            apiClient.post('/login', {
                email: email,
                password: password
            })
        }).then(response => {
            if (response.status === 204) {
                props.login();
                setToHome(true);
            }
        }).catch(error => {
            if(error.response && error.response.status ===422 ) {
                setAuthError(true);
            } else {
                setUnknownError(true);
                console.error(error);
            }
        });
    };
}

export default Login;