// Get dependencies
let express = require('express');
let path = require('path');
let http = require('http');
let bodyParser = require('body-parser');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let mongoose = require('mongoose');
require('dotenv').config();

//Live DB
// let mongoURI = process.env.MONGO_URI;
//Local
let mongoURI = process.env.MONGO_URI;

// import the routing file to handle the default (index) route
let index = require('./server/routes/app');

// ... ADD CODE TO IMPORT YOUR ROUTING FILES HERE ...
const documentsRoute = require('./server/routes/documents');
const contactsRoute = require('./server/routes/contacts');
const messagesRoute = require('./server/routes/messages');

let app = express(); // create an instance of express

// Tell express to use the following parsers for POST data //
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());

app.use(logger('dev')); // Tell express to use the Morgan logger

// Add support for CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, PUT, DELETE, OPTIONS'
  );
  next();
});

// Tell express to use the specified director as the
// root directory for your website
app.use(express.static(path.join(__dirname, 'dist/wdd430-project/browser')));

// Tell express to map the default route ('/') to the index route
app.use('/', index);

// ... ADD YOUR CODE TO MAP YOUR URL'S TO ROUTING FILES HERE ...
app.use('/documents', documentsRoute);
app.use('/contacts', contactsRoute);
app.use('/messages', messagesRoute);

/// Estabilish a connection to the MongoDB Database
async function connectDB() {
  try {
    await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to Database');
  } catch (err) {
    console.log('Connection failed: ' + err);
  }
}

// Tell express to map all other non-defined routes back to the index page
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/wdd430-project/browser/index.html'));
});

// Define the port address and tell express to use this port
const port = process.env.PORT || '3000';
app.set('port', port);

// Create HTTP server.
const server = http.createServer(app);

// Tell the server to start listening on the provided port
server.listen(port, function() {
  console.log('API running on localhost: ' + port)
});

connectDB();
