import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const USER_URL = 'http://localhost:8081/api/user';

export const AddModel = createAsyncThunk('user/model', async ({ userId, modelName, apiKey }, { rejectWithValue }) => {

    try {
        const respond = await axios.post(`${USER_URL}/model`, { userId, modelName, apiKey });
        return respond.data;
    }
    catch (err) {
        return rejectWithValue(err.response?.data || err.message);
    }
})



export const LoginRequest = createAsyncThunk('user/login', async ({ email, password }, { rejectWithValue }) => {

    try {
        const respond = await axios.post(`${USER_URL}/Login`, { email, password });
        return respond.data;
    }
    catch (err) {
        return rejectWithValue(err.response?.data || err.message);
    }
})

export const SignUpRequest = createAsyncThunk('user/SignUp', async ({ email, username, password }, { rejectWithValue }) => {

    try {
        const respond = await axios.post(`${USER_URL}/SignUp`, { email, username, password });
        return respond.data;
    }
    catch (err) {
        return rejectWithValue(err.response?.data || err.message);
    }
})
