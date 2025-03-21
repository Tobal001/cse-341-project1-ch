const express = require('express'); // Import the Express framework
const bodyParser = require('body-parser');
const mongodb = require('./data/database');// Import the custom MongoDB database module
const app = express(); // Create an instance of an Express application


// Determine the port to listen on. 
// Use the PORT environment variable if set, 
// otherwise default to 3000.
const port =process.env.PORT || 3000;

app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Origin',
        'Origin, X-Requested-With, Content-Type, Accept, Z-key'
    );
    res.setHeader('Access-Control-Allow-Origin', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});
// Mount the routes defined in the './routes' module at the root path ('/')
// This will handle incoming requests according to the routes defined in that module.
app.use('/', require('./routes'));
// Initialize the database connection using a custom method from the mongodb module.
// The callback is executed once the database initialization is complete.
mongodb.initDb((err) => {
    if (err) {
        console.log(err);
    }
    else {
         // If the database initializes successfully, start the server and listen on the specified port.
         // If the database initializes successfully, start the server and listen on the specified port.
        app.listen(port, () => {console.log(`Database is listening and node Running on port ${port}`)});
    }
});