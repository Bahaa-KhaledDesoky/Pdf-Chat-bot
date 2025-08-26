import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadPdf, getUserPdfs } from "../axios/pdfRequeste";
import { useNavigate } from "react-router";
import AppHeader from "./AppHeader";
const Dashboard = () => {
    const userId = useSelector((state) => state.user?.user?.id);
    const pdfs = useSelector((state) => state.pdf?.pdf || []);
    const [selectedFile, setSelectedFile] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type === "application/pdf") {
            setSelectedFile(file);
        }
    };
    useEffect(() => {
        if(!userId) return;
        dispatch(getUserPdfs({userId}));
    }, [userId]);

    const handleAddPdf = () => {
        if (selectedFile) {
            const formData = new FormData();
            formData.append("file", selectedFile);
            formData.append("userId", userId);
            formData.append("title", selectedFile.name);
            dispatch(uploadPdf({ pdfData: formData }))
                .unwrap()
                .then(() => {
                    dispatch(getUserPdfs({ userId }));
                    setSelectedFile(null);
                })
                .catch((error) => {
                    console.error("Upload failed:", error);
                });
        }
    };
    

    return (
        <div><AppHeader />
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            
            <h2 className="text-3xl font-bold mb-6">Welcome to the Dashboard!</h2>
            <div className="grid grid-cols-1 gap-6 mb-8 w-full max-w-xl">
                {pdfs.length === 0 && (
                    <div className="text-gray-500 text-center">No PDFs added yet.</div>
                )}
                {pdfs.map((pdf) => (
                    <div key={pdf.id} className="bg-white rounded-xl shadow-lg p-4 flex items-center">
                        
                        <div className="flex-1" onClick={() => navigate(`/chat`,{state: { pdfId: pdf.id ,pdfTitle: pdf.title ,pdfText: pdf.text}})}>
                            <h3 className="text-lg font-semibold">{pdf.title}</h3>
                        </div>
                    </div>
                ))}
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-xl text-center">
                <input
                    type="file"
                    accept="application/pdf"
                    onChange={handleFileChange}
                    className="mb-4"
                />
                {selectedFile && (
                    <div className="mb-2 text-gray-700">
                        Selected: {selectedFile.name}
                    </div>
                )}
                <button
                    onClick={handleAddPdf}
                    disabled={!selectedFile}
                    className={`w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition ${!selectedFile ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                    Add PDF
                </button>
            </div>
        </div>
        </div>
    );
};

export default Dashboard;