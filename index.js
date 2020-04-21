var express = require('express');
var app = express();
const bodyParser = require('body-parser');
var fs = require('fs');
var htmlToJson = require('html-to-json'); 
//otro config
app.use(express.static(__dirname + '/public'))
app.use(bodyParser.urlencoded({ extended: true }));
//config
app.set('appName', 'c#_to_python');
app.set('version', '1.0');
app.set('port', '3000');
app.set('view engine', 'ejs');

let ix = require('./intern.js');
var xm = "";

//rutas
app.get('/', function (req, res) {
    res.render('index.ejs', {
        super_s: null
    });
});

app.post('/', function (req, res) {
    var txt = req.body.texto;
    ix.start_all(txt);
    res.redirect('/compiled');
});

app.get('/compiled', function (req, res) {
    let tokk = ix.lst.ret_arr();
    let erx = ix.lst.ret_err();
    let varx = ix.sintax.ret_var();
    let pyx = ix.sintax.ret_py();
    let htx = ix.sintax.ret_html();
    ch(htx);
    zzz(pyx, htx, xm);
    res.render('compiled.ejs', {
        tokens: tokk,
        errores: erx,
        variables: varx,
        python: pyx,
        ht: htx,
        superjsx: xm
    });
});

function zzz(c_py, c_ht, c_js){
    fs.writeFile('./public/python.py', c_py, function (err) {
        if (err) throw err;
        //console.log('Saved!');
    }); 
    fs.writeFile('./public/rec_html.html', c_ht, function (err) {
        if (err) throw err;
        //console.log('Saved!');
    });
    fs.writeFile('./public/rec_json.json', c_js, function (err) {
        if (err) throw err;
        //console.log('Saved!');
    });
}


app.listen(app.get('port'), function () {
    console.log('Example app listening on port', app.get('port'));
});



function ch(opu){
    var promise = htmlToJson.parse(opu, {
        'text': function ($doc) {
          return $doc.find('html').text();
        }
      }, function (err, result) {
          xm=result;
        //console.log(result);
      });
       
      promise.done(function (result) {
        //Works as well
      });
}












