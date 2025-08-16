import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// @GetMapping("/GetAllChat/{user_id}/{pdf_id}")
// public ResponseEntity <?> GetAllChat(@PathVariable Integer user_id, @PathVariable Integer pdf_id){
//     List < ChatMessageDTO > chat= chatService.GetAllChat(user_id, pdf_id);
//     return ResponseEntity.ok(chat);
// }
// @PostMapping("/getRespondFromAi")
// public ResponseEntity <?> getRespondFromAi(@RequestBody Message message){
//         String respond = chatService.getRespondFromAi(message);
//     return ResponseEntity.ok(respond);
// }

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
    'chat/getRespondFromAi', async ({ chats, pdf }, { rejectWithValue }) => {
        try {
            const respond = await axios.post(URL + '/getRespondFromAi', { chats, pdf });
            return respond.data;
        }
        catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);