import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadPdf, getUserPdfs, deletePdf } from "../axios/pdfRequeste";
import { useNavigate } from "react-router";
import AppHeader from "./AppHeader";

const Dashboard = () => {
    const userId = useSelector((state) => state.user?.user?.id);
    const pdfs = useSelector((state) => state.pdf?.pdf || []);
    const [selectedFile, setSelectedFile] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [isDeleting, setIsDeleting] = useState(null);
    const [isDragOver, setIsDragOver] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type === "application/pdf") {
            setSelectedFile(file);
        } else if (file) {
            alert("Please select a PDF file");
        }
    };

    // Drag and drop handlers
    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragOver(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragOver(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragOver(false);
        
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            const file = files[0];
            if (file.type === "application/pdf") {
                setSelectedFile(file);
            } else {
                alert("Please drop a PDF file");
            }
        }
    };

    useEffect(() => {
        if (!userId) return;
        dispatch(getUserPdfs({ userId }));
    }, [userId]);

    const handleAddPdf = () => {
        if (selectedFile) {
            setIsUploading(true);
            const formData = new FormData();
            formData.append("file", selectedFile);
            formData.append("userId", userId);
            formData.append("title", selectedFile.name);
            dispatch(uploadPdf({ pdfData: formData }))
                .unwrap()
                .then(() => {
                    dispatch(getUserPdfs({ userId }));
                    setSelectedFile(null);
                    setIsUploading(false);
                })
                .catch((error) => {
                    console.error("Upload failed:", error);
                    setIsUploading(false);
                });
        }
    };

    function handleDelete(pdfId) {
        setIsDeleting(pdfId);
        dispatch(deletePdf({ pdfId }))
            .unwrap()
            .then(() => {
                dispatch(getUserPdfs({ userId }));
                setIsDeleting(null);
            })
            .catch((error) => {
                console.error("Delete failed:", error);
                setIsDeleting(null);
            }); 
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            <AppHeader />
            
            <div className="container mx-auto px-4 py-8">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">
                        Your PDF Library
                    </h1>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Upload and manage your PDF documents. Click on any PDF to start chatting with it.
                    </p>
                </div>

                {/* PDF List Section */}
                <div className="max-w-4xl mx-auto mb-12">
                    <div className="bg-white rounded-2xl shadow-xl p-8">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
                            <svg className="w-6 h-6 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                            </svg>
                            Your Documents ({pdfs.length})
                        </h2>

                        {pdfs.length === 0 ? (
                            <div className="text-center py-12">
                                <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                                    <svg className="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-medium text-gray-600 mb-2">No PDFs yet</h3>
                                <p className="text-gray-500">Upload your first PDF to get started</p>
                            </div>
                        ) : (
                            <div className="grid gap-4">
                    {pdfs.map((pdf) => (
                        <div
                            key={pdf.id}
                                        className="group bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 rounded-xl p-6 border border-blue-100 hover:border-blue-200 transition-all duration-300 transform hover:scale-[1.02] shadow-sm hover:shadow-md"
                        >
                                        <div className="flex items-center justify-between">
                                            {/* PDF Info */}
                            <div
                                className="flex-1 cursor-pointer"
                                onClick={() =>
                                    navigate(`/chat`, {
                                        state: { pdfId: pdf.id, pdfTitle: pdf.title, pdfText: pdf.text },
                                    })
                                }
                            >
                                                <div className="flex items-center">
                                                    <div className="w-10 h-12 bg-red-500 rounded-lg flex items-center justify-center mr-4 shadow-sm">
                                                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                                                        </svg>
                                                    </div>
                                                    <div>
                                                        <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                                                            {pdf.title}
                                                        </h3>
                                                        <p className="text-sm text-gray-500 mt-1">
                                                            Click to start chatting
                                                        </p>
                                                    </div>
                                                </div>
                            </div>

                            {/* Delete Button */}
                            <button
                                onClick={() => handleDelete(pdf.id)}
                                                disabled={isDeleting === pdf.id}
                                                className={`ml-4 px-4 py-2 rounded-lg transition-all duration-200 ${
                                                    isDeleting === pdf.id
                                                        ? 'bg-gray-300 cursor-not-allowed'
                                                        : 'bg-red-500 hover:bg-red-600 text-white shadow-sm hover:shadow-md transform hover:scale-105'
                                                }`}
                                            >
                                                {isDeleting === pdf.id ? (
                                                    <div className="flex items-center">
                                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                                        Deleting...
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center">
                                                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                                        </svg>
                                Delete
                                                    </div>
                                                )}
                            </button>
                                        </div>
                        </div>
                    ))}
                            </div>
                        )}
                    </div>
            </div>

                {/* Upload Section */}
                <div className="max-w-2xl mx-auto">
                    <div className="bg-white rounded-2xl shadow-xl p-8">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
                            <svg className="w-6 h-6 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            </svg>
                            Upload New PDF
                        </h2>

                        <div className="space-y-6">
                            {/* File Input */}
                            <div className="relative">
                <input
                    type="file"
                    accept="application/pdf"
                    onChange={handleFileChange}
                                    className="hidden"
                                    id="file-upload"
                                    disabled={isUploading}
                                />
                                <label
                                    htmlFor="file-upload"
                                    onDragOver={handleDragOver}
                                    onDragLeave={handleDragLeave}
                                    onDrop={handleDrop}
                                    className={`block w-full p-6 border-2 border-dashed rounded-xl text-center cursor-pointer transition-all duration-200 ${
                                        selectedFile
                                            ? 'border-green-300 bg-green-50'
                                            : isDragOver
                                            ? 'border-blue-400 bg-blue-50 scale-105'
                                            : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50'
                                    } ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                >
                                    <div className="flex flex-col items-center">
                                        <svg className={`w-12 h-12 mb-4 transition-colors duration-200 ${
                                            selectedFile 
                                                ? 'text-green-500' 
                                                : isDragOver 
                                                ? 'text-blue-500' 
                                                : 'text-gray-400'
                                        }`} fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                        </svg>
                                        <span className="text-lg font-medium text-gray-700">
                                            {selectedFile ? selectedFile.name : isDragOver ? 'Drop your PDF here' : 'Choose a PDF file'}
                                        </span>
                                        <span className="text-sm text-gray-500 mt-1">
                                            {selectedFile ? 'File selected' : 'or drag and drop'}
                                        </span>
                                    </div>
                                </label>
                    </div>

                            {/* Upload Button */}
                <button
                    onClick={handleAddPdf}
                                disabled={!selectedFile || isUploading}
                                className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-200 transform ${
                                    !selectedFile || isUploading
                                        ? 'bg-gray-300 cursor-not-allowed'
                                        : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl hover:scale-[1.02]'
                                }`}
                            >
                                {isUploading ? (
                                    <div className="flex items-center justify-center">
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                                        Uploading...
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-center">
                                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                        </svg>
                                        Upload PDF
                                    </div>
                                )}
                </button>
                        </div>
                    </div>
            </div>
        </div>
        </div>
    );
};

export default Dashboard;