import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MaterialsPage = ({ classId }) => {
    const [materials, setMaterials] = useState([]);

    useEffect(() => {
        // Fetch materials data for the classroom
        axios.get(`/api/classrooms/${classId}/materials`).then((response) => {
            setMaterials(response.data);
        });
    }, [classId]);

    return (
        <div>
            <h2>Materials</h2>
            {materials.length > 0 ? (
                <ul>
                    {materials.map((material) => (
                        <li key={material.id}>
                            <h3>{material.material_title}</h3>
                            {/* Display content using dangerouslySetInnerHTML to render HTML */}
                            <div dangerouslySetInnerHTML={{ __html: material.materials_data }} />
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No materials available</p>
            )}
        </div>
    );
};

export default MaterialsPage;
