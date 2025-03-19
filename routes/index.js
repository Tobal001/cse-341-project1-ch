// Import the Router function from Express and create a new router instance
const router = require('express').Router();

router.use('/', require('./swagger'));

router.get('/', (req, res) => {
    //#swagger.tags=['Hello World']
    res.send('Hello World');
});
// Mount the routes defined in the 'contacts' module to the '/contacts' path.
// This means any request to '/contacts' (or its subpaths) will be handled by the router in './contacts'
router.use('/contacts', require('./contacts'));

// Export the configured router so it can be used in the main application
module.exports = router;