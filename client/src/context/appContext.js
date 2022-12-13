import React, { useReducer, useContext } from 'react'

import reducer from './reducer'
import axios from 'axios'

import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  SETUP_USER_BEGIN,
  SETUP_USER_SUCCESS,
  SETUP_USER_ERROR,
  LOGOUT_USER,
  UPLOAD_IMAGE,
  HANDLE_CHANGE,
  CLEAR_UPLOADS,
  CHANGE_PAGE,
  UPLOAD_IMAGE_REGISTER,
  DELETE_IMAGE,
  SUBMIT_BLOG_BEGIN,
  SUBMIT_BLOG_ERROR,
  SUBMIT_BLOG_SUCCESS,
  GET_ALL_BLOGS,
  CHANGE_FILTER_CATEGORY,
  CREATE_COMMENT_BEGIN,
  CREATE_COMMENT_SUCCESS,
  CREATE_COMMENT_ERROR,
  GET_SINGLE_BLOG_COMMENTS
 
} from './actions'

const token = localStorage.getItem('token')
const user = localStorage.getItem('user')


const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: '',
  alertType: '',
  user: user ? JSON.parse(user) : null,
  token: token,
  image:"",
  totalPages:1,
  page:1,
  registerImage:"",
  blogTitle:"",
  blogCategory:"",
  blogDescription:"",
  blogDate:null,
  filterCategory:"All",
  allBlogs:[],
  totalBlogs:null,
  totalPages:null,
  currentPage:1,
  singleBlogComments:[]

}

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const authFetch = axios.create({
    baseURL: '/api/v1',
  })
  // request

  authFetch.interceptors.request.use(
    (config) => {
      config.headers.common['Authorization'] = `Bearer ${state.token}`
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )
  // response

  authFetch.interceptors.response.use(
    (response) => {
      return response
    },
    (error) => {
      // console.log(error.response)
      // if (error.response.status === 401) {
      //   logoutUser()
      // }
      return Promise.reject(error)
    }
  )


  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT })
    }, 3000)
  }

  const addUserToLocalStorage = ({ user, token }) => {
    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('token', token)
    
  }

  const removeUserFromLocalStorage = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  
  }

  const setupUser = async ({ currentUser, endPoint, alertText }) => {
    dispatch({ type: SETUP_USER_BEGIN })
    try {
      const { data } = await axios.post(`/api/v1/auth/${endPoint}`, currentUser)

      const { user, token } = data
      dispatch({
        type: SETUP_USER_SUCCESS,
        payload: { user, token, alertText },
      })
      addUserToLocalStorage({ user, token })
    } catch (error) {
      dispatch({
        type: SETUP_USER_ERROR,
        payload: { msg: error.response.data.msg },
      })
    }
    clearAlert()
  }

  
  const uploadImageForRegister=async (event)=>{
    const imageFile = event.target.files[0];
    console.log(imageFile)
    const formData = new FormData();
    formData.append('image',imageFile)
    try {
    //  const {data:{image:{src}}} = await axios.post("/api/v1/post/upload"

     const {data:{image:{src}}} = await authFetch.post("/auth/registerUploadImage"
    
     ,formData,{
      headers:{
       'Content-Type':'multipart/form-data'
      }
     }
     )
     dispatch({type:UPLOAD_IMAGE_REGISTER,
      payload:{
        image:src
      }
    })

    console.log(src)
    } catch (error) {
      
     console.log(error.response.data.msg);
    }
  }

  function deleteimage(){
    dispatch({type:DELETE_IMAGE})
  }


  const UploadBlog=async ()=>{
    dispatch({type:SUBMIT_BLOG_BEGIN})

    try {
      await authFetch.post("/blogs",{image:state.image,title:state.blogTitle,description:state.blogDescription,category:state.blogCategory})
      dispatch({type:SUBMIT_BLOG_SUCCESS})
    } catch (error) {
      
      dispatch({type:SUBMIT_BLOG_ERROR,payload:{data:error.response.data.msg}})
    }
    clearAlert()
  }

  

  function logoutUser(){
    dispatch({type:LOGOUT_USER})
    removeUserFromLocalStorage()
  }



  const uploadImage=async (event)=>{
    const imageFile = event.target.files[0];
    const formData = new FormData();
    formData.append('image',imageFile)
    try {
    //  const {data:{image:{src}}} = await axios.post("/api/v1/post/upload"

     const {data:{image:{src}}} = await authFetch.post("/blogs/UploadImage"
    
     ,formData,{
      headers:{
       'Content-Type':'multipart/form-data'
      }
     }
     )
     dispatch({type:UPLOAD_IMAGE,
      payload:{
        image:src
      }
    })

    console.log(src)
    } catch (error) {
      
     console.log(error.response.data.msg);
    }
  }

  const AllBlogs=async ()=>{
    try {
      let {data}=await authFetch(`/blogs/${state.filterCategory}?page=${state.currentPage}`)
      dispatch({type:GET_ALL_BLOGS,payload:{data:data.blogs,Blogs:data.totalBlogs,Pages:data.totalPages}})
      // console.log(data)
    } catch (error) {
      console.log(error.response.data.msg)
    } 
  }

  
  const uploadComment=async ({text,blogId})=>{
    dispatch({type:CREATE_COMMENT_BEGIN})
    try {
      await authFetch.post("/blogs/comments",{text,blogId})
      dispatch({type:CREATE_COMMENT_SUCCESS})
    } catch (error) {
      dispatch({type:CREATE_COMMENT_ERROR,payload:{data:error.response.data.msg}})
    }
    clearAlert()
    SingleBlogComments(blogId)
  }

  const SingleBlogComments=async (blogId)=>{
    try {
      let {data}=await authFetch(`/blogs/comments/${blogId}`)
      console.log(data)
      dispatch({type:GET_SINGLE_BLOG_COMMENTS,payload:{data:data.reviews}})
    } catch (error) {
      console.log(error.response.data.msg)
    }
  }


  function changeCategory(category){
      dispatch({type:CHANGE_FILTER_CATEGORY,payload:{data:category}})
      // AllBlogs()
  }

  function changeFunction(e){
    dispatch({type:HANDLE_CHANGE,
    payload:{
      name:e.target.name,
      value:e.target.value
    }})
  }


  function clearuploads(){
    dispatch({type:CLEAR_UPLOADS})
  }



  function changepage(page){
      dispatch({type:CHANGE_PAGE,payload:{page:page}})
  }


  
 




  

  return (
    <AppContext.Provider
      value={{
        ...state,
        setupUser,
        logoutUser,
        uploadImage,
        changeFunction,
        clearuploads,
        changepage,
        uploadImageForRegister,
        deleteimage,
        UploadBlog    ,
        AllBlogs,
        changeCategory,
        uploadComment,
        SingleBlogComments
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

const useAppContext = () => {
  return useContext(AppContext)
}

export { AppProvider, initialState, useAppContext }
