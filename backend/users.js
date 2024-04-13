//ignore this file
//ignore this file
//ignore this file
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');

// Render Registration Page
router.get('/register', (req, res) => {
    res.render('register');
});

// Handle Registration Logic
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const newUser = new User({ username, email, password });
        await newUser.save();
        res.redirect('/users/login'); // Redirect to login after registration
    } catch (error) {
        res.status(500).render('register', { message: "Error registering user" });
    }
});

// Render Login Page
router.get('/login', (req, res) => {
    res.render('login');
});

// Handle Login Logic
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).render('login', { message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).render('login', { message: "Invalid credentials" });
        }
        req.session.userId = user._id;
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: true }).redirect('/'); // Redirect to homepage or dashboard
    } catch (error) {
        console.error("Error during login: ", error);
        res.status(500).render('login', { message: "Login error" });
    }
});

module.exports = router;
