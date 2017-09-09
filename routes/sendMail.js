var express = require('express');
var router = express.Router();

var credentials = require('../credentials.js');
var emailService = require('../lib/email.js')(credentials);

router.get('/', function(req, res) {
	console.log('--------/sendMail'.cyan);
	res.render('sendMail');
});

router.post('/', function(req, res) {
    console.log('Incaming POST'.black.bgYellow)
    console.log('/sendMail fomr wos submited'.green);

    var name = req.body.name,
        mail = req.body.email,
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

        function sendSecondMessage(temp) {
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

        function checkSend(temp) {
            return new Promise (function(resolve, reject) {
                if(temp == "1") {
                    console.log('checkSend done: all GOOD!'.cyan);
                    resolve('thankYou');
                } else {
                    console.log('checkSend done: BED '.red);
                    reject(temp);
                }
            })
        }

        function backToUser(value) {
            return new Promise(function(resolve, reject) {
                console.log("backToUser" + value);
                res.send('thankYou');
                console.log(' MESSAGE_SENDed to me --->>'.black.bgYellow + credentials.gmail.user );
                console.log(' MESSAGE_SENDed to user --->>'.black.bgYellow + mail );
            })
        }

        function toCatch(value) {
            return new Promise(function(resolve, reject) {
                console.log("this is catch function!".bgRed + value );
                var toSend = {
                    err: temp,
                    errMess: '<p>Вибачте, сталася помилка :(</p> <p> Ваше повідомлуння НЕ надіслано,</p> <p> спробуйте пізніше.</p>'
                }
                res.send(JSON.stringify(toSend));
            })
        }

        sendMessages()
          .then(sendFirstMessage)
          .then(checkSend)
          .then(sendSecondMessage)
          .then(checkSend)
          .then(backToUser)
          .catch(toCatch);

    } catch (e) {
        console.log('trable here ---> try/catch sendMail.js: '.red + e);
        console.log('------/sendMailErr'.cyan);
        res.render('sendMailErr');
    }

    console.log('sendMails code end! But the ->'.cyan);
});

module.exports = router;