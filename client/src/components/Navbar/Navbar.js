import React, { useEffect, useState } from 'react'
import {Typography, AppBar, Toolbar,  Button} from '@material-ui/core'
import useStyles from './styles'
import {Link} from 'react-router-dom'
import {useLocation,useHistory} from 'react-router-dom'
import {useDispatch} from 'react-redux'

export default function Navbar() {
    const classes = useStyles();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
    const history = useHistory()
    const location = useLocation()
    const dispatch = useDispatch()

    const navigateToHome = () => {
        history.push('/')
    }

    useEffect(() => {
        // const token = user?.token
        setUser(JSON.parse(localStorage.getItem('profile')))
    },[location])

    const logout = () => {
        dispatch({type : 'LOGOUT'})
        history.push('/auth')

        setUser(null)
    }

    return (
    <AppBar className={classes.appBar} position='static' color='inherit'>
        <div className={classes.brandContainer}>
        <Typography className={classes.heading} variant='h4' align='center' onClick={navigateToHome}>
            Writer House
        </Typography>
        </div>
        <Toolbar className={classes.toolbar}>
            {user ? (
                <div className={classes.profile}>
                    {/* <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.charAt(0)}</Avatar> */}
                    <Typography className={classes.userName} variant="h6"> {user.result.name}</Typography>
                    <Button variant="contained" color="secondary" onClick={logout}>Log Out</Button>
                </div>
            ) : (
                <Button component={Link} to="/auth" color="primary" variant="contained">Log In</Button>
            )}
        </Toolbar>
      </AppBar>
    )
}