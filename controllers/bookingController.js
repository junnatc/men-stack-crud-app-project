import express from 'express';
import Booking from '../models/booking.js';
import User from '../models/user.js'; // Import the User model

const bookingRouter = express.Router();

// Function to convert a time string in 24-hour format to 12-hour format
function convertTo12Hour(time) {
  const [hours, minutes] = time.split(':').map(Number);
  const period = hours >= 12 ? 'PM' : 'AM';
  const hours12 = hours % 12 || 12; // Convert to 12-hour format
  return `${hours12}:${minutes.toString().padStart(2, '0')} ${period}`;
}

const index = async (req, res) => {
  if (!req.session.user) {
    return res.redirect('/auth/sign-in'); // Redirect if not authenticated
  }

  try {
    const username = req.session.user.username; 
    const userBookings = await Booking.find({ username }); // Fetch bookings only for the logged-in user

    // Convert times to 12-hour format
    const formattedBookings = userBookings.map(booking => ({
      ...booking.toObject(), // Convert Mongoose document to plain object
      startTime: convertTo12Hour(booking.startTime.toISOString().substring(11, 16)),
      endTime: convertTo12Hour(booking.endTime.toISOString().substring(11, 16))
    }));

    res.render('mybookings', { bookings: formattedBookings, username });
  } catch (error) {
    res.status(500).send(`Error: ${error.message}`);
  }
};

bookingRouter.get('/', (req, res) => {
  if (!req.session.user) {
    return res.redirect('/auth/sign-in'); // Redirect if not authenticated
  }
  res.render('booking'); 
});

// Handle form submission for creating a new booking
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
    const formattedStartTime = new Date(`1970-01-01T${startTime}:00Z`);
    const formattedEndTime = new Date(`1970-01-01T${endTime}:00Z`);

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

    // Save the new booking to the database
    const savedBooking = await newBooking.save();

    // 1. Grab the new booking ID and update the current user's bookings array
    const user = await User.findOne({ username });
    if (user) {
      user.bookings.push(savedBooking._id); // Add the new booking ID to the user's bookings array
      await user.save(); // Save the updated user document
    } else {
      console.error('User not found');
      return res.status(404).send('User not found');
    }

    // 2. Redirect to a success page or another route
    res.redirect('/booking/success');
  } catch (error) {
    res.status(500).send(`Error: ${error.message}`);
  }
});

// Render the edit form
bookingRouter.get('/edit/:id', async (req, res) => {
  try {
    const bookingId = req.params.id;
    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).send('Booking not found');
    }

    // Convert times to 24-hour format for the form
    const formattedStartTime = booking.startTime.toISOString().substring(11, 16);
    const formattedEndTime = booking.endTime.toISOString().substring(11, 16);

    res.render('editBooking', {
      booking: {
        ...booking.toObject(),
        startTime: formattedStartTime,
        endTime: formattedEndTime
      }
    });
  } catch (error) {
    res.status(500).send(`Error: ${error.message}`);
  }
});

// Handle form submission for updating a booking using PUT method
bookingRouter.put('/edit/:id', async (req, res) => {
  try {
    const bookingId = req.params.id;
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
    const formattedStartTime = new Date(`1970-01-01T${startTime}:00Z`);
    const formattedEndTime = new Date(`1970-01-01T${endTime}:00Z`);

    // Validate time range
    if (formattedEndTime <= formattedStartTime) {
      return res.send('End time must be after start time.');
    }

    // Update booking
    const updatedBooking = await Booking.findByIdAndUpdate(
      bookingId,
      {
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
      },
      { new: true } // Return the updated document
    );

    if (!updatedBooking) {
      return res.status(404).send('Booking not found');
    }

    res.redirect('/mybookings'); // Redirect to a success page or another route
  } catch (error) {
    res.status(500).send(`Error: ${error.message}`);
  }
});

// Handle DELETE request for deleting a booking
bookingRouter.delete('/delete/:id', async (req, res) => {
  console.log(`Received DELETE request for ID: ${req.params.id}`); // Debugging
  try {
    const bookingId = req.params.id;
    const deletedBooking = await Booking.findByIdAndDelete(bookingId);

    if (!deletedBooking) {
      return res.status(404).send('Booking not found');
    }

    res.redirect('/mybookings'); // Redirect to a page showing all bookings
  } catch (error) {
    res.status(500).send(`Error: ${error.message}`);
  }
});

export { index, bookingRouter };
