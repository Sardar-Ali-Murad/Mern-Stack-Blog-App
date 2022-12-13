import {BadRequestError} from "../errors/index.js"

import { StatusCodes } from "http-status-codes"

import BlogModel from "../models/BlogModel.js"

import Auth from "../models/Auth.js"

import CommentModel from "../models/CommentModel.js"


const createComment=async (req,res)=>{
    let {text,blogId}=req.body
    
    if(!blogId || !text){
        throw new BadRequestError("Please Provide All The Values")
    }

    req.body.userId=req.user.userId

    let AlreadyExists=await CommentModel.findOne({userId:req.user.userId,blogId:blogId})

    if(AlreadyExists){
        throw new BadRequestError("Your Comment Alraedy Exists")
    }

    let blog=await CommentModel.create({...req.body})

    res.status(StatusCodes.CREATED).json({blog})
}

const getSingleBlogComments=async (req,res)=>{
    let {blogId}=req.params

    if(!blogId){
        throw new BadRequestError("Please Provide the Blog Id")
    }

    let reviews=await CommentModel.find({blogId:blogId}).populate("userId")

    res.status(StatusCodes.OK).json({reviews})
}

export {createComment,getSingleBlogComments}