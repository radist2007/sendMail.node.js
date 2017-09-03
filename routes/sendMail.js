var express = require('express');
var router = express.Router();

var credentials = require('../credentials.js');
var emailService = require('../lib/email.js')(credentials);

router.get('/', function(req, res) {
	console.log('--------/sendMail'.cyan);
	res.render('sendMail');
});

router.post('/', function(req, res) {
    console.log('/sendMail fomr wos submited'.green);

    var name = req.body.name;
    var mail = req.body.mail;
    var message = req.body.message;
    var html = '<h1>' + name + '</h1>' + '<h2>' + mail + '</h2>' + '<p>' + message + '</p>';

    console.log(req.body);

    try {

        let promis = new Promise(function(resolve, reject){});///--------------------------------------

        emailService.send(credentials.gmail.user, message, html);

        var html = '<h3>' + name + ', дякую за підписку! </h3>';

        emailService.send(mail, message, html);

        res.render('thankYou');
        console.log('------/thankYou'.cyan);

    } catch (e) {
        console.log('trable here --->try catch sendMail: '.red + e);
        res.render('sendMailErr');
    }

    console.log('sendMails dane!'.green)


    console.log('name: ' + name);
    console.log('mail: ' + mail);
    console.log('message: ' + message);

    console.log(' MESSAGE_SEND from my site --->>'.black.bgYellow);
    console.log(' MESSAGE_SEND to --->>'.black.bgYellow + credentials.gmail.user );
    console.log(' MESSAGE_SEND to --->>'.black.bgYellow + mail );

});

module.exports = router;