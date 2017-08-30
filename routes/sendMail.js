
var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
	console.log('--------/sendMail'.cyan);
	res.render('sendMail');
});

router.post('/', function(req, res) {

	console.log('/sendMail fomr submit'.green);
    var name = req.body.name;
    var mail = req.body.mail;
    var message = req.body.message;

    console.log('name ' + name);
    console.log('mail ' + mail);
    console.log('message ' + message);

    res.render('home');

});

module.exports = router;