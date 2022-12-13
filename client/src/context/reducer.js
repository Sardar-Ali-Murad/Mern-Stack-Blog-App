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
  CREATE_COMMENT_ERROR,
  CREATE_COMMENT_SUCCESS,
  GET_SINGLE_BLOG_COMMENTS
} from './actions'

import { initialState } from './appContext'

const reducer = (state, action) => {
  if (action.type === DISPLAY_ALERT) {
    return {
      ...state,
      showAlert: true,
      alertType: 'danger',
      alertText: 'Please provide all values!',
    }
  }
  if (action.type === CLEAR_ALERT) {
    return {
      ...state,
      showAlert: false,
      alertType: '',
      alertText: '',
    }
  }

  if (action.type === SETUP_USER_BEGIN) {
    return { ...state, isLoading: true }
  }
  if (action.type === SETUP_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      token: action.payload.token,
      user: action.payload.user,
      showAlert: true,
      alertType: 'success',
      alertText: action.payload.alertText,
    }
  }
  if (action.type === SETUP_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg,
    }
  }

  if(action.type===LOGOUT_USER){
    return{
      ...initialState,
      token:null,
      user:null
    }
  }

  if(action.type===UPLOAD_IMAGE){
    return{
      ...state,
      image:action.payload.image
    }
  }

  if(action.type===HANDLE_CHANGE){
    return{
      ...state,
      [action.payload.name]:action.payload.value
    }
  }

  if(action.type===CLEAR_UPLOADS){
    return{
      ...state,
      blogTitle:"",
      blogCategory:"",
      blogDescription:""
    }
  }


  if(action.type===CHANGE_PAGE){
    return{
      ...state,
      currentPage:action.payload.page
    }
  }


  if(action.type===UPLOAD_IMAGE_REGISTER){
    return{
      ...state,
      registerImage:action.payload.image
    }
  }

  if(action.type===DELETE_IMAGE){
    return{
      ...state,
      image:""
    }
  }

  if(action.type===SUBMIT_BLOG_BEGIN){
    return{
      ...state,
      isLoading:true
    }
  }

  if(action.type===SUBMIT_BLOG_SUCCESS){
    return{
      ...state,
      isLoading:false,
      showAlert:true,
      alertType:"success",
      alertText:"The Blog is posted successfully"
    }
  }
  if(action.type===SUBMIT_BLOG_ERROR){
    return{
      ...state,
      isLoading:false,
      showAlert:true,
      alertType:"danger",
      alertText:action.payload.data
    }
  }

  if(action.type===GET_ALL_BLOGS){
    return{
      ...state,
      allBlogs:action.payload.data,
      totalBlogs:action.payload.Blogs,
      totalPages:action.payload.Pages
    }
  }

  if(action.type===CHANGE_FILTER_CATEGORY){
    return{
      ...state,
      filterCategory:action.payload.data,
      currentPage:1
    }
  }

  if(action.type===CREATE_COMMENT_BEGIN){
    return{
      ...state,
      isLoading:true
    }
  }

  if(action.type===CREATE_COMMENT_ERROR){
    return{
      ...state,
      isLoading:false,
      showAlert:true,
      alertType:"danger",
      alertText:action.payload.data
    }
  }


  if(action.type===CREATE_COMMENT_SUCCESS){
    return{
      ...state,
      isLoading:false,
      showAlert:true,
      alertType:"success",
      alertText:"Your Comment Is Subbmited Successfully"
    }
  }

  if(action.type===GET_SINGLE_BLOG_COMMENTS){
    return{
      ...state,
      singleBlogComments:action.payload.data
    }
  }

  throw new Error(`no such action : ${action.type}`)
}

export default reducer
