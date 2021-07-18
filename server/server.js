// Main starting point of the application
require('dotenv').config()
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const router = require('./router');
const connectDB= require('./config/mongoose')
const cors = require('cors');
const port = process.env.PORT || 3090;

// DB Setup (connect mongoose and instance of mongodb)
connectDB();
const arr = express();
// App Setup (morgan and body-parser are middleware in Express)
app.use(morgan('combined'));  // middleware for logging
app.use(bodyParser.json({ type: '*/*' }));  // middleware for helping parse incoming HTTP requests
app.use(cors());  // middleware for circumventing (规避) cors error

// // Router Setup
// router(app);
// // Server Setup
// const server = http.createServer(app);
app.use('/',router);
// 3. heroku Setup
if(process.env.NODE_ENV == 'production'){
    app.use(express.static("client/build"));
}
app.listen(port);
// server.listen(port);
console.log('Server listening on: ', port);