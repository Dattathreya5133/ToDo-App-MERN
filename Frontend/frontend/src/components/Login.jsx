import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';


export default function Login(){
    const[userData,setUserData]=useState();
    const navigate = useNavigate()

    useEffect(()=>{
        if(localStorage.getItem('login')){
            navigate('/')
        }
    })
    const handleLogin = async()=>{
        console.log(userData);

        let result =await fetch ('https://todo-app-mern-hfgc.onrender.com/login',{
        method:'POST',
        body:JSON.stringify(userData),
        credentials:'include',
        headers:{
            'Content-Type':'Application/Json'
        }
    })
         
     result = await result.json()
    if(result.success){
        console.log(result);
        document.cookie="token="+result.token,
        localStorage.setItem('login',userData.email),
        window.dispatchEvent(new Event('localStorage-change'))
        navigate('/')
    }else{
        alert("try after sometime")
    }
    }
    
    return(<div className="container">
        <h1>Login</h1>
       
         <label htmlFor="">Email</label>
        <input onChange={(event)=>setUserData({...userData,email:event.target.value})}
        type="text" name="email" placeholder="Enter User Email"/>

         <label htmlFor="">Password</label>
        <input onChange={(event)=>setUserData({...userData,password:event.target.value})}
        type="password" name="password" placeholder="Enter User Password"/>
        <button onClick={handleLogin} className="submit">Login</button>
        <br/>
        <br/>
        <Link className="link" to="/signup">Sign Up</Link>
        
    </div>);
}
