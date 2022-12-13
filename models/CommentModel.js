import mongoose from "mongoose"

let Schema=new mongoose.Schema({
    text:{
        type:String,
        required:[true,"Provide The Review To Submit"]
    },
    userId:{
        type:mongoose.Types.ObjectId,
        ref:"BlogAppUsers",
    },
    blogId:{
        type:mongoose.Types.ObjectId,
        ref:"BlogAppBlogs"
    }
},
{timestamps:true}
)

export default mongoose.model("BlogAppComments",Schema)