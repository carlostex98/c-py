let lex = require("./lexico.js");
let lst = require("./listas.js");
let sintax = require("./sintactico.js");



function start_all(to_compile) {
    lst.cln();
    lex.lex_x(to_compile + " ");
    lst.prt_tok();
}

module.exports = { lex, lst, sintax, start_all };