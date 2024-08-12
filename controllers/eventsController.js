import express from 'express';
import Booking from '../models/booking.js'; // Adjust the path if necessary

const router = express.Router();

// Route to get all events
router.get('/events', async (req, res) => {
  try {
    const bookings = await Booking.find();
    const events = bookings.map(booking => {
      // Extract the first name from the name field
      const firstName = booking.name.split(' ')[0]; // Assumes the name is in "First Last" format
      return {
        title: `${firstName}'s ${booking.eventOccasion}`, // Format title with first name and event occasion
        start: booking.eventDate.toISOString().split('T')[0] + 'T' + booking.startTime.toISOString().split('T')[1].substring(0, 5),
        end: booking.eventDate.toISOString().split('T')[0] + 'T' + booking.endTime.toISOString().split('T')[1].substring(0, 5),
      };
    });
    res.json(events);
  } catch (error) {
    res.status(500).send(`Error: ${error.message}`);
  }
});

export default router;


