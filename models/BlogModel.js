import mongoose from "mongoose"

let Schema=new mongoose.Schema({
    image:{
        type:String,
        required:[true,"Please Provide the image or wait to upload"]
    },
    title:{
        type:String,
        required:[true,"Please Provide the title"],
        minlength:10
    },
    description:{
        type:String,
        required:[true,"Please Provide the description"]
    },
    category:{
        type:String,
         enum:["Education","Sports","Space","WebDevelopment"],
         required:[true,"Provide the category"]
    },
    createdBy:{
      type:mongoose.Types.ObjectId,
      ref:"BlogAppUsers"
    },
},
{timestamps:true}
)

export default mongoose.model("BlogAppBlogs",Schema)