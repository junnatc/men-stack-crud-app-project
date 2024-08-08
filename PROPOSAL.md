# Project Proposal: Online Booking System

## Project Description

### Online Booking System

This project, "Online Booking System," is a web application designed to streamline the booking process for event services. Clients can book consultations, decor items, or full event services directly through the system. The application will support viewing available slots, modifying bookings, and canceling reservations, aiming to enhance client convenience and scheduling efficiency.

## Basic Elements

**Create Bookings:**
- Clients will be able to select and book consultations, decor items, or full event services through a user-friendly interface.

**View Availability:**
- The system will display available booking slots, decor options, and pricing information.

**Modify Bookings:**
- Clients can update their bookings, including changing dates or decor items.

**Cancel Bookings:**
- Clients will have the option to cancel their bookings if necessary.

## Stretch Goals

**Start Screen:**
- The system will have a start screen where clients can initiate the booking process.

**Booking Management:**
- Clients can manage their current bookings, including making modifications or cancellations.

**Confirmation and Notifications:**
- After booking, clients will receive immediate confirmation. Notifications will be sent for booking updates, modifications, or cancellations.

**Booking Status:**
- The system will handle booking statuses and provide reminders for upcoming events.

**Advanced Notifications:**
- Implement additional notifications and reminders for upcoming bookings to ensure clients are well-informed.

**Detailed Booking History:**
- Provide a feature for clients to view their booking history and detailed analytics.

**Payment Integration:**
- Integrate payment options for easy transactions during the booking process.

## Technologies Used

- **EJS**: Embedded JavaScript for templating and rendering dynamic content.
- **Express**: Web framework for Node.js to build the server-side application.
- **Node.js**: JavaScript runtime for building the backend.
- **JavaScript**: Programming language used for both frontend and backend development.
- **HTML**: Markup language for structuring the web pages.
- **CSS**: Styling language for designing and laying out web pages.
- **MongoDB**: NoSQL database for storing booking details, decor options, and client information.

## MVP User Stories

- As a user, I want to start the booking process from a start screen.
- As a user, I want to book consultations, decor items, or full event services easily.
- As a user, I want to view available slots, decor options, and pricing.
- As a user, I want to modify my bookings, such as changing dates or decor items.
- As a user, I want to cancel my bookings if necessary.
- As a user, I want to receive immediate confirmation and notifications about my bookings.

## Stretch Goals

- As a user, I want to receive additional notifications and reminders about upcoming bookings.
- As a user, I want to see detailed booking history and analytics.
- As a user, I want integration with payment options for easy transactions.

## Pseudocode

1. **Create HTML and CSS Scaffolding**
   - HTML will include sections for the booking form, availability calendar, booking management dashboard, and notifications.
   - Use CSS for styling and JavaScript for toggling visibility of these sections based on user actions.

2. **JavaScript**
   - Create two JS files: one for server-side interactions (using Express) and one for client-side functionality.
   
   - **Server-Side JS File (Express):**
     - Define routes and handle booking operations (create, update, cancel).
     - Connect to MongoDB to manage booking data.
     - Render views using EJS templates.

   - **Client-Side JS File:**
     - Handle user interactions and form submissions.
     - Update the UI based on server responses.
     - Implement client-side validations and dynamic content updates.

3. **Integration and Testing**
   - Integrate frontend and backend components.
   - Test all features for functionality and usability.

## Wire Frames

### **Starter Page**
<a href="https://ibb.co/59GshfN"><img src="https://i.ibb.co/5WW5ZH6/starter-page.jpg" alt="D87-C3-B36-9-B1-A-4-F01-A9-C5-3-FA4673-E9024" border="0" width ="500" height="500" /></a>

### **Booking Page**
<a href="https://ibb.co/djrhLMw"><img src="https://i.ibb.co/619dT1f/booking-Page.jpg" alt="486-D5768-AB33-474-D-9506-2-F73-EAEAFC2-D-1" border="0" width ="500" height="500"/></a>

### **Availability Calender Page**
<a href="https://ibb.co/djrhLMw"><img src="https://i.ibb.co/H2TS33z/calenderpage.jpg" alt="486-D5768-AB33-474-D-9506-2-F73-EAEAFC2-D-1" border="0" width ="500" height="500" /></a>


## RESTful Routing Conventions

| HTTP Method (Verb) | Path/Endpoint/URI     | CRUD Operation            | Route Name | Has Data Payload? | Purpose                                                                                            | Render/Redirect Action        |
| ------------------ | --------------------- | ------------------------- | ---------- | ----------------- | -------------------------------------------------------------------------------------------------- | ----------------------------- |
| POST               | `/users/signup`         | Creates a new user          | signup     | Yes       |  Handles creating a new user | `res.render('users/signup')` |
|POST                 | `/users/login`           | Reads user login info   | login | Yes   | Handles the users log in info to redirect them to the booking page | `res.redirect('/booking')` |
|GET  | `/users/logout` | Logs user out   |  logout  |  No | Logs the user out of their account  | `res.redirect('/users/login')` |
| GET                | `/booking`              | Read the starter page          | index      | No                | Renders a view that shows the starting page                                                                | `res.render('booking/index')`   |
| GET                | `/booking/:bookingID`      | Read a specific booking   | show       | No                | Renders a view that shows a specific booking                                                          | `res.render('booking/show')`    |
| GET                | `/booking/new`          | None                      | new        | No                | Renders a view including a form the user can fill out and submit to add a new booking                 | `res.render('booking/new')`     |
| GET                | `/booking/:bookingId/edit` | Read a specific booking | edit       | No                | Renders a view including a filled out form the user can edit and submit to update a specific booking  | `res.render('booking/edit')`    |
| POST               | `/booking`              | Create a new booking       | create     | Yes               | Handles the user submitting a form to create a new booking                                            | `res.redirect('/booking/:bookingID')` |
| PUT                | `/booking/:bookingId`      | Update a specific booking  | update     | Yes               | Handles the user submitting a form to update a specific booking                                      | `res.redirect('/booking/:bookingID')` |
| DELETE             | `/booking/:bookingId`      | Delete a specific booking  | delete     | No                | Handles the user request to delete a specific booking                                                | `res.redirect('/booking/:bookingID')` |

<a href="https://ibb.co/HYrpY4Q"><img src="https://i.ibb.co/bLrRLmn/Screenshot-2024-08-06-155814.png" alt="Screenshot-2024-08-06-155814" border="0" width="600" height="500" /></a>


## Project Timeline

| Day       | Task                                                             | Blockers | Notes/Thoughts                          |
|-----------|------------------------------------------------------------------|----------|----------------------------------------|
| Monday    | Complete proposal, create initial HTML/CSS scaffolding, start JS classes |          |                                        |
| Tuesday   | Finalize scaffolding, start core functionality development       |          |                                        |
| Wednesday | Develop booking management features                              |          |                                        |
| Thursday  | Implement UI components and notifications                         |          |                                        |
| Friday    | Conduct testing, refine features, and fix bugs                   |          |                                        |
| Saturday  | Work on stretch goals and additional enhancements                |          |                                        |
| Sunday    | Finalize styling, clean up code, and update documentation         |          |                                        |
| Monday    | Deploy the application and prepare for presentation               |          |                                        |

This project will demonstrate the ability to create a comprehensive online booking system that improves client experience and operational efficiency.
