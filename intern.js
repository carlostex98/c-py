let lex = require("./lexico.js");
let lst = require("./listas.js");
let sintax = require("./sintactico.js");



function start_all(to_compile) {
    lst.cln();
    lex.lex_x(replace_x(to_compile) + " ");
    //lst.prt_tok();
}

function replace_x(cadena){
    var n = cadena.replace('\r','\n');
}

module.exports = { lex, lst, sintax, start_all };