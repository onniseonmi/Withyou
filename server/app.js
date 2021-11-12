const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const fs = require('fs');

// const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users.js');
const authRouter = require('./routes/auth.js');

const app = express();

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'OPTIONS', 'DELETE'],
  })
);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
app.use('/user', usersRouter);
app.use('/auth', authRouter);

module.exports = app;
