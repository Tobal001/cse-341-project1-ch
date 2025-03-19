const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Contact Api',
    description: 'Contact Api'
  },
  host: 'localhost:3000',
  schemes: ['https', 'http']
};

const outputFile = './swagger.json';
const endpointsFile = ['./routes/index.js'];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen(outputFile, endpointsFile, doc);