// Required Modules
const express = require('express');
const path = require('path');
const hbs = require('hbs');
const session = require('express-session');
const passport = require('passport');
const mongoStore = require('connect-mongo')
require('dotenv').config();

// Initialize Express App
const app = express();

// ===== 1. MIDDLEWARE SETUP ===== //

// Static Files
app.use(express.static(path.join(__dirname, 'public')));

// Body Parser
app.use(express.urlencoded({ extended: true }));

// HBS View Engine Setup
app.set('view engine', 'hbs');
hbs.registerPartials(path.join(__dirname, '/views/partials'));

// ===== 2. SESSION SETUP (before Passport) ===== //
app.use(session({
    secret: 'keyboard cat', // Change in production
    resave: false,
    saveUninitialized: true,
    store: mongoStore.create({ mongoUrl: process.env.MONGO_URL }),// store in the db
    cookie: {
        maxAge: 24 * 60 * 60 * 1000 // 1 day in milliseconds
    } // Use false for localhost (not https)
}));
app.use(passport.initialize());
app.use(passport.session());
// ===== 3. PASSPORT SETUP (after session) ===== //
require('./Authorization/Auth'); // Ensure strategies are configured

// ===== 4. ROUTES ===== //
const loginRoute = require('./routes/login');
const signupRoute = require('./routes/signup');
const profileRoute = require('./routes/profile');
const { mongo, default: mongoose } = require('mongoose');

app.use('/signup', signupRoute);
app.use('/login', loginRoute);
app.use('/profile', profileRoute);

// ===== 5. GOOGLE OAUTH ROUTES ===== //
app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile'] })
);

app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    (req, res) => {
        req.session.user = req.user;
        res.redirect('/profile');
    }
);


const searchHandler = require('./routes/search');
app.use('/search', searchHandler);

const addData = require('./routes/addData')
app.use('/admin', addData);

// ===== 6. DEFAULT ROUTE ===== //
app.get('/', (req, res) => {
    if (!req.session.user) {
        return res.redirect('/login')
    }
    res.redirect('/profile')
})
app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.log("Logout error:", err);
        }
        res.redirect('/login');
    });
});

const searchName = require('./routes/searchName');
app.use('/searchName', searchName);

const deleteHandler = require('./routes/delete')
app.use('/delete', deleteHandler);

const nutritionHandler = require('./routes/total');
app.use('/findTotal', nutritionHandler);
// ===== 7. START SERVER ===== //
const PORT = 4000;
mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.log(err);
    })