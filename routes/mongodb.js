var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');

var connectToDB = require('../lib/mongoDBconnect.js');

router.get('/', function(req, res){
    console.log('-------/mongodb'.cyan);
    res.render('mongodb');
});

router.post('/', function(req, res){
    console.log('post to show start'.cyan);
    connectToDB.show(function(collback){
    res.status(200).send(collback);
    });
});
module.exports = router;
    // var MongoClient = mongodb.MongoClient;

    // var url = 'mongodb://localhost:27017/sendMailApp';
    // var data;

    // MongoClient.connect(url, function(err, db){
    //     if(err){
    //         console.log('Unable to connect to the server ', err);
    //     } else {
    //         console.log('connection GOOD!'.bgGreen);

    //         db.collection('usersMessages').find().toArray(function(err, docs){
    //             if(err) {
    //                 console.log(err);
    //                 res.send('404');
    //             }
    //             console.log('connecktin close'.bgGreen);
    //             db.close();
    //             var toSend = []; 
    //             for(var i = 0; i < docs.length; i++){
    //                 toSend.push({
    //                     name: docs[i].name,
    //                     email: docs[i].email,
    //                     message: docs[i].message
    //                 })
    //             }
    //             toSend = JSON.stringify(toSend);
    //             console.log(toSend);
    //             res.send(toSend);
    //         });
    //         console.log("connection code end!");
    //         db.close();
    //     }
    // })