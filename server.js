import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import methodOverride from 'method-override';
import morgan from 'morgan';
import session from 'express-session';
import authController from './controllers/auth.js';
import {bookingRouter , index} from './controllers/bookingController.js';

dotenv.config();

const app = express();

// Set the port from environment variable or default to 3000
const port = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB', err));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(morgan('dev'));
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key',
  resave: false,
  saveUninitialized: false,
}));

// Set view engine and views directory
app.set('view engine', 'ejs');
app.set('views', './views'); // Ensure this is the correct path

// Routes
app.get('/', (req, res) => {
  res.render('index', { user: req.session.user || null });
});

app.use('/auth', authController);
app.use('/booking', bookingRouter); // Prefix routes with /booking

// Handle undefined routes
app.use((req, res, next) => {
  res.status(404).send('Not Found');
});

app.listen(port, () => {
  console.log(`The express app is ready on port ${port}!`);
});

