import React from 'react';
import { Link, Head } from '@inertiajs/react';
import Authenticated from '@/Layouts/AuthenticatedLayout';

const TaskSubmission = ({ task, classroom, submissions }) => {
    return (
        <Authenticated>
            <Head title={`Submissions for ${task.title}`} />
            <div className="container mx-auto mt-10 p-6 bg-white shadow-md">
                <h1 className="text-2xl font-bold mb-4 text-center">
                    Submissions for Task: {task.title}
                </h1>

                {submissions.length === 0 ? (
                    <p className="text-center text-gray-500">No submissions yet.</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="border p-2">Student</th>
                                    <th className="border p-2">Submitted At</th>
                                    <th className="border p-2">Grade</th>
                                    <th className="border p-2">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {submissions.map((submission) => (
                                    <tr key={submission.id} className="hover:bg-gray-100">
                                        <td className="border p-2">{submission.user.name}</td>
                                        <td className="border p-2">
                                            {new Date(submission.created_at).toLocaleString()}
                                        </td>
                                        <td className="border p-2">
                                            {submission.grade ? `${submission.grade}/100` : 'Not graded'}
                                        </td>
                                        <td className="border p-2">
                                            <Link
                                                href={route('submissions.view', {
                                                    classroom: classroom.id,
                                                    task: task.id,
                                                    submission: submission.id
                                                })}
                                                className="text-blue-500 hover:underline"
                                            >
                                                View Submission
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </Authenticated>
    );
};

export default TaskSubmission;