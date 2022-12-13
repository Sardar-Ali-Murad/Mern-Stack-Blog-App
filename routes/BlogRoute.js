import express from "express"

let router=express.Router()

import {createBlog,getAllBlogs} from "../controllers/BlogController.js"
import UploadImage from "../controllers/UploadImage.js"

router.route("/").post(createBlog)
router.route("/:category").get(getAllBlogs)
router.route("/UploadImage").post(UploadImage)

export default router