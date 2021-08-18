const express = require('express');

const app = express();

app.get('/', (req, res) => {
    console.log(req);
})

module.exports = app;