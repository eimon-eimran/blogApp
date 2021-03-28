import React from 'react'
import './App.css';
import {Container} from '@material-ui/core'
import Navbar from './components/Navbar/Navbar';
import {BrowserRouter,Switch,Route} from 'react-router-dom'
import Auth from './components/Auth/Auth'
import Home from './components/Home/Home'
import AuthSignup from './components/AuthSignup/AuthSignup'
import Forms from './components/Forms/Forms'
import PostDetails from './components/Posts/Postdetails/Postdetails'

function App() {
  return (
    <BrowserRouter>
    <Container maxWidth='lg'>
      <Navbar />
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route exact path='/auth' component={Auth}/>
        <Route exact path="/auth/signup" component={AuthSignup} />
        <Route exact path="/create" component={Forms}/>
        <Route exact path="/details/:id" component={PostDetails} />
      </Switch>
    </Container>
    </BrowserRouter>
  );
}

export default App;
