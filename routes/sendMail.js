var express = require('express');
var router = express.Router();

var credentials = require('../credentials.js');
var emailService = require('../lib/email.js')(credentials);

var global = "0";


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

        var temp = "temp";

        function sendMessages() {
            return new Promise((resolve, reject) => {
                console.log('sendMessages -------------------------------------- start');
                    resolve(temp);
            })
        };

        function sendFirstMessage() {
            return new Promise((resolve, reject) => {
                console.log('Promis 1 -------------------------------------- start');
                //Send to me
                emailService.send(credentials.gmail.user, message, html, function(callback) {
                    temp = callback;
                    console.log("temp in callback1 = " + temp);
                    resolve(temp);
                })
            })
        };

        function sendSecondMessage() {
            return new Promise((resolve, reject) => {
                console.log('Promis 2 --------------------------------------- start');
                //   Send to user
                var html = '<h3>' + name + ', дякую за підписку! </h3>';
                emailService.send(mail, message, html, function(callback){
                    temp = callback;
                    console.log("temp in callback2 = " + temp);
                    resolve(temp);
                })
            })
        };

        function checkSend() {
            return new Promise (function(resolve, reject) {
                if(temp == "1") {
                    console.log('checkSend done: all GOOD!'.cyan);
                    resolve('thankYou');
                } else {
                    console.log('checkSend done: BED '.bgRed);
                    reject('error4ick');
                }
            })
        }

        function backToUser() {
            return new Promise(function(resolve, reject) {
                console.log("backToUser")
                res.render('thankYou');
                console.log(' MESSAGE_SENDed to me --->>'.black.bgYellow + credentials.gmail.user );
                console.log(' MESSAGE_SENDed to user --->>'.black.bgYellow + mail );
            })
        }

        sendMessages()
          .then(sendFirstMessage)
          .then(checkSend)
          .then(sendSecondMessage)
          .then(checkSend)
          .then(backToUser)
          .catch(value=>{console.log('catch = ' + value);res.render('sendMailErr');});

    } catch (e) {
        console.log('trable here ---> try/catch sendMail.js: '.red + e);
        console.log('------/sendMailErr'.cyan);
        res.render('sendMailErr');
    }

    console.log('sendMails end!'.green);
});

module.exports = router;