import React from 'react'
import "./Register.css"
import {
  Button,
  List,
  ListItem,
  Typography,
  FormControlLabel,
  Checkbox,
  TextField,
} from '@mui/material';
import Form from '../../components/Form';
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import  { auth } from '../../services/api'
import { createUserWithEmailAndPassword} from 'firebase/auth';
import { useRef } from 'react';
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form';

const Register = ({ history }) => {
      const emailRef = useRef()
      const passwordRef = useRef()
      const passwordConfirmRef = useRef()
      const phoneRef = useRef()
      const nameRef = useRef();

      const {
        handleSubmit,
        formState: { errors },
        trigger, 
        register, 
        watch
      } = useForm();

 async function onhandleSubmit(data) {
      //  if(e) e.preventDefault();
      //  if (passwordRef !== passwordConfirmRef) {
      //   alert("Passwords don't match", { variant: 'error' });
      //   return;
      // }
      console.log(data)
       try {
        await createUserWithEmailAndPassword(
          auth, data.email, data.password, data.name, data.phone)
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
      <Form onSubmit={handleSubmit(onhandleSubmit)} className="section__padding">
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
                  className={`form-control ${errors.email && "invalid"}`}
                 required={true} 
                 {...register("email", { 
                  required: "Email is Required!!!" ,
                 pattern: {
                   value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                   message: "Invalid email address",
                 }})}
                 error={Boolean(errors.email)}
                 onKeyUp={() => {
                   trigger("email");
                 }}
                ></input>
               {errors.email && (
                     <small className="text-danger">{errors.email.message}</small>
                 )}
            </div>
            <div className='app_form_list'>
            <label className="app-form-label">Your password</label>
                <input
                  name='password'
                  id="password"
                  type= 'password'
                  autoComplete='off'
                  className={`form-control ${errors.password && "invalid"}`}
                  required={true}
                  {...register("password", { 
                    required: "You must specify a password",
                  pattern: {
                    value: '^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$',
                    message: "Password should contain atleast one number and one special character",
                  },
                  minLength: {
                  value: 8,
                  message: "Password must be more than 8 characters"
                  },
                  maxLength: {
                    value: 20,
                    message: "Password must be less than 20 characters"
                    },
                  })}
                  onKeyUp={() => {
                    trigger("password");
                  }}
                  error={Boolean(errors.password)}
                ></input>
             {errors.password && (
                <small className="text-danger">{errors.password.message}</small>
              )}
         </div>
         <div className='app_form_list'>
         <label className="app-form-label">Confirm your password</label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type='password'
                  {...register( 'confirmPassword', {
                    validate: value =>
                      value === watch("password", "") || "The passwords do not match"
                  })}  
                  autoComplete='off'
                  onPaste={(e) =>{
                    e.preventDefault();
                    return false
                   }}
                   error={Boolean(errors.confirmPassword)}
                   className={`form-control ${errors.confirmPassword && "invalid"}`}
                  required={true}
                  onKeyUp={() => {
                    trigger("confirmPassowrd");
                  }}
                />
                 {errors.confirmPassword && (
                <small className="text-danger">{errors.confirmPassword.message}</small>
              )}
         </div>
         <div className='app_form_list'>
             <label className="app-form-label">Your full name</label>       
              <input
                name='name'
                type="name"
                className={`form-control ${errors.name && "invalid"}`}
                required={true} 
                defaultValue=""
                {...register("name", { required: "Fullname is Required!!!" })}
                onKeyUp={() => {
                  trigger("name");
                }}
                />
              {errors.name && (
                <small className="text-danger">Fullname is Required!!!</small>
              )}
         </div>
         <div className='app_form_list'>
         <label className="app-form-label">Your phone number</label> 
              <input
                name='phone'
                type="text"
                className={`form-control ${errors.phone && "invalid"}`}
                error={Boolean(errors.phone)}
                {...register("phone", { 
                  required: "Phone Number is Required!!!",
                  pattern: {
                    value: /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/,
                    message: "Invalid phone no",
                  },
                })}
                onKeyUp={() => {
                  trigger("phone");
                }}
              />
              {errors.phone && (
                <small className="text-danger">Phone Number is Required!!!</small>
              )}
         </div> 
         <div className='app_form_list'>
          <FormControlLabel className="form-check"
              type="checkbox"
              name="selectCheckbox"
              id="selectCheckbox"
              control={<Checkbox />} 
              label="I read and agree Terms and Conditions"
              required={true}
              {...register("ChooseCb", {
                validate: (e) => {
                  if(!e)
                  { 
                    return alert('Please accept the terms and condition')
                    }}
              })}
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