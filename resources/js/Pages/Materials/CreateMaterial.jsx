import React, { useState, useRef } from "react";
import ReactQuill from "react-quill";
import { useDropzone } from "react-dropzone";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import Authenticated from "@/Layouts/AuthenticatedLayout";

const CreateMaterial = ({ classroomId }) => {
    const [editorContent, setEditorContent] = useState("");
    const quillRef = useRef(null); // Reference for ReactQuill
    const [isSubmitting, setIsSubmitting] = useState(false); // Loading state

    const handleImageUpload = async (file) => {
        const formData = new FormData();
        formData.append("image", file);

        try {
            const response = await axios.post("/upload-image", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            if (response.data.url) {
                const fileUrl = response.data.url;
                const quill = quillRef.current.getEditor();
                const range = quill.getSelection();
                quill.insertEmbed(range.index, "image", fileUrl);
            } else {
                console.error("No URL returned from the server.");
            }
        } catch (error) {
            console.error("Error uploading image:", error);
        }
    };

    const { getRootProps, getInputProps } = useDropzone({
        accept: "image/jpeg, image/png, image/gif",
        onDrop: (acceptedFiles) => {
            const file = acceptedFiles[0];
            handleImageUpload(file);
        },
    });

    const handleEditorChange = (value) => {
        setEditorContent(value);
    };

    const handleSubmit = async () => {
        setIsSubmitting(true); // Set loading state
        try {
            await axios.post(`/classrooms/${classroomId}/materials/store`, {
                material_title: "New Material",
                class_id: classroomId,
                materials_data: editorContent,
            });
            alert("Material berhasil disimpan!");
        } catch (error) {
            console.error("Error submitting material:", error);
            alert("Terjadi kesalahan saat menyimpan material.");
        } finally {
            setIsSubmitting(false); // Reset loading state
        }
    };

    const handleCancel = () => {
        setEditorContent("");
    };

    const handleBack = () => {
        window.location.href = `/classrooms/page/${classroomId}`;
    };

    return (
        <Authenticated>
            <div className="mx-10 my-3">
                <h1 className="my-3 text-xl flex justify-center">
                    Create New Material
                </h1>
                <div
                    {...getRootProps()}
                    className="border border-dashed border-gray-400 p-4 text-center"
                >
                    <input {...getInputProps()} />
                    <p>
                        Drag 'n' drop some files here, or click to select files
                    </p>
                </div>
                <ReactQuill
                    ref={quillRef}
                    value={editorContent}
                    onChange={handleEditorChange}
                    placeholder="Write your material here..."
                    modules={{
                        toolbar: [
                            [{ header: "1" }, { header: "2" }, { font: [] }],
                            [{ list: "ordered" }, { list: "bullet" }],
                            ["bold", "italic", "underline"],
                            ["link", "image"],
                            [{ align: [] }],
                            [{ color: [] }, { background: [] }],
                            ["clean"],
                        ],
                    }}
                />

                <div className="flex justify-between mt-4">
                    <button
                        className="bg-gray-500 text-white px-4 py-2 rounded"
                        onClick={handleBack}
                    >
                        Back
                    </button>
                    <div className="flex space-x-2">
                        <button
                            className="bg-red-500 text-white px-4 py-2 rounded"
                            onClick={handleCancel}
                        >
                            Cancel
                        </button>
                        <button
                            className={`bg-green-500 text-white px-4 py-2 rounded ${
                                isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Submitting..." : "Submit"}
                        </button>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
};

export default CreateMaterial;
