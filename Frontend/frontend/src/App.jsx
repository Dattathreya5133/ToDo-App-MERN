import './style/App.css'
import NavBar from './components/NavBar.jsx'
import { Routes, Route } from 'react-router-dom'
import AddTask from './components/AddTask.jsx'
import List from './components/List.jsx'
import UpdateTask from './components/UpdateTask.jsx'
import SignUp from './components/SignUp.jsx'
import Login from './components/Login.jsx'
import Protected from './components/Protected.jsx'


function App() {

  return (
    <>
      <NavBar/>   
      <Routes>
        <Route path="/" element={<Protected><List/></Protected>} />
        <Route path="/add" element={<Protected><AddTask/></Protected>} />
         <Route path="/update/:id" element={<UpdateTask/>} />
         <Route path="/signup" element={<SignUp/>} />
         <Route path="/login" element={<Login/>} />
      </Routes>

    </>
  )
}

export default App