// Import the custom MongoDB database module to access the database connection
const mongodb = require('../data/database');
// Import the ObjectId constructor from the MongoDB driver to handle document IDs
const ObjectId = require('mongodb').ObjectId;

//Asynchronously retrieves all contacts from the 'Contacts' collection
//in the 'Project01' database.
const getAll = async (req, res) => {
  //#swagger.tags=['Contacts']
    const result = await mongodb.getDatabase()
        .db('Project01')
        .collection('Contacts')
        .find();
    result.toArray().then((contacts) => {
            // Set the response header to indicate that the content is in JSON format.
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contacts);
    });
};

//Asynchronously retrieves a single contact by its unique ID from the 'Contacts' collection
//in the 'Project01' database.
const getSingle = async (req, res) => {
  //#swagger.tags=['Contacts']
    const contactId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase()
        .db('Project01')
        .collection('Contacts')
        .find({_id: contactId});
    result.toArray().then((contacts) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contacts[0]);
    });
};

const createContact = async (req, res) => {
  //#swagger.tags=['Contacts']
    try {
      const contact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
      };
      const response = await mongodb.getDatabase()
        .db('Project01')
        .collection('Contacts')
        .insertOne(contact);
  
      if (response.acknowledged) {
        // Return 201 Created with the new contact's ID
        return res.status(201).json({ id: response.insertedId });
      } else {
        return res.status(500).json(response.error || 'Some error occurred while creating the contact.');
      }
    } catch (error) {
      console.error('Error creating contact:', error);
      return res.status(500).json(error.message || 'Some error occurred while creating the contact.');
    }
  };
  

const updateContact = async (req, res) => {
  //#swagger.tags=['Contacts']
    try {
      const contactId = new ObjectId(req.params.id);
      const contact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
      };
  
      const response = await mongodb.getDatabase()
        .db('Project01')
        .collection('Contacts')
        .replaceOne({ _id: contactId }, contact);
  
      // Check if a document was found
      if (response.matchedCount === 0) {
        return res.status(404).json('Contact not found');
      }
  
      // Check if the document was actually modified
      if (response.modifiedCount > 0) {
        return res.status(204).send();
      } else {
        // Document found, but no change occurred (perhaps the same data was sent)
        return res.status(200).json('No changes made to the contact.');
      }
    } catch (error) {
      console.error('Error updating contact:', error);
      return res.status(500).json(error.message || 'Some error occurred while updating the user.');
    }
  };
  

const deleteContact = async (req, res) => {
  //#swagger.tags=['Contacts']
    const contactId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase()
      .db('Project01')
      .collection('Contacts')
      .deleteOne({ _id: contactId });
    if(response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occured while updating the user.');
    }
};

// Export the controller functions so they can be used in route definitions.
module.exports = {
    getAll,
    getSingle,
    createContact,
    updateContact,
    deleteContact
};