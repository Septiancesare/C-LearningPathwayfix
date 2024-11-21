import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const TaskPage = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        axios.get('/tasks').then((response) => {
            setTasks(response.data.tasks);
        }).catch((error) => {
            console.error("Error fetching tasks:", error);
        });
    }, []);

    return (
        <div>
            <h1>Tasks</h1>
            <Link to="/tasks/create" className="btn btn-primary">Create New Task</Link>
            <ul>
                {tasks.map((task) => (
                    <li key={task.id}>
                        {task.title} - Deadline: {task.deadline}
                        <Link to={`/tasks/${task.id}/submit`}>Submit Task</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskPage;
