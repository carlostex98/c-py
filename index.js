var express = require('express');
var app = express();
const bodyParser = require('body-parser');

//otro config
app.use(express.static(__dirname + '/public'))
app.use(bodyParser.urlencoded({ extended: true }));
//config
app.set('appName', 'c#_to_python');
app.set('version', '1.0');
app.set('port', '3000');
app.set('view engine', 'ejs');

let ix = require('./intern.js');


//rutas
app.get('/', function (req, res) {
    res.render('index.ejs', {
        super_s: null
    });
});

app.post('/', function (req, res) {
    var txt = req.body.texto;
    ix.start_all(txt);
    res.render('index.ejs', {
        super_s: txt
    });
});

app.get('/tokens', function (req, res) {
    res.render('view_tokens.ejs');
});

app.get('/errores', function (req, res) {
    res.render('index.ejs');
});

app.get('/final', function (req, res) {
    res.render('index.ejs');
});



app.listen(app.get('port'), function () {
    console.log('Example app listening on port', app.get('port'));
});







