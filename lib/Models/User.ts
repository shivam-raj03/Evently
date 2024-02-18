import { Schema, models, model} from "mongoose";

const userSchema = new Schema({
    clerkId: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    userName: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true
    },
    photo: {
        type: String,
    },
    lastName: {
        type: String
    },
    likedEvents: [{ type: Schema.Types.ObjectId, ref: 'Event' }],

},
    {
        timestamps: true
    }
);

const User = models.User || model('User', userSchema);

export default User;