// Dependencies
const express = require('express');
const socketIo = require('socket.io-client');

// Environment (should be edited to your specific case)
require('dotenv').config()
const apiProtocol = process.env.PROTOCOL == 'websecure' ? 'https' : 'http';
const webSocketProtocol = process.env.PROTOCOL == 'websecure' ? 'wss' : 'ws';
const galiaHost = process.env.GALIA_HOST || 'gbe.atoptima.com';
const galiaPort = process.env.GALIA_PORT || 443;
const myHost = process.env.MY_HOST || 'http://localhost'; // Host of this (client) application
const myPort = process.env.MY_PORT || 3000; // Port of this (client) application
const applicationId = process.env.APPLICATION_ID || 'mock-app'; // Identifier of the Galia application
// Generate a token by loging-in to Galia
const accessToken = process.env.ACCESS_TOKEN || '';

// Build application
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/////////////// WEBHOOK BEGIN
// Endpoint to receive Galia results
app.post('/webhook/echo', (req, res) => {
    console.log('Received a new webhook result request');
    console.log(req.body);
    res.sendStatus(200);
})
/////////////// WEBHOOK END

/////////////// WEBSOCKET BEGIN
// Connect to server providing accessToken
const socket = socketIo.io(
    `${webSocketProtocol}://${galiaHost}:${galiaPort}`,
    {
        auth: {
            token: accessToken
        },
        transports: ['websocket']
    }
);

// Display message to make sure connection was successful
socket.on('connect', () => {
    const userId = socket.id;
    console.log(`User connected on Client with id: ${userId}`);
});

// Display the result when galia sends it through the socket
socket.on(applicationId, function(data) {
    console.log('Websocket: Received a new webhook result');
    console.log(data);
});

// Display the result when galia sends it through the socket
socket.on(`${applicationId}-recompute`, function(data) {
    console.log('Websocket: Received a new recompute result');
    console.log(data);
});
/////////////// WEBSOCKET END

// Start application
app.listen(myPort, () => {
    console.log(`Minimal Galia client app listening at ${myHost}:${myPort}`);
})
