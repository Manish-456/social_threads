import mongoose, { Mongoose, Schema } from 'mongoose';

const threadSchema = new Schema(
    {
    text : { type : String, require : true },
    author : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        require : true
    },
    community : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Community',
    },
    parentId : String,
    children : [
      {  type : mongoose.Schema.Types.ObjectId,
        ref : 'Thread'}
    ],
    
    }, {
        timestamps : true
    }
)

const Thread = mongoose.models.Thread || mongoose.model("Thread", threadSchema);
export default Thread;