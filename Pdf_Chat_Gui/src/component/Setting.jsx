import { useDispatch, useSelector } from "react-redux";
import AppHeader from "./AppHeader";
import { useState } from "react";
import { AddModel } from "../axios/userRequstes";

const Setting = () => {
    const dispatch=useDispatch();
    const userId = useSelector((state) => state.user?.user?.id);
    const [modelName, setModelName] = useState("");
    const [apiKey,setApiKey] =useState("");
    function setModel() {
        dispatch(AddModel({ userId, modelName, apiKey }));
    }
    return (
        <div>
        <AppHeader />
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="text-center bg-white p-8 rounded-xl shadow-lg w-96 space-y-7">
                <h2 className="text-2xl font-bold text-center mb-6">Settings</h2>
                <input 
                type="text" 
                placeholder="Enter your model name"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" 
                value={modelName}
                onChange={(e)=>setModelName(e.target.value)}
                />
                <input type="text" placeholder="Enter your Api Key"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" 
                    value={apiKey}
                    onChange={(e)=>setApiKey(e.target.value)}
                    />

                <button type="button" onClick={setModel} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">Save Settings</button>
            </div>
        </div>
        </div>
    )
}
export default Setting;