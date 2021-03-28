import React,{useState, useEffect} from 'react'
import {Typography,Button,TextField,Paper,Dialog,DialogActions,DialogContent,DialogContentText,DialogTitle} from '@material-ui/core'
import useStyles from './styles'
import {useDispatch, useSelector} from 'react-redux'
import {createPost, updatePost} from '../../actions/posts'
import AddIcon from '@material-ui/icons/Add';


export default function Forms({currentId, setCurrentId}) {
    
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        dispatch({type : 'OPENDIALOG'})
    };
    const classes = useStyles();
    const dialogBox = useSelector(state => state.openDialog.dialogOpen)
    
    const post = useSelector(state => currentId ? state.posts.find(p => p._id === currentId) : null)
    const user = JSON.parse(localStorage.getItem('profile'))
    const [postData, setPostData] = useState({
        title : '',
        content: '',
        tags : '',
    })
    useEffect(() => {
        if(post) setPostData(post)
    },[post])

    const handleSubmit =(e) => { 
        e.preventDefault()
        if(currentId){
            dispatch(updatePost(currentId,{...postData, name: user?.result?.name}))
            setCurrentId(null)
            setPostData({
                title : '',
                content: '',
                tags : ''
            })
            setOpen(false) 
            dispatch({type : 'OPENDIALOG'})      
        }
        else{
            dispatch(createPost({...postData, name: user?.result?.name}))
            setPostData({
                title : '',
                content: '',
                tags : '',
                selectedFIle: ''
            })
            setOpen(false)
        }

    }

    if(!user?.result?.name){
        return(
            <Paper className={classes.paper}>
                <Typography>
                    Please Sign In To Create
                </Typography>
            </Paper>
        )
    }

    return (
        <div>
            <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
         <AddIcon /> Create Post
      </Button>
      <Dialog open={open || dialogBox} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{currentId ? 'Edit' : 'Create'} Blog</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Hello {user.result.name}, Welcome. This is mursalin araf, creator of this blog app. You can create your blog,
            preserve it and share it with others members. So what are you waiting for? Start Blogging. 
            Wish you very good luck
          </DialogContentText>
          <Paper className={classes.paper}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
            <TextField placeholder="Add Blog Title" name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({...postData, title: e.target.value}) }></TextField>
            <TextField placeholder="Add Your Content" multiline name="content" variant="outlined" label="Content" fullWidth value={postData.content} onChange={(e) => setPostData({...postData, content: e.target.value}) }></TextField>
            <TextField placeholder="Add Tags" name="tags" variant="outlined" label="Tags" fullWidth value={postData.tags} onChange={(e) => setPostData({...postData, tags: e.target.value}) }></TextField>    
            {
                postData.tags === '' || postData.title === ''  || postData.content === '' ? 
                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" disabled fullWidth>Submit</Button> 
                : <Button className={classes.buttonSubmit} variant="contained" color="primary" size="largeS" type="submit" fullWidth>Submit</Button>
            }

             
            </form>
        </Paper>
        </DialogContent>
        <DialogActions>
        <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
    </div>
    )
}
