import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
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

const initialState = {
    user: {
        id: "",
        email: '',
        password: '',
    },
    status: 'idle',
    error: null
}


const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action) => {
            state.user.email = action.payload.email;
            state.user.password = action.payload.password;
        }
    },
    extraReducers(builder) {
        builder.addCase(LoginRequest.pending, (state) => {
            state.status = 'loading';
            console.log(state.status);
        })
            .addCase(LoginRequest.fulfilled, (state, action) => {
                state.status = 'success';
                console.log(state.status);
                state.user.id = action.payload;
            }).addCase(LoginRequest.rejected, (state, action) => {
                state.status = "rejected";

                state.user.email = '';
                state.user.id = '';
                state.user.password = '';
                state.error = action.payload;
                console.log(state.error);
            }).addCase(SignUpRequest.pending, (state) => {
                state.status = 'loading';
                console.log(state.status);
            })
            .addCase(SignUpRequest.fulfilled, (state) => {
                state.status = 'success';
                console.log(state.status);
            }).addCase(SignUpRequest.rejected, (state, action) => {
                state.status = "rejected";
                state.error = action.payload;
                console.log(state.error);
            })
    }

});

export const { login } = userSlice.actions;
export default userSlice.reducer;