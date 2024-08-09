import mongoose from "mongoose";

const bookingSchema = mongoose.Schema({
  username: {
    type: Object,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phonenum: {
    type: String, 
    required: true,
  },
  eventOccasion: {
    type: String,
    required: true,
  },
  services: {
    type: String,  
    required: true,
  },
  numPeople: {
    type: Number,
    required: true,
  },
  eventDate: {
    type: Date,  
    required: true,
  },
  startTime: {
    type: Date,  
    required: true,
  },
  endTime: {
    type: Date,  
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: false,  
  }
});

// Ensure that endTime is always after startTime
bookingSchema.pre('save', function(next) {
  if (this.endTime <= this.startTime) {
    return next(new Error('End time must be after start time.'));
  }
  next();
});

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;

