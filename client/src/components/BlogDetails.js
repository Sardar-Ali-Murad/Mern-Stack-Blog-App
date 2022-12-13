import React from 'react'
import { useParams } from 'react-router-dom'
import { useAppContext } from '../context/appContext'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import moment from "moment"
import Alert from "./Alert"


const BlogDetails = () => {
    let {AllBlogs,allBlogs,user, uploadComment,isLoading,showAlert,SingleBlogComments,singleBlogComments}=useAppContext()
    let {blogId}=useParams()
    React.useEffect(()=>{
       AllBlogs()
       SingleBlogComments(blogId)
    },[])

    let currentBlog=allBlogs.find((all)=>all._id===blogId)
    // console.log(currentBlog)

    function submit(){
        uploadComment({text:value,blogId})
    }

    let [value,setValue]=React.useState("")
  return (
    <div className='section__padding'>
      <Card  className="detail__Card">
        <CardHeader
          avatar={
            <img src={currentBlog?.createdBy?.image}/>
          }

          action ={
             <Typography style={{marginTop:"20px",marginRight:"50px"}} variant='h4'>{currentBlog?.category}</Typography>
          }
          title={currentBlog?.createdBy?.name}
        subheader={moment(currentBlog?.createAt).format('MMMM d, YYYY')}
        />

        <img src={currentBlog?.image} style={{width:"100%",height:"400px"}}/>

        <CardContent stle={{width:"100%"}}>
        <Typography gutterBottom variant="h5" component="div">
          {currentBlog?.title}
        </Typography>
        <Typography  variant="body2" color="text.secondary">
          <p className='desc'>{currentBlog?.description}</p>
        </Typography>
      </CardContent>
      </Card>

      <Card className='detail__Card card__Detail__Comment' style={{marginTop:"30px"}}>
        {showAlert && <Alert/>}

      <CardHeader
        avatar={
          <img src={user?.image}/>
        }
       
        title={user.name}
        
      />

      <Typography gutterBottom variant="h5" component="div">
          Leave A Comment
        </Typography>


        <textarea onChange={(e)=>setValue(e.target.value)} placeholder='Enter the Comment' className='form-textarea form'></textarea>

        <Button onClick={submit} variant="contained" disabled={isLoading} style={{marginRight:"28%"}}>{isLoading?"subbmiting":"Submit"}</Button>
      </Card>

      <Card className='detail__Card' style={{marginTop:'40px'}}>
          <Typography variant='h5'>Here Are The Related Comments</Typography>
          {singleBlogComments.length ===0  && <Typography>No Reviews Yet Be The First One To Comment The Blog!!</Typography>}  
          {
            singleBlogComments.map((all)=>{
              return  <CardHeader
              style={{marginBottom:"20px"}}
              avatar={
                 <img src={all?.userId.image}/>
              }
             
              title={all?.text}
              subheader={moment(all?.createAt).format('MMMM d, YYYY')}
            />
            })
          }
      </Card>
    </div>
  )
}

export default BlogDetails
