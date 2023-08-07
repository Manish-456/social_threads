import mongoose, { Schema } from 'mongoose';

const communitySchema = new Schema(
    {
        id : {type : String, required : true},
        name : {type : String, required : true},
        communityname : {type : String, unique : true, require : true},
        image : {type : String, require : true},
        bio : String,
        createdBy : {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'User'
        },
        threads : [
            {
                type : mongoose.Schema.Types.ObjectId,
                ref : 'Thread'
            }
        ],
        members : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'User'
        }
        ]
    }
)

const Community = mongoose.models.Community || mongoose.model("Community", communitySchema);
export default Community;

