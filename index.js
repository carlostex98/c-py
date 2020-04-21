var express = require('express');
var app = express();
const bodyParser = require('body-parser');
var fs = require('fs'); 
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
    xm=mapDOM(htx);
    zzz(pyx, htx, xm);
    res.render('compiled.ejs', {
        tokens: tokk,
        errores: erx,
        variables: varx,
        python: pyx,
        ht: htx,
        supjsx: xm
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
    fs.writeFile('./public/rec_json.json', c_py, function (err) {
        if (err) throw err;
        //console.log('Saved!');
    });
}


app.listen(app.get('port'), function () {
    console.log('Example app listening on port', app.get('port'));
});








function mapDOM(element, json) {
    var treeObject = {};

    // If string convert to document Node
    if (typeof element === "string") {
        if (window.DOMParser) {
            parser = new DOMParser();
            docNode = parser.parseFromString(element, "text/xml");
        } else { // Microsoft strikes again
            docNode = new ActiveXObject("Microsoft.XMLDOM");
            docNode.async = false;
            docNode.loadXML(element);
        }
        element = docNode.firstChild;
    }

    //Recursively loop through DOM elements and assign properties to object
    function treeHTML(element, object) {
        object["type"] = element.nodeName;
        var nodeList = element.childNodes;
        if (nodeList != null) {
            if (nodeList.length) {
                object["content"] = [];
                for (var i = 0; i < nodeList.length; i++) {
                    if (nodeList[i].nodeType == 3) {
                        object["content"].push(nodeList[i].nodeValue);
                    } else {
                        object["content"].push({});
                        treeHTML(nodeList[i], object["content"][object["content"].length - 1]);
                    }
                }
            }
        }
        if (element.attributes != null) {
            if (element.attributes.length) {
                object["attributes"] = {};
                for (var i = 0; i < element.attributes.length; i++) {
                    object["attributes"][element.attributes[i].nodeName] = element.attributes[i].nodeValue;
                }
            }
        }
    }
    treeHTML(element, treeObject);

    return (json) ? JSON.stringify(treeObject) : treeObject;
}






