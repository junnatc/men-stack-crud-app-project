import express from 'express';
import Booking from '../models/booking.js';

const bookingRouter = express.Router();

// Render the booking form
bookingRouter.get('/', (req, res) => {
  if (!req.session.user) {
    return res.redirect('/auth/sign-in'); // Redirect if not authenticated
  }
  res.render('booking'); // Render the 'booking.ejs' file
});

// Handle form submission
bookingRouter.post('/', async (req, res) => {
  try {
    const {
      username,
      name,
      email,
      phoneNum,
      eventOccasion,
      services,
      numPeople,
      eventDate,
      startTime,
      endTime,
      location,
      message
    } = req.body;

    // Convert date and time fields to proper format
    const formattedEventDate = new Date(eventDate);
    const formattedStartTime = new Date(`1970-01-01T${startTime}`);
    const formattedEndTime = new Date(`1970-01-01T${endTime}`);

    // Validate time range
    if (formattedEndTime <= formattedStartTime) {
      return res.send('End time must be after start time.');
    }

    // Create new booking
    const newBooking = new Booking({
      username,
      name,
      email,
      phonenum: phoneNum,
      eventOccasion,
      services,
      numPeople,
      eventDate: formattedEventDate,
      startTime: formattedStartTime,
      endTime: formattedEndTime,
      location,
      message
    });

    // Save to the database
    await newBooking.save();

    res.redirect('/booking/success'); // Redirect to a success page or another route
  } catch (error) {
    res.status(500).send(`Error: ${error.message}`);
  }
});
// Get all bookings
 const index = async (req, res) => {
  const allBookings = await Booking.find();
  res.render("mybookings", { bookings: allBookings });
  
}
export{index}
export default bookingRouter;
