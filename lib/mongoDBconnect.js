var mongodb = require('mongodb');

function connect() {
    return new Promise(function(resolve, reject){
        console.log('connect Start'.cyan);

        var MongoClient = mongodb.MongoClient;
        var url = 'mongodb://localhost:27017/sendMailApp';

        MongoClient.connect(url, function(err, db){
            if(err){
                console.log('Unable to connect to the server ', err);
                reject("bed connect:( " + err);
            } else {
                console.log('connection GOOD!'.bgGreen);
                resolve(db);
            }
        });
    })
}

function insert(db) {
    return new Promise(function(resolve, reject){
        console.log('insert Start'.cyan);
        console.log('insert: '.cyan + db);

        db.collection('usersMessages').insert({name: name, email: email, message: message}, function(err, result) {
            if(err) {
                console.log(err);
                console.log('connecktin close'.bgGreen);
                db.close();
                reject(err);
            } else {
                console.log('connection result: '.cyan + result);
                db.close();
                resolve('thankYou')
            }
        })
        console.log('insert end'.cyan);
    })
}

function show(db) {
    return new Promise(function(resolve, reject){
        db.collection('usersMessages').find().toArray(function(err, docs){
            if(err) {
                console.log(err);
                reject(err);
            }
            console.log('connecktin close'.bgGreen);
            db.close();
            var toSend = []; 
            for(var i = 0; i < docs.length; i++){
                toSend.push({
                    name: docs[i].name,
                    email: docs[i].email,
                    message: docs[i].message
                })
            }
            resolve(toSend)
        });
    })
}

function send(toSend) {
    return new Promise(function(resolve, reject){
            toSend = JSON.stringify(toSend);
            resolve(toSend);
    });
}

function toCatch(e) {
    return new Promise(function(resolve, reject){
        console.log('catch from promise of mongoDBconnect.js: '.red + e)
    })
}

module.exports = { 
    insert: function(name, email, message) {
        connect()
        .then(insert)
        .catch(toCatch);
    },
    show: function(collback) {
        connect()
        .then(show)
        .then(send)
        .then(value => {collback(value);})
        .catch(toCatch);
    }
}