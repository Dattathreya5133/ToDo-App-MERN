import { useState } from 'react';
import '../style/addtask.css'
import { useNavigate } from 'react-router-dom'; 

function AddTask(){
    const[taskData,setTaskData]=useState();
    const navigate = useNavigate()

   async function handleAddTask(){
        console.log(taskData);

        let result =await fetch ('https://todo-app-mern-hfgc.onrender.com/add-task',{
        method:'Post',
        body:JSON.stringify(taskData),
        credentials:'include',
       headers:{
   authorization: localStorage.getItem("token")
}
    })
         
     result = await result.json()
    if(result.success){
        navigate("/")
        console.log("new task added");
    }else{
        alert("Try After sometime")
    }

    }
     

    return(<div className="container">
        <h1>Add Task</h1>
        <label htmlFor="">Title</label>
        <input onChange={(event)=>setTaskData({...taskData,title:event.target.value})} type="text" name="title" placeholder="Enter task title"/>
        <label htmlFor="">Description</label>
        <textarea onChange={(event)=>setTaskData({...taskData,description:event.target.value})} name="description" placeholder="enter task description" id=""></textarea> 
        <button onClick={handleAddTask} className="submit">ADD NEW TASK</button>
        
    </div>);
}

export default AddTask