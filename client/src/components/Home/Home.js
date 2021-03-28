import React, {useState,useEffect} from 'react'
import {Grid, Grow, Container} from '@material-ui/core'
import Posts from '../Posts/Posts'
import Form from '../Forms/Forms'
import {useDispatch} from 'react-redux'
import {getPosts} from '../../actions/posts'


export default function Home() {

    const [currentId, setCurrentId] = useState(null)
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(getPosts())
    },[currentId,dispatch])

    return (
        <Grow in>
        <Container>
            <Grid item xs={12} sm={4} >
                 <Form currentId={currentId} setCurrentId={setCurrentId} />
              </Grid>
              <br />          
            <Grid container justify='space-between' alignItems='stretch' spacing={3}>
              <Grid item xs={12} sm={11} >
                 <Posts setCurrentId={setCurrentId} />
              </Grid>
            </Grid>
        </Container>
      </Grow>
    )
}
