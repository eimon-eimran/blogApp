 
import React, {useState} from 'react';
import { makeStyles , Typography, Grid, Box, Paper, Link, Checkbox, FormControlLabel, TextField, CssBaseline, Avatar,Button,} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {} from '@material-ui/core/styles';
import useStyles from './styles'
import {useHistory} from 'react-router-dom'
import {signin} from '../../actions/auth'
import {useDispatch} from 'react-redux'


export default function SignInSide() {
  const classes = useStyles();
  const [formData,setFormData] = useState({email: '', password: ''})
  const history = useHistory()
  const dispatch = useDispatch()
  const handleChange = (e) => {
    setFormData({...formData, [e.target.name] : e.target.value})
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signin(formData,history))
  }
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Log in
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={handleChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handleChange}
            />
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled= {formData.email === '' || formData.password === ''}
              className={classes.submit}
            >
              Log In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/auth/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}


// import React from 'react'
// import {Avatar,Button,Paper,Grid,Typography,Container} from '@material-ui/core'
// import useStyles from './styles' 
// import LockOutLinedIcon from '@material-ui/icons/LockOutlined'

// export default function Auth() {
//     const classes = useStyles()
//     const isSigned = false
//     return (
// <Container component="main" maxWidth="xs">
//         <Paper className={classes.paper} elevation={3}>
//             <Avatar className={classes.avatar}>
//                 <LockOutLinedIcon />
//             </Avatar>
//             <Typography variant="h5">{isSigned ? 'Log In' : 'Sign Up'}</Typography>
//         </Paper>
// </Container>
//     )
// }
