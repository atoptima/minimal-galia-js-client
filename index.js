// Dependencies
const express = require('express');
const io = require('socket.io-client');

// Environment (should be edited to your specific case)
const galiaHost = 'localhost';
const galiaPort = 3000;
const myHost = 'http://localhost'; // Host of this (client) application
const myPort = 3003; // Port of this (client) application
const applicationPath = 'roam-app'; // Identifier of the Galia application
// Generate a token by loging-in to Galia
const access_token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InZpdG9ybmVzZWxsb0BhdG9wdGltYS5jb20iLCJjb21wYW55IjoxLCJhcHBsaWNhdGlvbnMiOlsidHNwIiwibGFzdC1taWxlIiwibWVkaWNhbC10cmFuc3BvcnQiLCJtZWRpY2FsLXRyYW5zcG9ydC1zdCIsInNjaC13dC1kZW1vIiwibGFzdC1taWxlLWNhIiwibW9jay1hcHAiLCJsYXN0LW1pbGUtc3QiLCJyb2FtLWFwcCIsImRlbW8tYXBwIiwiYXJjLXJvdXRpbmciLCJhcHBvaW50bWVudC1yb3V0aW5nIiwicGlja3VwLWFuZC1kZWxpdmVyeSIsImNsYXNxdWluLWRlbW8iLCJjYXItcGFydHMtZGVsaXZlcnkiLCJjb250YWluZXItc2NoZWR1bGluZyJdLCJyb2xlIjoicm9vdCIsImlhdCI6MTYzMzU5ODkwNiwiZXhwIjoxNjMzNjg1MzA2LCJpc3MiOiJBdG9wdGltYSIsInN1YiI6IjQifQ.VzRK0oCMGpPc1V78xtNPjMqJAnmW12T7c80QigRGAUN5718jaKZ4iA4omSTrRNYLzWp6mx4rziPXvrbB3sg8L_nTz_hojDdFt0NhvshcLC2wZ2Nt0WMMj9RRFXYoFLcS-5V9dUMJeyIGfiKNuxPPj9vV89YhImGP5YfZr8mFQEbfrbkddQD5GS4u7wyDRk6h_HI0zUbwspAzA9BezbnxrTur5W-_WI8C7wqX0VoXLTC-YMXQ51RUkcD8rQuC9Bj6mKdhBOPmF5Tyesszld39hzWqpa1e35p91SaJgQcA2YNoWbysjmhT-rl2-XMWFAaYVQaaKHlarLmA7VhNu6bh5A';

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
// Connect to server providing access_token
const socket = io(
    `ws://${galiaHost}:${galiaPort}`,
    { query: { token: access_token } }
);

// Display message to make sure connection was succesful
socket.on('connect', () => {
    const userId = socket.id;
    console.log(`User connected on Client with id: ${userId}`);
});

// Display the result when galia sends it through the socket
socket.on(applicationPath, function(data) {
    console.log('Received a new websocket result');
    console.log(data);
});
/////////////// WEBSOCKET END

// Start application
app.listen(myPort, () => {
    console.log(`Minimal Galia client app listening at ${myHost}:${myPort}`);
})
