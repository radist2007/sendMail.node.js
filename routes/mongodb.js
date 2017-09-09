var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');

router.get('/', function(req, res){
    console.log('-------/mongodb'.cyan);
    res.render('mongodb', {title: 'MONGO_DB'});
});

router.get('/showDB', function(req, res){
    var MongoClient = mongodb.MongoClient;

    var url = 'mongodb://localhost:27017/sendMailApp';

    MongoClient.connect(url, function(err, db){
        if(err){
            console.log('Unable to connect to the server ', err);
        } else {
            console.log('connection GOOD!');
        }
    })
})

module.exports = router;