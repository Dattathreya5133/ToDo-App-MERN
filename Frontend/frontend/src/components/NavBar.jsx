import { Link, Navigate, useNavigate } from 'react-router-dom'
import '../style/navbar.css'

function NavBar() {
  
  const navigate = useNavigate()

  return (
    <nav className='navbar'>
      
      <div className='logo'>To Do App</div>
      <ul className='navlinks'>
        <li><Link to="/">List</Link></li>
              <li><Link to="/add">Add Task</Link></li>

      </ul>
    </nav>
  )
}

export default NavBar


