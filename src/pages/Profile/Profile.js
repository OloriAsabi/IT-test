import { Button, List, ListItem, Typography } from "@mui/material"
import React, { useRef, useState } from "react"
import { Link, useHistory } from "react-router-dom"
import Form from "../../components/Form"
import { useAuth } from "../../services/auth"

export default function Profile() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const { currentUser, updatePassword, updateEmail } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  function handleSubmit(e) {
    e.preventDefault()
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match")
    }

    const promises = []
    setLoading(true)
    setError("")

    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value))
    }
    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value))
    }

    Promise.all(promises)
      .then(() => {
        history.push("/")
      })
      .catch(() => {
        setError("Failed to update account")
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <>
        <div className="section__padding">
        <Typography component="h5" variant="h5" className='app_form_text'>
         Update Profile
        </Typography>
          {error && <small className="text-danger">{error}</small>}
          <Form onSubmit={handleSubmit}> 
          <List className='app_form'>
            <div id="email"  className='app_form_list'>
              <label  className="app-form-label" htmlFor='email'>Email</label>
              <input
                type="email"
                ref={emailRef}
                required
                autoComplete="on"
            // className={`form-control ${error.email && "invalid"}`}
                defaultValue={currentUser.email}
              />
            </div>
            <div id="password"  className='app_form_list'>
              <label className="app-form-label">Password</label>
              <input
                type="password"
                autoComplete="off"
                ref={passwordRef}
                placeholder="Leave blank to keep the same"
             // className={`form-control ${errors.password && "invalid"}`}
              />
            </div>
            <div id="password-confirm" className='app_form_list'>
              <label className="app-form-label">Password Confirmation</label>
              <input
                type="password"
                ref={passwordConfirmRef}
                placeholder="Leave blank to keep the same"
              />
            </div>
            <ListItem className='app_form_list'>
            <Button disabled={loading}  variant="contained" size='small' type="submit"  color="primary">
              Update
            </Button>
            </ListItem>
            </List>
          </Form>
        </div>
      <div className="w-100 text-center mt-2 section__padding">
        <Link to="/">Cancel</Link>
      </div>
    </>
  )
}