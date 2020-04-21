var express = require('express');
var formidable = require('formidable'); 
var app = express();
const bodyParser = require('body-parser');
var fs = require('fs');
var htmlToJson = require('html-to-json'); 
const fileUpload = require('express-fileupload');

app.use(fileUpload());
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
var sd=0;
let fls=[];


//rutas
app.get('/', function (req, res) {
    if(fls.length==0){
        var t=[fls.length+"","default",""];
        fls.push(t);
    }
    res.render('index.ejs', {
        texto: fls[sd][2],
        pp:fls,
        tit:fls[sd][1]

    });
});
app.get('/doc', function (req, res) {
    
    res.render('doc.ejs');
});

app.get('/o/:tt', function (req, res) {
    var e=req.params.tt;
    sd=e;
    res.redirect('/');
});

app.get('/nuevo', function (req, res) {
    if(fls[fls.length-1][1]!="default"){
        var t=[fls.length+"","default",""];
        fls.push(t);
        sd=fls.length-1;
    }
    
    res.redirect('/');
});

app.post('/upl', function (req, res) {
    //console.log(req.files.foo.data.toString('utf8'));
    if(fls[fls.length-1][2]==""){
        var t=[fls.length-1+"",req.files.foo.name,req.files.foo.data.toString('utf8')];
        fls[fls.length-1]=t;
        sd=fls.length-1;
    }else{
        var t=[fls.length+"",req.files.foo.name,req.files.foo.data.toString('utf8')];
        sd=fls.length-1;
        fls.push(t);
    }
    res.redirect("/");
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












