var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
    res.render('events', { title: 'Express' });
});

router.put('/', function(req, res, next) {
    res.render('events', { title: 'Express' });
});


module.exports = router;