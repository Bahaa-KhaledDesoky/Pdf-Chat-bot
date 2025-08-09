import React from "react";
import { useState } from "react";

const Dashboard = () => {
    const [file, setFile] = useState(null);
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };
    
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-xl shadow-lg w-96 text-center">
                <h2 className="text-3xl font-bold mb-4">Welcome to the Dashboard!</h2>
                <p className="text-gray-700 mb-6">
                    You have successfully logged in. This is your dashboard.
                </p>
                {/* Add more dashboard features/components here */}
                <input type="file" accept="application/pdf" onChange={handleFileChange} />
            </div>
        </div>
    );
};

export default Dashboard;