import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const USER_URL = 'http://localhost:8081/api/user';

export const LoginRequest = createAsyncThunk('user/login', async ({ email, password }, { rejectWithValue }) => {

    try {
        const respond = await axios.post('http://localhost:8081/api/user/Login', { email, password });
        return respond.data;
    }
    catch (err) {
        return rejectWithValue(err.response?.data || err.message);
    }
})

export const SignUpRequest = createAsyncThunk('user/SignUp', async ({ email, username, password }, { rejectWithValue }) => {

    try {
        const respond = await axios.post('http://localhost:8081/api/user/SignUp', { email, username, password });
        return respond.data;
    }
    catch (err) {
        return rejectWithValue(err.response?.data || err.message);
    }
})
