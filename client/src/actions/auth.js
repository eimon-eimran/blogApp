import * as api from '../api/index'

export const signup = (user, history) => async (dispatch) => {
    try {
        const {data} = await api.signup(user)
        dispatch({type : 'SIGNUP', data})
        history.push('/')
    } catch (error) {
        console.log(error)
    }
}

export const signin = (formData, history) => async(dispatch) => {
        try {
            const {data} = await api.signin(formData)
            console.log(data)
            dispatch({type : 'SIGNIN', data})
            history.push('/')
        
        } catch (error) {
            console.log(error)
        }
}