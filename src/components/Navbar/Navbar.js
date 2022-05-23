import React from 'react';
import './Navbar.css';
import { Link } from "react-router-dom";
import { useAuth } from '../../services/auth';
import { Button } from '@mui/material';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

const Navbar = () => {
  const [error, setError] = useState("")
  const { currentUser, logout } = useAuth()
  const history = useHistory()

  async function handleLogout() {
    setError("")

    try {
      await logout()
      history.push("/login")
    } catch {
      setError("Failed to log out")
    }
  }

return (
  <>
  <nav className='app_navbar'>
   <div className='app_navbar-logo'>
    <h3><Link to='/'>IT</Link></h3>
   </div>
   <div className='app_navbar-login'>
    <Link to='/' className='p_opensans'>Home</Link>
    {currentUser ? ( <Link className='p_opensans'
    to='/profile'>{currentUser.email}</Link>  ) : (
    <Link to='/login' className='p_opensans'>Login</Link> )
    }
        <Button variant="contained" size='small' type="submit"
         className='p_opensans' onClick={handleLogout} color="primary">
               Log Out
          </Button>
   </div>
  </nav>
  </>
);
}
export default Navbar;
