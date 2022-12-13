import express from "express"


let router=express.Router()

import {createComment,getSingleBlogComments} from "../controllers/CommentController.js"

router.route("/").post(createComment)

router.route("/:blogId").get(getSingleBlogComments)

export default router

