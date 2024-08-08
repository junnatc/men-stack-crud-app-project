import express from "express";
import bcrypt, { hash } from 'bcrypt';

import User from '../models/user.js'

const authRouter = express.Router()

authRouter.get('/sign-up', async (req, res) => {
  res.render('auth/sign-up.ejs')
})

authRouter.get('/sign-in', async (req, res) => {
  res.render('auth/sign-in.ejs')
})

authRouter.get('/sign-out', async (req, res) => {
  req.session.destroy()
  res.redirect('/')
})

authRouter.post('/sign-up', async (req, res) => {
  // Check if the user exists
  const user = await User.findOne({ username: req.body.username })

  if (user) {
    res.send('User already exists')
  }

  // Check if the password matches confirm password
  if (req.body.password !== req.body.confirmPassword) {
    res.send('Password does not match Confirm Password')
  }

  // Hash the provided password using bcrypt, salt 10 times
  // and replace the req.body.password with the hashed password
  const hashedPassword = bcrypt.hashSync(req.body.password, 10)
  req.body.password = hashedPassword

  // Create a new User
  const newUser = await User.create(req.body)

  if (newUser) {
    res.redirect(`/auth/sign-in`)
  }
  else {
    res.send('Error creating a user.')
  }
})

authRouter.post('/sign-in', async (req, res) => {
  try {
    // Check if the user exists
    const user = await User.findOne({ username: req.body.username })

    if (!user) {
      res.send('User either does not exist, or you have provided the wrong credentials')
    }

    // Compare provided raw password, with the hashed password in the DB
    const validPassword = bcrypt.compareSync(req.body.password, user.password)

    if (!validPassword) {
      res.send('Error, the password was wrong!')
    }

    // There is a user AND they had the correct password. Time to make a session!
    // Avoid storing the password, even in hashed format, in the session
    // If there is other data you want to save to `req.session.user`, do so here!
    req.session.user = {
      username: user.username
    }

    res.redirect('/')
  } catch (error) {
    console.error('Was not able to sign in', error)
  }
})


export default authRouter