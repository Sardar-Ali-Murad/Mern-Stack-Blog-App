import Auth from "../models/Auth.js";

import BlogModel from "../models/BlogModel.js";

import {BadRequestError} from "../errors/index.js"

const createBlog=async (req,res)=>{
    let {image,title,description}=req.body

    if( !title || !description ){
        throw new BadRequestError("Please Provide All The Values")
    }
     req.body.createdBy=req.user.userId

     if(!image){
        throw new BadRequestError("Wait For The Image To Uplload Or Provide All The Credentials ")
     }

    let blog= await BlogModel.create({...req.body})

     res.status(200).json({blog})
}

const getAllBlogs=async (req,res)=>{
    let {category}=req.params
    // console.log(req.query.page)

    let queryObject={
        
    }
    
    if(category!=="All"){
        queryObject.category=category
    }
    // console.log(queryObject)

    let result= BlogModel.find(queryObject).populate("createdBy")

    result=result.sort({createdAt:-1})

    let limit=3
    let page=Number(req.query.page) 
    let skip=(page-1)*limit

    result=result.limit(limit).skip(skip)

    
    
    
    
    let blogs=await result
    
    let totalBlogs=await BlogModel.countDocuments(queryObject)
    let totalPages=Math.ceil(totalBlogs/limit)
    
    res.status(200).json({blogs,totalBlogs,totalPages})


}

export {getAllBlogs,createBlog}