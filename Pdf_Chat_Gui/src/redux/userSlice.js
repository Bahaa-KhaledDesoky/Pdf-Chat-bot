import { createSlice } from "@reduxjs/toolkit";
import { LoginRequest, SignUpRequest } from '../axios/userRequstes';

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