
//--------------------------------------------------------------------------------Подключаем зависимосте
var express = require('express');
var colors = require('colors');

var sendMail = require('./routes/sendMail');

//Init App
var app = express();

var credentials = require('./credentials.js');

var emailService = require('./lib/email.js')(credentials);

//--------------------------------------------------------------------------------Подключаем ХЕНДЛБАР
//handlebars view engine
var handlebars = require('express-handlebars').create({ defaultLayout: 'main' });

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

//--------------------------------------------------------------------------------Настраиваем порт
//Set Port
app.set('port', process.env.PORT || 3000);

//--------------------------------------------------------------------------------Настраиваем статические страницы
//Set Static Folder
app.use(express.static(__dirname + '/public'));

app.use(require('body-parser')());

//--------------------------------------------------------------------------------Подключаем страницы
app.get('/', function(req, res) {
	console.log('--------/home'.cyan);
	res.render('home');
});

app.use('/sendMail', sendMail );

app.get('/about', function(req, res) {
	console.log('--------/about'.cyan);
	res.render('about');

});

//--------------------------------------------------------------------------------Обработка ошибок

// 404 catch-all handler (middleware)
app.use(function(req, res, next){
	console.log('NOT FOUND: '.bgMagenta + req.url);
	res.status(404);
	res.render('404');
});

// 500 error handler (middleware)
app.use(function(err, req, res, next){
	console.error(err.stack);
	res.status(500);
	res.render('500');
});

//--------------------------------------------------------------------------------Подключаем порт сервера
//Set Port
app.listen(app.get('port'), function(){
	console.log(' ---------------------------------> START'.rainbow);
	console.log( 'Express started on http://localhost:'.green +
			app.get('port') + ';' + ' press Ctrl-C to terminate.'.bgBlue );
});
