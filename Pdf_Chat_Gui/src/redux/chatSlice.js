import { getRespondFromAi ,getAllChat } from "../axios/chatRequest";
import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    chat:[],
    state: "idle", // idle, loading, succeeded, failed
    error: null,
}


const chatSlice = createSlice({
    name:"chat",
    reducers: {
        addLocalMessage: (state, action) => {
            state.chat.push(action.payload);
        }
    },
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getAllChat.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getAllChat.fulfilled, (state, action) => {
            state.loading = false;
            state.chat = action.payload;
        });
        builder.addCase(getAllChat.rejected, (state, action) => {
            state.loading = false;
            console.error("Error fetching chat:", action.payload);
            state.error = action.payload;
        });
        builder.addCase(getRespondFromAi.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getRespondFromAi.fulfilled, (state, action) => {
            state.loading = false;
            console.log("AI response received:", action.payload);
            state.chat.push({ role: "assistant", content: action.payload });
        });
        builder.addCase(getRespondFromAi.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    },

})
export const { addLocalMessage } = chatSlice.actions;
export default chatSlice.reducer;