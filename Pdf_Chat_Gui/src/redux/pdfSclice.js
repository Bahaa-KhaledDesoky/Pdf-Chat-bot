import { createSlice } from "@reduxjs/toolkit";
import { uploadPdf ,deletePdf,getUserPdfs } from "../axios/pdfRequeste";
const initialState ={
    pdf:[],
    status: 'idle',
    error: null
}

const pdfSlice=createSlice(
    {
        name: 'pdf',
        initialState,
        reducers: {
            
        },
        extraReducers(builder) {
            builder.addCase(uploadPdf.pending, (state) => {
                state.status = 'loading';
                console.log(state.status);
            } ).addCase(uploadPdf.fulfilled,(state) => {
                state.status= 'success';
                console.log(state.status);
            }) .addCase(uploadPdf.rejected, (state, action) => {
                state.status = "rejected";
                state.error = action.payload;
                console.log(state.error);
            }).addCase(getUserPdfs.pending,(state)=>{
                state.status='loading';
                console.log(state.status);
            }).addCase(getUserPdfs.fulfilled, (state,action) => {
                state.status = 'success';
             
                    
                state.pdf = action.payload;
                console.log(action.payload);
                    console.log("ssssssssssssssssssssssssssssssss");
            }).addCase(getUserPdfs.rejected, (state,action) => {
                state.status = 'rejected';
                state.error=action.payload;
                console.log(state.status);
            }).addCase(deletePdf.pending, (state) => {
                state.status = 'loading';
                console.log(state.status);
            }).addCase(deletePdf.fulfilled, (state) => {
                state.status = 'success';
                console.log(state.status);
            }).addCase(deletePdf.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.payload;
                console.log(state.status);
            })  
        }
    }

)
export default pdfSlice.reducer;