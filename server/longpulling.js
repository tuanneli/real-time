const express = require('express');
const cors = require('cors');
const events = require('events');
const {json} = require("express");

const PORT = 5000;
const emitter = new events.EventEmitter();

const app = express();

app.use(cors());
app.use(json());

app.get('/get-message', (req, res) => {
    emitter.once('newMessage', (message) => {
        console.log(message)

        res.json(message);
    })
})

app.post('/post-message', ((req, res) => {
    const message = req.body;
    emitter.emit('newMessage', message);
    console.log(message)
    res.status(200);
}))

app.listen(PORT, () => console.log(`SERVER HAS BEEN STARTED ON PORT ${PORT}`))