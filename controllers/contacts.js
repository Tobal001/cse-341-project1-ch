// Import the custom MongoDB database module to access the database connection
const mongodb = require('../data/database');
// Import the ObjectId constructor from the MongoDB driver to handle document IDs
const ObjectId = require('mongodb').ObjectId;

//Asynchronously retrieves all contacts from the 'Contacts' collection
//in the 'Project01' database.
const getAll = async (req, res) => {
    // Access the 'Project01' database and the 'Contacts' collection, then perform a find query for all documents.
    const result = await mongodb.getDatabase().db('Project01').collection('Contacts').find();
        // Convert the cursor result to an array.
    result.toArray().then((contacts) => {
            // Set the response header to indicate that the content is in JSON format.
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contacts);
    });
};

//Asynchronously retrieves a single contact by its unique ID from the 'Contacts' collection
//in the 'Project01' database.
const getSingle = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db('Project01').collection('Contacts').find({_id: userId});
    result.toArray().then((contacts) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contacts[0]);
    });
};


// Export the controller functions so they can be used in route definitions.
module.exports = {
    getAll,
    getSingle
};