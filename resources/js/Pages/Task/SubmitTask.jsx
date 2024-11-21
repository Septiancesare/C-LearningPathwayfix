import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const SubmitTask = () => {
    const { id } = useParams();
    const [file, setFile] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);
        formData.append('task_id', id);

        axios.post(`/tasks/${id}/submit`, formData)
            .then((response) => {
                alert("Task submitted successfully!");
                window.location.href = '/tasks';
            })
            .catch((error) => {
                console.error("Error submitting task:", error);
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Submit Task</h1>
            <div>
                <label>File:</label>
                <input type="file" onChange={(e) => setFile(e.target.files[0])} required />
            </div>
            <button type="submit">Submit</button>
        </form>
    );
};

export default SubmitTask;
