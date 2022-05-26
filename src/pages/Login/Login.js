import React from 'react'
import {
  Button,
  List,
  ListItem,
  Typography,
} from '@mui/material';
import Form from '../../components/Form';
import { Redirect , withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import { useContext } from 'react';
import { AuthContext, useAuth } from '../../services/auth';
import { useState, useRef } from 'react';

const Login = ({ history }) => {

  const emailRef = useRef()
  const passwordRef = useRef()
  const { login } = useAuth()
  const [loading, setLoading] = useState(false)

  async function submitHandler(e) {
    e.preventDefault()
    try {
      setLoading(true)
      await login(emailRef.current.value, passwordRef.current.value)
      history.push("/")
    } catch {
      alert("Failed to log in")
    }

    setLoading(false)
  }

  const { currentUser } = useContext(AuthContext);
  if (currentUser) {
    return <Redirect to="/" />;
  };

  return (
    <div>
      <Form onSubmit={submitHandler} className="section__padding">
        <Typography component="h5" variant="h5" className='app_form_text'>
         Login into your account
        </Typography>
        <List className='app_form_list'>
          <div>
                <label className="app-form-label">Email</label>
                <input
                  id="email"
                  className={`form-control`}
                  ref={emailRef}
                ></input>
          </div>
          <div>
                <label className="app-form-label">Password</label>
                <input
                  id="password"
                  className={`form-control`}
                  autoComplete='off'
                  type='password'
                  ref={passwordRef}
                ></input>
    
          </div>
          <ListItem className='app_form_item'>
            <Button variant="contained" type="submit" size='samll' color="primary">
              Login
            </Button>
          </ListItem>
          <ListItem className='app_form_item'>
            Do not have an account? {'  '}
            <Link to='/register' className='link'>
              Register
            </Link>
          </ListItem>
        </List>
      </Form>
    </div>
  )
}

export default withRouter(Login);