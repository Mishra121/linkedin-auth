const express = require('express');
const session = require('express-session');
const passport = require('passport');
const mongoose = require('mongoose');
const LinkedInStrategy = require('passport-linkedin');

const key = require('./config/key');
var passportLinkedIn = require('./auth/linkedin');
const app = express();

mongoose.connect(key.MongoURI);

// Middleware //

app.use(session({
    secret: 'vibhu 123',
    resave: true,
    saveUninitialized: true
}));
 
app.use(passport.initialize());
app.use(passport.session());


// Routes //


app.get('/auth/linkedin', passportLinkedIn.authenticate('linkedin', {scope: ['r_basicprofile', 'r_emailaddress']}));

app.get('/auth/linkedin/callback',
  passportLinkedIn.authenticate('linkedin', { failureRedirect: '/login' }),
  (req, res) => {
    // Successful authentication
    res.redirect('/user-info');
  }   
);

app.get('/api/logout', (req, res)=> {
    req.logout();
    res.redirect('/');
});

app.get('/api/current_user', (req, res) => {
    res.send(req.user);
});


// To Use React as bundle in production
if(process.env.NODE_ENV === "production") {
    // Express will serve up production assets like main.js
    app.use(express.static('client/build'));
  
    // Express will serve up index.html file 
    // if doesn't recognize the routes
    const path = require('path');
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    });
}

// -------------------------------  //
var PORT = process.env.PORT || 3001;
app.listen(PORT, ()=> {
    console.log('app running');
});