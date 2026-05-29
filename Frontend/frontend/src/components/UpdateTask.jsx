import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../style/addtask.css';

export default function UpdateTask() {

    const [taskData, setTaskData] = useState({
        title: "",
        description: ""
    });

    const navigate = useNavigate();

    const { id } = useParams();

    useEffect(() => {
        getTask();
    }, [id]);

    const getTask = async () => {

        let task = await fetch(
            'http://localhost:3300/task/' + id
        );

        task = await task.json();

        if (task.result) {
            setTaskData(task.result);
        }
    }

    const updateTask = async () => {

        console.log("function called", taskData);

        let task = await fetch(
            'http://localhost:3300/update-task/' + id,
            {
                method: 'PUT',
                body: JSON.stringify(taskData),
                headers:{
'Content-Type':'application/json'
}
            }
        );

        task = await task.json();

        if (task) {
            navigate('/');
        }
    }

    return (
        <div className="container">

            <h1>Update Task</h1>

            <label>Title</label>

            <input
                type="text"
                value={taskData.title}
                onChange={(event) =>
                    setTaskData({
                        ...taskData,
                        title: event.target.value
                    })
                }
                name="title"
                placeholder="Enter task title"
            />

            <label>Description</label>

            <textarea
                value={taskData.description}
                onChange={(event) =>
                    setTaskData({
                        ...taskData,
                        description: event.target.value
                    })
                }
                name="description"
                placeholder="enter task description" id=''/>

            <button onClick={updateTask} className="submit">
                UPDATE TASK
            </button>

        </div>
    )
}