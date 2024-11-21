import React, { useEffect, useState } from "react";
import axios from "axios";

const MaterialsPage = ({ classId }) => {
    const [materials, setMaterials] = useState([]);
    const [newMaterial, setNewMaterial] = useState({
        material_title: "",
        materials_data: "",
    });

    // Fetch materials
    useEffect(() => {
        axios.get(`/api/classrooms/${classId}/materials`).then((response) => {
            setMaterials(response.data);
        });
    }, [classId]);

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post("/api/materials", {
                ...newMaterial,
                class_id: classId,
            })
            .then((response) => {
                setMaterials([...materials, response.data]);
                setNewMaterial({
                    material_title: "",
                    materials_data: "",
                });
            })
            .catch((error) => {
                console.error("There was an error creating the material!", error);
            });
    };

    return (
        <div className="materials-page">
            <h2>Materials</h2>
            <ul>
                {materials.map((material) => (
                    <li key={material.id}>
                        <h3>{material.material_title}</h3>
                        <div dangerouslySetInnerHTML={{ __html: material.materials_data }} />
                    </li>
                ))}
            </ul>

            <form onSubmit={handleSubmit}>
                <div>
                    <label>Material Title:</label>
                    <input
                        type="text"
                        value={newMaterial.material_title}
                        onChange={(e) =>
                            setNewMaterial({ ...newMaterial, material_title: e.target.value })
                        }
                        required
                    />
                </div>
                <div>
                    <label>Material Data:</label>
                    <textarea
                        value={newMaterial.materials_data}
                        onChange={(e) =>
                            setNewMaterial({ ...newMaterial, materials_data: e.target.value })
                        }
                        required
                    />
                </div>
                <button type="submit">Add Material</button>
            </form>
        </div>
    );
};

export default MaterialsPage;
