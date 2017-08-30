
var express = require('express');
var router = express.Router();

var credentials = require('../credentials.js');
var emailService = require('../lib/email.js')(credentials);

router.get('/', function(req, res) {
	console.log('--------/sendMail'.cyan);
	res.render('sendMail');
});

router.post('/', function(req, res) {

	console.log('/sendMail fomr submit'.green);
    var name = req.body.name;
    var mail = req.body.mail;
    var message = req.body.message;
    var html = '<h1>123</h1>';

    console.log('name ' + name);
    console.log('mail ' + mail);
    console.log('message ' + message);

    emailService.send(mail, message, html);
    console.log(' MESSAGE_SEND to --->>'.black.bgYellow + mail );

    res.render('home');

});

module.exports = router;