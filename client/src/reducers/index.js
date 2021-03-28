import {combineReducers} from 'redux'

import posts from './posts'
import auth from './auth'
import openDialog from './openDialog'

export default combineReducers({
    posts, auth, openDialog
})