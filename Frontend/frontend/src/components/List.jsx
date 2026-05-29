import { Fragment, useEffect, useState } from "react";
import '../style/list.css'
import { Link } from "react-router-dom";

export default function List() {
    const [taskData, setTaskData] = useState([]);
    const [selectedTask, setSelectedTask] = useState([]);

    useEffect(() => {
        getListData();
    }, [])

    const getListData = async () => {
        let list = await fetch('http://localhost:3300/tasks')
        list = await list.json()

        if (list.success) {
            setTaskData(list.result)
        }else{
            alert('Try After Sometime')
        }
    }

    const deleteTask = async (id) => {
    let item = await fetch(
        'http://localhost:3300//delete/' + id,
        {
            method: 'DELETE'
        }
    )

    item = await item.json()

    if (item.success) {
        getListData()
    }
}

    const selectAll = (event) => {
        if (event.target.checked) {
            let items = taskData.map((item) => item._id)
            setSelectedTask(items)
        } else {
            setSelectedTask([])
        }
    }

    const selectedSingleItem = (id) => {
        console.log(id);
        if (selectedTask.includes(id)) {
            let items = selectedTask.filter(
                (item) => item != id);
            setSelectedTask(items)
        } else {
            setSelectedTask([id, ...selectedTask])
        }
    }


    const deleteMultiple = async () => {

        console.log(selectedTask)

     let item = await fetch(
"http://localhost:3300/delete-multiple/",
{
    method:"DELETE",

    headers:{
        'Content-Type':'application/json'
    },

    body:JSON.stringify({
        ids:selectedTask
    })
});

        item = await item.json();
        if (item.success) {
            getListData();
            setSelectedTask([]);
        }else{
            alert('Try After Sometime')
        }
    }

    return (<div className="list-container">
        <h1>To Do List</h1>
        <button onClick={deleteMultiple} className="delete-item delete-multiple">Delete</button>
        <ul className="task-list">
            <li className="list-header"><input onChange={selectAll} type="checkbox" /></li>
            <li className="list-header">S.no</li>
            <li className="list-header">Title</li>
            <li className="list-header">Description</li>
            <li className="list-header">Action</li>


            {
                taskData && taskData.map((item, index) => (
                    <Fragment key={item._id}>
                        <li className="list-item"><input onChange={() => selectedSingleItem(item._id)} checked={selectedTask.includes(item._id)} type="checkbox" /></li>
                        <li className="list-item">{index + 1}</li>
                        <li className="list-item">{item.title}</li>
                        <li className="list-item">{item.description}</li>
                        <li className="list-item"><button onClick={() => deleteTask(item._id)} className="delete-item">DELETE</button>
                            <Link to={"update/" + item._id} className="update-item">Update</Link>
                        </li>
                    </Fragment>
                ))
            }
        </ul>
    </div>);

}