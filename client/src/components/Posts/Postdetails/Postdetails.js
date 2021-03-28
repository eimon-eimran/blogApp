import React, { useEffect, useState } from 'react'
import {useParams, useHistory} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {useSelector} from 'react-redux'
import {getPost} from '../../../actions/posts'
import clsx from 'clsx';
import {Typography, TextField, IconButton, Collapse, CardActions, CardContent, CardHeader, Grid, Card, Button, } from '@material-ui/core'
import FavoriteIcon from '@material-ui/icons/Favorite';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import useStyles from './styles'
import moment from 'moment'
import {commentPost} from '../../../actions/posts'


export default function Postdetails() {
    const {id} = useParams()
    const dispatch = useDispatch()
    const history = useHistory()
    const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [comment, setComment] = useState('')
  const handleExpandClick = () => {
    setExpanded(!expanded);
  }

  const insertComment = () => {
    const getuser = JSON.parse(localStorage.getItem('profile'))
    const user = getuser.result.name
    dispatch(commentPost(id, comment, user))
    setComment('')
}

const navigateToHome = () => {
    let path = '/'
    history.push(path)
}

    useEffect(() => {
        dispatch(getPost(id))
            },[])

    const newPost = useSelector(state => state.posts)           
    console.log(newPost)        

    return (
        <>
        <Grid item xs={12} sm={12} >
        <Card className={classes.root}>
        <CardHeader
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={newPost.title}
          subheader={moment(newPost.createdAt).fromNow()}
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {newPost.content}
          </Typography> 
        </CardContent>

        <CardActions disableSpacing>
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent> 
              {(expanded && newPost) ? newPost.comments.map((comment,index) =>
                 <Typography key={index}>
                 {comment}
                 <hr />
                  <br />
                 </Typography>) : <p>Loading Data.. </p>  }
            <Grid xs={12} sm={12}>
               <Grid xs={6} sm={6}>
               <TextField name="comment" variant="outlined" label="Comment" fullWidth value={comment} onChange={(e) => setComment(e.target.value) }></TextField>
              </Grid>
              <br />
              <Grid xs={4} sm={2}>
              <Button variant="contained" color="secondary" size="small" type="button" onClick={() => insertComment()} fullWidth> Comment </Button>
              </Grid>   
            </Grid>     
          </CardContent>
        </Collapse>
      </Card>
      <br></br>
      <Button variant="contained" color="primary" size="large" type="button" onClick={() => navigateToHome()} fullWidth> Back To Home </Button>
      </Grid>
          
      </>
)
}

