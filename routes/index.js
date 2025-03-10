// Import the Router function from Express and create a new router instance
const router = require('express').Router();

router.get('/', (req, res) => {
    res.send('To test Database cluster, go to "/contacts"<br><br>To test individual document go to "/contacts/{_id}" <br>Example _id: 67cca101ac48fd568c391abb');
});

// Mount the routes defined in the 'contacts' module to the '/contacts' path.
// This means any request to '/contacts' (or its subpaths) will be handled by the router in './contacts'
router.use('/contacts', require('./contacts'));

// Export the configured router so it can be used in the main application
module.exports = router;