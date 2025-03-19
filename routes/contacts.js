const express = require('express'); // Import the Express module
const router = express.Router(); // Create a new router instance from Express to handle route definitions

// Import the contacts controller, which contains the logic for handling contact-related requests
const contactsController = require('../controllers/contacts');

// Define a GET route at the root path ('/')
// When a GET request is made to '/contacts'
// the getAll method from contactsController will be executed to fetch all contacts.
router.get('/', contactsController.getAll);

// Define a GET route with a dynamic parameter (':id')
// When a GET request is made to '/contacts/:id', the getSingle method from contactsController
// will be executed to fetch a single contact identified by the 'id' parameter.
router.get('/:id', contactsController.getSingle);

router.post('/', contactsController.createContact);

router.put('/:id', contactsController.updateContact);

router.delete('/:id', contactsController.deleteContact);

// Export the configured router so it can be used in the main application
module.exports = router;