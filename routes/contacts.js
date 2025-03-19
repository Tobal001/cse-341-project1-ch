const express = require('express');
const router = require('express').Router();

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

module.exports = router;