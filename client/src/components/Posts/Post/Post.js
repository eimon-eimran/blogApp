import React from 'react'
import {Card,CardActions,CardContent,CardMedia,Button,Typography} from '@material-ui/core'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt'
import ThumbDownIcon from '@material-ui/icons/ThumbDownAlt'
import DeleteIcon from '@material-ui/icons/Delete'
import useStyles from './styles'
import moment from 'moment'
import {Link} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {deletePost, likePost, dislikePost} from '../../../actions/posts'

// import Postdetails from '../Postdetails/Postdetails'
import EditIcon from '@material-ui/icons/Edit';

export default function Post({post, setCurrentId}) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'))
    const editPost = () => {
        setCurrentId(post._id)
        dispatch({type : 'OPENDIALOG'})
    }
    return (
        <Card className={classes.card}>
        <CardMedia className={classes.media} image={post.selectedMedia} title={post.title}></CardMedia>
        
        
            <div className={classes.overlay}>
                <Typography variant="h6"> {post.title}</Typography>
                <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
            </div>
            <div className={classes.overlay2}>
                <Button style={{color:'white'}} size="small" disabled={user.result._id !== post.creator} onClick={() => editPost()}>
                    <EditIcon />
                </Button>
            </div>
            <div className={classes.details}>
                <Typography variant="body2" color="textSecondary">{post.tags.map(tag => `#${tag} `)}</Typography>
            </div>
            <Typography variant="h6" className={classes.title} gutterBottom> By {post.name}</Typography>
            <CardContent>

            </CardContent>
            <CardActions className={classes.cardActions}>
               <Button disabled={user.result._id === post.creator} size="small" color="primary" onClick={() => {dispatch(likePost(post._id))}}>
                    <ThumbUpAltIcon fontSize="small" />
                    &nbsp;
                      {post.likes.length}
                </Button> 

                <Button size="small" color="primary" disabled={user.result._id === post.creator} onClick={() => {dispatch(dislikePost(post._id))}}>
                    {post.dislikes.length}
                    &nbsp; 
                    <ThumbDownIcon fontSize="small" />
                </Button>
                <Button size="small" color="secondary" disabled={user.result._id !== post.creator} onClick={() => {dispatch(deletePost(post._id))}}>
                    <DeleteIcon fontSize="small" />
                    Delete
                </Button>
            </CardActions>
            <Link to={`/details/${post._id}`}>
            <Button variant="contained" color="primary" size="large" type="button" fullWidth><h5 style={{textDecoration: 'none'}}>Read This Blog</h5></Button>
            </Link>
        </Card>
    )
}
