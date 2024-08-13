import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    bookings: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Booking'  
    }]
});

const User = mongoose.model('User', userSchema);

export default User;
