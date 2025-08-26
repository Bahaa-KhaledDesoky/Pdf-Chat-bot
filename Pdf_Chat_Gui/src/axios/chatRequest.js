import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const URL = 'http://localhost:8081/api/chat';
export const  getAllChat=createAsyncThunk(
    'chat/getAllChat',async({pdf_id},{rejectWithValue})=>{
        try{
            const respond =await axios.get(URL+'/GetAllChat/'+pdf_id);
            console.log("ssssssssssssssssssssssssssssssssssssssssssss");
            return respond.data;
        }
        catch(err){
            return rejectWithValue(err.response.data);
        }
    }
);
export const getRespondFromAi = createAsyncThunk(
    'chat/getRespondFromAi', async ({ chats, pdf, flag }, { rejectWithValue }) => {
        try {
            const respond = await axios.post(URL + '/getRespondFromAi', { chats, pdf, flag });
            return respond.data;
        }
        catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);