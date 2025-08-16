import axios from "axios";
import { createAsyncThunk } from '@reduxjs/toolkit';

const PDF_URL = 'http://localhost:8081/api/pdf';

export const uploadPdf = createAsyncThunk("pdf/upload", async ({pdfData}, {rejectWithValue}) => {
    try {
        const response = await axios.post(`${PDF_URL}/AddPdf`, pdfData, { headers: { "Content-Type": "multipart/form-data" } });
       console.log("Response in thunk:", response.data);
        return response.data;
    } catch (error) {
        throw rejectWithValue(error.response.data);
    }
});

export const getUserPdfs = createAsyncThunk("pdf/getUserPdfs", async ({userId}, {rejectWithValue}) => {
    try {
        const response = await axios.get(`${PDF_URL}/GetUserPdfs/${userId}`);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const deletePdf = createAsyncThunk("pdf/deletePdf", async ({pdfId}, {rejectWithValue}) => {
    try {
        const response = await axios.delete(`${PDF_URL}/DeletePdf/${pdfId}`);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});