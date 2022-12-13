import React from 'react'
import "./index.css"
import Card from '@mui/material/Card';
import { useAppContext } from '../context/appContext';
import {  TextField } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import FormRow from "./FormRow"
import FormRowSelect from "./FormRowSelect"
import Button from '@mui/material/Button';
import Alert from "./Alert"

const UploadBlog = () => {
    let {uploadImage,uploadPin,isLoading,showAlert,image,deleteimage, changeFunction,blogTitle,blogCategory,blogDescription,clearuploads,    UploadBlog   }=useAppContext()

    
  

    function handleimage(event){
        uploadImage(event)
      }

      function deleteimageref(){
          let imageref=document.getElementById("standard-basic")
          if(imageref){
              imageref.value=""
            }
        deleteimage()
      }

      let array=["Education","Sports","Space","WebDevelopment"]

      function handleChange(event){
        changeFunction(event)
      }
  return (
    <div>
       <div className='upload__Main' style={{minHeight:"120vh"}}>
         <Card className="card" style={{marginTop:"00px"}}>
            <h1 className='h__Cormorant' style={{marginLeft:"40%",marginTop:"10px"}}>Upload Your Blog</h1>
          <div style={{width:"40%",marginTop:"4px",marginLeft:"28%"}}>
             {showAlert && <Alert />}
          </div>
            <p className='p__Sans' style={{margin:"6px"}}>Upload The Image</p>
            <div className='upload__Wrapper'>


              <div style={{marginRight:"60px",marginBottom:"40px",width:"50%"}}>
           {image && <img src={image} style={{height:"200px",width:"200px"}}/>}
              <div>
                 <TextField id="standard-basic"   variant="filled"    type="file"   onChange=   {handleimage}  style=       {{marginTop:"40px"}} className="imageref" /> 
                <DeleteIcon style={{color:"red",marginTop:"60px",cursor:"pointer"}} onClick={deleteimageref}/>
              </div>

              </div>
              {/* type, name, value, handleChange, labelText */}
              
              <div style={{width:"100%"}}>

                   <FormRow name="blogTitle"  type="text" value={blogTitle} handleChange={handleChange} labelText="Title"/>
                   <FormRowSelect name="blogCategory"  type="text" value={blogCategory} handleChange={handleChange} labelText="Category" list={array}/>

                    
                    {/* <p className='p__Sans'>Description</p> */}
                   <textarea onChange={handleChange} placeholder="Enter The Detailed Description" style={{outline:"none",background:"#f0f4f8",height:"200px",width:"100%"}} className='form-textarea form' name="blogDescription" value={blogDescription}></textarea>

                   <div style={{display:"flex",marginTop:"40px"}}>
                   <Button variant="outlined" style={{marginRight:"30px"}} onClick={()=>clearuploads()}>Clear</Button>
                   <Button variant="outlined" onClick={()=>UploadBlog()}>{isLoading?"Submiting":"Submit"}</Button>
                   </div>



                
              </div>


            </div>
            
         </Card>
       </div>
    </div>
  )
}

export default UploadBlog
