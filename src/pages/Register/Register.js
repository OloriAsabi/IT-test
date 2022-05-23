import React from 'react'
import "./Register.css"
import {
  Button,
  List,
  ListItem,
  Typography,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import Form from '../../components/Form';
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import  { auth } from '../../services/api'
import { createUserWithEmailAndPassword} from 'firebase/auth';
import { useRef } from 'react';
import { useState } from 'react';



const Register = ({ history }) => {
      const emailRef = useRef()
      const passwordRef = useRef()
      const passwordConfirmRef = useRef()
      const phoneRef = useRef()
      const nameRef = useRef();
     const [errors, setErrors] = useState({});


  const validate = ({ emailRef, passwordRef, phoneRef, nameRef}) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const phoneRegex =  /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/;
    if (!nameRef.current.value) {
      errors.nameRef = "Name is required!";
    }
    if (!emailRef.current.value) {
      errors.emailRef = "Email is required!";
    } else if (!regex.test(emailRef.current.value)) {
      errors.emailRef= "This is not a valid email format!";
    }
    if (!passwordRef.current.value) {
      errors.passwordRef = "Password is required";
    } else if (passwordRef.current.value.length < 4) {
      errors.passwordRef = "Password must be more than 4 characters";
    } else if (passwordRef.cuurent.value.length > 20) {
      errors.password = "Password cannot exceed more than 20 characters";
    }
    if (!phoneRef.current.value) {
      errors.phoneRef ='Phone Number is Required!!!'
    }else if (!phoneRegex.test(phoneRef.current.value)) {
      errors.phoneRef = "Invalid phone no"
    }
    return errors;
  };

 async function handleSubmit(e) {
        e.preventDefault()
       if (passwordRef.current.value !== passwordConfirmRef.current.value) {
        return "Passwords do not match";
      }
      setErrors(
        validate(emailRef.current.value, passwordRef.current.value, phoneRef.current.value, nameRef.cuurent.value)
        );
       try {
        await createUserWithEmailAndPassword(
          auth, emailRef.current.value, passwordRef.current.value, nameRef.current.value)
        history.push("/");
        alert ("User Created Successfully")
      } catch (error) {
        console.log(error)
        alert ("User created failed")
        alert(error);
      }
    }

  
  return (
    <div>
      <Form onSubmit={handleSubmit} className="section__padding">
        <Typography component="h5" variant="h5" className='app_form_text'>
         Create an account
        </Typography>
       <List className='app_form'>
         <div className='app_form_list'>
          <label className="app-form-label" htmlFor='email'>Your email address </label>      
                <input
                  id="email"
                  name="email"
                  type= 'email'
                  ref={emailRef}
                  className={`form-control ${errors.emailRef && "invalid"}`}
                 required={true} 
                ></input>
               {errors.emailRef && (
                <small className="text-danger">{errors.emailRef.message}</small>
              )} 
            </div>
            <div className='app_form_list'>
            <label className="app-form-label">Your password</label>
                <input
                  id="password"
                  type= 'password'
                  name="password"
                  autoComplete='off'
                  ref={passwordRef} 
                  className={`form-control ${errors.passwordRef && "invalid"}`}
                  required={true}
                  minLength= {4}
                  maxLength={20}
                ></input>
             {errors.passwordRef && (
                <small className="text-danger">{errors.passwordRef.message}</small>
              )}
         </div>
         <div className='app_form_list'>
         <label className="app-form-label">Confirm your password</label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type= 'password'
                  ref={passwordConfirmRef} 
                  autoComplete='off'
                  onPaste={(e) =>{
                    e.preventDefault();
                    return false
                   }}
                   className={`form-control ${errors.confirmPasswordRef && "invalid"}`}
                  required={true}
                />
         </div>
         <div className='app_form_list'>
             <label className="app-form-label">Your full name</label>
              <input
                name='name'
                type="text"
                ref={nameRef}
                className={`form-control ${errors.nameRef && "invalid"}`}
                required={true}
                />
              {errors.nameRef && (
                <small className="text-danger">{errors.nameRef.message}</small>
              )}
         </div>
         <div className='app_form_list'>
         <label className="app-form-label">Your phone number</label>
              <input
                name='number'
                type="text"
                ref={phoneRef}
                className={`form-control ${errors.phoneRef && "invalid"}`}
              />
              {errors.phoneRef && (
                <small className="text-danger">{errors.phoneRef.message}</small>
              )}
         </div> 
         <div className='app_form_list'>
          <FormControlLabel className="form-check"
              type="checkbox"
              name="selectCheckbox"
              id="selectCheckbox"
              control={<Checkbox />} 
              label="I read and agree Terms and Conditions"
             required= {true}
            />
         </div>
          <ListItem className='app_form_list'>
            <Button variant="contained" size='small' type="submit"  color="primary">
              Create an account
            </Button>
          </ListItem>
          <ListItem className='app_form_list'>
           Already have an account? {'  '}
            <Link to={'/login'}  className='link'>
              Login
            </Link>
          </ListItem>
        </List>
      </Form>
    </div>
  )
}

export default withRouter(Register)