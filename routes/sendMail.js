
var express = require('express');
var router = express.Router();

router.post('/send', function(req, res) {

	console.log('/sendMail submit');
    var name = req.body.name;
    var mail = req.body.mail;
    var message = req.body.message;

    console.log('name ' + name);
    console.log('mail ' + mail);
    console.log('message ' + message);

    res.render('home');

});

module.exports = router;