require('dotenv').config()
const express = require('express');
const session = require('express-session');

const controller = require('./controller');
const middlewares = require('./middlewares');

const {SERVER_PORT, SESSION_SECRET, PASSWORD} = process.env;

const app = express()

app.use(session({
    saveUninitialized: true,
    resave: false,
    secret: SESSION_SECRET, 
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}))

app.use(express.json())

//middleware
app.post('/auth/login', (req, res) => {
    if(req.body.password === PASSWORD) {
        req.session.isAdmin = true
        res.sendStatus(200)
    } else {
        res.status(401).json("incorrect password dum dum")
    }
})

app.delete('/auth/logout', (req, res) => {
    req.session.destroy();
    res.status(200).json('you have been logged out')
})

app.use(middlewares.checkPassword)

//endpoints
app.get('/api/celebrity', controller.getCelebrity);
app.post('/api/celebrity', controller.addCelebrity);

app.listen(SERVER_PORT, () => {
    console.log(`Server running on ${SERVER_PORT}`)
});