const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');

const app = express();

// Development logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Set security HTTP headers
app.use(helmet());

// Limit requests from same API
const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests from this IP, please try again in an hour!'
});

app.use('/api', limiter);

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

// Data sanitization against XSS
app.use(xss());



module.exports = app;