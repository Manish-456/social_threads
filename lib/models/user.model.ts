import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema(
    {
        id : {type : String, required : true},
        name : {type : String, required : true},
        username : {type : String, unique : true, require : true},
        image : {type : String, require : true},
        bio : String,
        threads : [
            {
                type : mongoose.Schema.Types.ObjectId,
                ref : 'Thread'
            }
        ],
        onboarded : {type : Boolean, default : false},
        communities : [
            {
                type : mongoose.Schema.Types.ObjectId,
                ref : "Community"
            }
        ]
    }
)

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;