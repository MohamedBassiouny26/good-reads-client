// server.js
const express = require('express');
var favicon = require('serve-favicon')


const app = express();
// Run the app by serving the static files
// in the dist directory
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))

app.use(express.static(__dirname + '/dist'));
// Start the app by listening on the default
// Heroku port
app.listen(process.env.PORT || 8080);