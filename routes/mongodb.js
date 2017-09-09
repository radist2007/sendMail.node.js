var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');

// router.get('/', function(req, res, next){
//     console.log('-------/mongodb'.cyan);
//     res.render('mongodb', {title: 'MONGO_DB'});
//     return next;
// });

router.get('/', function(req, res){
    console.log('-------/mongodb'.cyan);
    var MongoClient = mongodb.MongoClient;

    var url = 'mongodb://localhost:27017/sendMailApp';
    var data;

    MongoClient.connect(url, function(err, db){
        if(err){
            console.log('Unable to connect to the server ', err);
        } else {
            console.log('connection GOOD!');

            db.collection('usersMessages').find().toArray(function(err, docs){
                if(err) {
                    console.log(err);
                }
                console.log(docs);
                data = JSON.stringify(docs);
                console.log(typeof(data));
                db.close();
    res.render('mongodb', {title: data});
            });

            console.log("connection end!");
            db.close();
        }
    })
    // res.render('mongodb', {title: data});
})

module.exports = router;