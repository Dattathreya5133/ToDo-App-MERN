import { useState } from 'react';
import '../style/addtask.css'
import { useNavigate } from 'react-router-dom'; 


export default function AddTask(){
    const[taskData,setTaskData]=useState({
        title:"",
        description:""
    });
     const navigate = useNavigate()

   async function handleAddTask(){
        console.log(taskData);

        let result =await fetch ('http://localhost:3300/add-task',{
        method:'POST',
        body:JSON.stringify(taskData),
       headers:{
   'Content-Type':'application/json'
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
        <input onChange={(event)=>setTaskData({...taskData,title:event.target.value})} 
        type="text" name="title" placeholder="Enter task title"/>
        <label htmlFor="">Description</label>
        <textarea onChange={(event)=>setTaskData({...taskData,description:event.target.value})} 
        name="description" placeholder="enter task description" id=""></textarea> 
        <button onClick={handleAddTask} className="submit">ADD NEW TASK</button>
        
    </div>);
}

