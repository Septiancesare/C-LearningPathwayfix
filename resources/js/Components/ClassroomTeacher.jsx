// ClassroomTeacher.jsx
import React from 'react';

export default function ClassroomTeacher({ mapel, createdAt }) {
    return (
        <div className="container flex flex-col justify-center py-2">
            <div className="classroom bg-[#006DFF] bg-opacity-30 hover:bg-opacity-50 mx-8 rounded-md px-4 py-5 flex">
                <img
                    src="/images/classroom.png"
                    alt="classroom"
                    className="w-24"
                />
                <div className="classinfo px-7 py-2">
                    <h2 className="text-3xl tracking-wider font-bold pb-2">
                        {mapel}
                    </h2>
                    <p className="text-xl tracking-wide">
                        Created at {new Date(createdAt).toLocaleDateString()}
                    </p>
                </div>
            </div>
        </div>
    );
}
