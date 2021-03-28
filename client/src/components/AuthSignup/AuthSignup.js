import React, { useState } from 'react';
import {Avatar,Button,CssBaseline,Typography,TextField,Container,Link,Grid} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import useStyles from './styles'
import {useHistory} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {signup} from '../../actions/auth' 


export default function SignUp() {
  const classes = useStyles();
  const [formData,setFormData] = useState({firstName: '', lastName: '', email: '', password: '', confirmPassword: ''}) 
  const history = useHistory()
  const dispatch = useDispatch()
  const handleChange = (e) => {
    setFormData({
      ...formData, [e.target.name] : e.target.value
    })
  }


  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(signup(formData,history))
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate onClick={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                onChange={handleChange}
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
              onChange={handleChange}
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
              onChange={handleChange}
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
              onChange={handleChange}
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={handleChange}
                variant="outlined"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={formData.firstName === '' || formData.lastName === '' || formData.email === '' || formData.password === '' || formData.password !== formData.confirmPassword}
            className={classes.submit}
          >
            Sign Up
          </Button>
        </form>
         

        <Grid container justify="flex-end">
            <Grid item>
              <Link href="/auth" variant="body2">
                Already have an account? Log in
              </Link>
            </Grid>
          </Grid>
      </div>
    </Container>
  );
}