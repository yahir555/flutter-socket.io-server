const express = require('express');
const path = require('path');
require('dotenv').config();

// Initialize express app
const app = express();

// node server
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require('./sockets/socket');




// Path público
const publicPath = path.resolve(__dirname, 'public');
app.use(express.static(publicPath));

// Start server
server.listen(process.env.PORT, (err) => {
    if (err) throw new Error(err);
    console.log('Server running on port', process.env.PORT);
});
