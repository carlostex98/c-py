function lex_x(cadena) {
    var letter = "abcdefghijklmnñopqrstuvwxyzABCDEFGHIJKLMNÑOPQRSTUVWXYZ";


    let ltt = require('./intern.js');
    var c = '';
    var v = '';
    var aux = "";
    var e = 0;
    var ln = 1;
    var cl = 1;
    for (let i = 0; i < cadena.length; i++) {
        c = cadena.charAt(i);

        if (i != cadena.length - 1) {
            v = cadena.charAt(i+1);
        }
        switch (e) {
            case 0:
                if (c == '/' && v == '/') {
                    e = 1;  //ok
                } else if (c == '/' && v == '*') {
                    e = 2;  //ok
                } else if (isLetter(c) || c == '_') {
                    e = 3; //ok
                    aux += c;
                } else if (isNum(c)) {
                    e = 4
                    aux += c;  //ok
                } else if (c == '"') {
                    e = 7; //ok
                } else if (c == '\'') {
                    e = 8 //ok
                } else if (isSimbol(c)) {
                    //no cambia estado, solo declara
                    ltt.lst.add_token("Simbolo", c, ln, cl);
                } else if (isCombo(c + v)) {
                    //no cambia estado solo declara
                    ltt.lst.add_token("Simbolo n", aux, ln, cl);
                } else if (c != '\r' && c != ' ' && c != '\t') {
                    //error
                    /*console.log(c != "\r");
                    console.log(c != ' ');
                    console.log(c != '\t');*/
                    ltt.lst.er_tokens("lexico", ln, cl, "valor inesperado: " + c);
                }
                break;

            case 1:
                if (c == "\n") {
                    ltt.lst.add_token("Comentario", aux, ln, cl);
                    aux = "";
                    e = 0;
                } else {
                    aux += c;
                }
                break;

            case 2:
                if (c == "*" && v == "/") {
                    ltt.lst.add_token("Comentario", aux, ln, cl);
                    aux = "";
                    e = 0;
                } else {
                    aux += c;
                }

                break;

            case 3:
                if (isLetter(c) || c == '_' || isNum(c)) {
                    aux += c;
                } else {
                    if (isReserved(aux)) {
                        ltt.lst.add_token("Reservada", aux, ln, cl);
                    } else {
                        ltt.lst.add_token("Identificador", aux, ln, cl);
                    }
                    e = 0
                    i--;
                    aux = "";
                }
                break;

            case 4:
                if (isNum(c)) {
                    aux += c;
                } else if (c == ".") {
                    e = 5;
                    aux += c;
                } else {
                    ltt.lst.add_token("Numero", aux, ln, cl);
                    e = 0
                    i--;
                    aux = "";
                }
                break;

            case 5:
                if (isNum(c)) {
                    aux += c;

                } else {
                    ltt.lst.add_token("Numero", aux, ln, cl);
                    e = 0
                    i--;
                    aux = "";
                }
                break;

            case 7:
                if (c == '"') {
                    aux += c;
                } else {
                    //reporta
                    ltt.lst.add_token("Cadena", aux, ln, cl);
                    e = 0
                    i--;
                    aux = "";
                }
                break;

            case 8:
                if (c == '\'') {
                    aux += c;
                } else {
                    //reporta
                    ltt.lst.add_token("Cadena html", aux, ln, cl);
                    e = 0
                    i--;
                    aux = "";
                }
                break;
            default:
                break;
        }

        cl++;
        if (c == '\n') {
            ln++;
            cl = 1;
        }
    }


}

function isLetter(z) {
    var letter = "abcdefghijklmnñopqrstuvwxyzABCDEFGHIJKLMNÑOPQRSTUVWXYZ";
    var n = letter.includes(z);
    return n;
}

function isNum(z) {
    var num = "0123456789"
    var n = num.includes(z);
    return n;
}

function isSimbol(z) {
    var sim = ["=", ",", "*", "-", "(", ")", "{", "}", ";", "+", "-", "*", "/", "<", ">", ":", "!"];
    var n = sim.includes(z);
    return n;
}

function isCombo(z) {
    var combo = ["&&", "!=", "||", ">=", "<=", "++", "--", "=="];
    var n = combo.includes(z);
    return n;
}

function isReserved(z) {
    var res = ["void", "int", "string", "double", "char", "bool", "main", "console", "write",
        "switch", "case", "break", "default", "for", "while", "do", "return", "continue"];
    var n = res.includes(z);
    return n;

}

module.exports = {
    lex_x
};

