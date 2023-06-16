const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotEnv = require('dotenv').config();

const userRouter = require('./routes/user');
const urlRouter = require('./routes/url');

const PORT = 8000
const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader("Access-control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "OPTION, GET, POST, PUT, PATCH, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-type, Authorization");
    next();
})

app.use("/user", userRouter);
app.use("/url", urlRouter);

app.use((error, req, res, next) => {
    console.log(error)
    const status = error.status || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
});

mongoose.connect(process.env.MONGO_URL)
    .then(res => {
        app.listen(PORT);
        console.log("App is Listening");
    })
    .catch(err => console.log(err));