import React from "react";

export default function Classroom({ classroom }) {
    return (
        <div className="container">
            <h1 className="text-2xl font-bold">{classroom.name}</h1>
            <p>Enroll Key: {classroom.enrollkeyment}</p>
            <h2 className="text-xl mt-4">Students</h2>
            <ul>
                {classroom.students.map((student) => (
                    <li key={student.id}>{student.name}</li>
                ))}
            </ul>
        </div>
    );
}
