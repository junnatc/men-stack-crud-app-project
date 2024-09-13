import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import methodOverride from 'method-override';
import morgan from 'morgan';
import session from 'express-session';
import authController from './controllers/auth.js';
import { bookingRouter, index } from './controllers/bookingController.js';
import eventsRouter from './controllers/eventsController.js'; 
import path from 'path';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.set('views', path.join(__dirname, 'views'));


mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB', err));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(morgan('dev'));
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key',
  resave: false,
  saveUninitialized: false,
}));

app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', (req, res) => {
  res.render('index', { user: req.session.user || null });
});

app.get('/mybookings', index);

app.use('/auth', authController);
app.use('/booking', bookingRouter);
app.use('/api', eventsRouter); 

bookingRouter.get('/success', (req, res) => {
  res.render('booking-success');
});

app.get('/calendar', (req, res) => {
  res.render('calendar');
});

app.use((req, res, next) => {
  res.status(404).send('Not Found');
});


app.listen(port, () => {
  console.log(`The express app is ready on port ${port}!`);
});
