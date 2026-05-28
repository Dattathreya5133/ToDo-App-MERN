import './style/App.css'
import NavBar from './components/NavBar.jsx'
import { Routes, Route } from 'react-router-dom'
import AddTask from './components/AddTask.jsx'
import List from './components/List.jsx'
import UpdateTask from './components/UpdateTask.jsx'


function App() {

  return (
    <>
      <NavBar/>   
      <Routes>
        <Route path="/" element={<List/>}/>
        <Route path="/add" element={<AddTask/>} />
         <Route path="/update/:id" element={<UpdateTask/>} />
      </Routes>

    </>
  )
}

export default App