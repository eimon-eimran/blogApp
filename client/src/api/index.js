import axios from 'axios'

const API = axios.create({baseURL : 'http://localhost:5000'})

API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')){
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    }
    return req
})

export const fetchPosts = () => API.get('/posts')
export const fetchPost = (id) => API.get(`/posts/${id}`) 
export const createPost = (newPost) => API.post(`/posts`, newPost)
export const updatePost = (id, updatePost) => API.patch(`/posts/${id}`,updatePost)
export const deletePost = (id) => API.delete(`/posts/${id}`)
export const likePost = (id) => API.patch(`/posts/${id}/likePost`)
export const dislikePost = (id) => API.patch(`/posts/${id}/dislikePost`)
export const signup = (formData) => API.post('/user/signup', formData)
export const signin = (formData) => API.post('/user/signin', formData)
export const commentPost = (id, comment) => API.post(`/posts/${id}/comment`, comment) 


// const url = 'http://localhost:5000/posts'
// const authUrl = 'http://localhost:5000/user'

// export const fetchPosts = () => axios.get(url)
// export const fetchPost = (id) => axios.get(`${url}/${id}`)
// export const createPost = (newPost) => axios.post(url, newPost)
// export const updatePost = (id, updatePost) => axios.patch(`${url}/${id}`, updatePost)
// export const deletePost = (id) => axios.delete(`${url}/${id}`)
// export const likePost = (id) => axios.patch(`${url}/${id}/likePost`)
// export const dislikePost = (id) => axios.patch(`${url}/${id}/dislikePost`)
// export const signup = (formData) => axios.post(`${authUrl}/signup`, formData)
// export const signin = (formData) => axios.post(`${authUrl}/signin`, formData)
// export const commentPost = (id, comment) => axios.post(`${url}/${id}/comment`, comment)