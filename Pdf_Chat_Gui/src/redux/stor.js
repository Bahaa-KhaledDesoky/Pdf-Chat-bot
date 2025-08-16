import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "../redux/userSlice"
import pdfReducer from "../redux/pdfSclice";
import storage from "redux-persist/lib/storage";
import chatReducer from "../redux/chatSlice";
import { persistReducer, persistStore } from "redux-persist";

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["user", "pdf","chat"], // only these slices will be persisted
};

const rootReducer = combineReducers({
    user: userReducer,
    pdf: pdfReducer,
    chat:chatReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // needed because redux-persist stores non-serializable values
        }),
    
});

export const persistor = persistStore(store);