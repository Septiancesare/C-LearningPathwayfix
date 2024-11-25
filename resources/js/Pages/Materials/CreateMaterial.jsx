import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import Authenticated from "@/Layouts/AuthenticatedLayout";

const CreateMaterial = ({ classroomId }) => {
    const [materialTitle, setMaterialTitle] = useState(""); // Untuk judul materi
    const [materialContent, setMaterialContent] = useState(""); // Untuk konten materi
    const [isSubmitting, setIsSubmitting] = useState(false); // Loading state
    const [uploadedImageUrl, setUploadedImageUrl] = useState(""); // Untuk URL gambar yang diunggah

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
                setUploadedImageUrl(response.data.url);
                alert("Gambar berhasil diunggah!");
            } else {
                console.error("No URL returned from the server.");
            }
        } catch (error) {
            console.error("Error uploading image:", error);
            alert("Gagal mengunggah gambar.");
        }
    };

    const { getRootProps, getInputProps } = useDropzone({
        accept: "image/jpeg, image/png, image/gif",
        onDrop: (acceptedFiles) => {
            const file = acceptedFiles[0];
            handleImageUpload(file);
        },
    });

    const handleSubmit = async () => {
        if (!materialTitle || !materialContent) {
            alert("Judul dan konten materi tidak boleh kosong.");
            return;
        }

        setIsSubmitting(true); // Set loading state
        try {
            await axios.post(`/classrooms/${classroomId}/materials/store`, {
                material_title: materialTitle,
                class_id: classroomId,
                materials_data: materialContent,
                image_url: uploadedImageUrl,
            });
            alert("Material berhasil disimpan!");
            setMaterialTitle("");
            setMaterialContent("");
            setUploadedImageUrl("");
        } catch (error) {
            console.error("Error submitting material:", error);
            alert("Terjadi kesalahan saat menyimpan material.");
        } finally {
            setIsSubmitting(false); // Reset loading state
        }
    };

    const handleCancel = () => {
        setMaterialTitle("");
        setMaterialContent("");
        setUploadedImageUrl("");
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
                        Drag 'n' drop an image here, or click to select an image
                    </p>
                </div>
                {uploadedImageUrl && (
                    <div className="mt-2">
                        <p>Uploaded Image:</p>
                        <img
                            src={uploadedImageUrl}
                            alt="Uploaded"
                            className="max-w-xs"
                        />
                    </div>
                )}
                <div className="mt-4">
                    <label className="block mb-2 font-semibold">Title:</label>
                    <input
                        type="text"
                        className="w-full border rounded px-3 py-2"
                        value={materialTitle}
                        onChange={(e) => setMaterialTitle(e.target.value)}
                        placeholder="Enter material title"
                    />
                </div>
                <div className="mt-4">
                    <label className="block mb-2 font-semibold">Content:</label>
                    <textarea
                        className="w-full border rounded px-3 py-2"
                        rows="10"
                        value={materialContent}
                        onChange={(e) => setMaterialContent(e.target.value)}
                        placeholder="Write your material content here..."
                    />
                </div>
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
