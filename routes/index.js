const router = require('express').Router();

router.get('/', (req, res) => {
    res.send('To test Database cluster, go to "/contacts"<br><br>To test individual document go to "/contacts/{_id}" <br>Example _id: 67cca101ac48fd568c391abb');
    
});

router.use('/contacts', require('./contacts'));

module.exports = router;