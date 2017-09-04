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

    var name = req.body.name,
        mail = req.body.mail,
        message = req.body.message,
        html = '<h1>' + name + '</h1>' + '<h2>' + mail + '</h2>' + '<p>' + message + '</p>';
        console.log('name: ' + name);
        console.log('mail: ' + mail);
        console.log('message: ' + message);
        console.log(req.body);
        console.log("---------------------------------------------------------------------------------");

    try {

        console.log(' MESSAGE START SENDING from my site --->>'.black.bgYellow);
        //Send to me
        emailService.send(credentials.gmail.user, message, html, collback = "null");
        console.log(collback);
        // if(info == "1234"){console.log('1234');}
        //Send to user
        // var html = '<h3>' + name + ', дякую за підписку! </h3>';
        // emailService.send(mail, message, html);

        console.log(' MESSAGE_SENDed to me --->>'.black.bgYellow + credentials.gmail.user );
        console.log(' MESSAGE_SENDed to user --->>'.black.bgYellow + mail );

        res.render('thankYou');
        console.log('------/thankYou'.cyan);

    } catch (e) {
        console.log('trable here ---> try/catch sendMail.js: '.red + e);
        res.render('sendMailErr');
    }

    console.log('sendMails dane!'.green);
});

module.exports = router;