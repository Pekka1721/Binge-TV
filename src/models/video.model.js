import mongoose,{ Schema } from "mongoose";
import { boolean } from "webidl-conversions";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";


const videoSchema = new Schema({
    videofile:{
        type:String,
        required:true,
    },
    thumbnail:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    duration:{
        type:Number,
        required:true
    },
    views:{
        type:Number,
        default:0
    },
    published:{
        type:boolean,
        default:true
    },
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User",
    }
},{timestamps:true});
videoSchema.plugin(mongooseAggregatePaginate);
export const Video = mongoose.model("Video",videoSchema);