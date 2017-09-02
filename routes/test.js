var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
	console.log('--------/test'.cyan);
	res.render('test');
});

    var count = 0;
router.post('/', function(req, res) {
    count += 1;
    console.log('/sendAJAX on testPage wos clicked'.green);
    var name = req.body.name;
    res.send( name + ' wos ' + count);
});

module.exports = router;