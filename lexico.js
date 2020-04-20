function lex_x(cadena) {
    let ltt = require('./intern.js');
    var c = '';
    var v = '';
    var aux = "";
    var e = 0;
    var ln = 1;
    var cl = 0;
    var y = 0;
    var b = "";
    for (let i = 0; i < cadena.length; i++) {
        c = cadena.charAt(i);

        if (i != cadena.length - 1) {
            v = cadena.charAt(i + 1);
        }
        cl++;
        b = (c + "").concat(v + "") + "";
        switch (e) {
            case 0:
                /*if (b == ">=") {
                    console.log(b);
                    console.log(isCombo(b));
                }*/

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
                } else if (c == '\"') {
                    e = 7; //ok
                } else if (c == '\'') {
                    e = 8 //ok
                } else if (isSimbol(c)) {
                    //no cambia estado, solo declara
                    if (isCombo(b)) {
                        ltt.lst.add_token("Simbolo combo", c.concat(v), ln, cl);
                        i++;
                        cl++;
                    } else {
                        ltt.lst.add_token("Simbolo", c, ln, cl);
                    }
                } else if (c != '\n' && c != " " && c != "\t" && c != '\r') {

                    ltt.lst.er_tokens("lexico", ln, cl, "valor inesperado: " + c);
                } else {

                    if (c == '\n' || c == '\r') {

                        if (y == 0) {
                            y = 1;
                        } else {
                            ln++;
                            cl = 1;
                            y = 0;
                        }
                    }
                }
                break;

            case 1:
                if (c == '\n' || c != '\r') {
                    ltt.lst.add_token("Comentario", aux, ln, cl - aux.length - 2);
                    aux = "";
                    e = 0;
                } else {
                    aux += c;
                }
                break;

            case 2:
                if (c == "*" && v == "/") {
                    ltt.lst.add_token("Comentario", aux, ln, cl - aux.length - 4);
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
                        ltt.lst.add_token("Reservada", aux, ln, cl - aux.length);
                    } else {
                        ltt.lst.add_token("Identificador", aux, ln, cl - aux.length);
                    }
                    e = 0
                    i--;
                    cl--;
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
                    ltt.lst.add_token("Numero", aux, ln, cl - aux.length);
                    e = 0
                    i--;
                    cl--;
                    aux = "";
                }
                break;

            case 5:
                if (isNum(c)) {
                    aux += c;

                } else {
                    ltt.lst.add_token("Numero", aux, ln, cl - aux.length);
                    e = 0
                    i--;
                    cl--;
                    aux = "";
                }
                break;

            case 7:
                if (c == '\"') {
                    //reporta
                    ltt.lst.add_token("Cadena 1", aux, ln, cl - aux.length - 2);
                    e = 0

                    aux = "";

                } else {
                    aux += c;
                }
                break;

            case 8:
                if (c == '\'') {
                    ltt.lst.add_token("Cadena 2", aux, ln, cl - aux.length - 2);
                    e = 0

                    aux = "";


                } else {
                    //reporta
                    aux += c;
                }
                break;
            default:
                break;
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
    var sim = ["=", ",", "*", "-", "(", ")", "{", "}", ";", "+", "-", "*", "/", "<", ">", ":", "!", "."];
    var n = sim.includes(z);
    return n;
}

function isCombo(z) {
    var combo = ["&&", "!=", "||", ">=", "<=", "++", "--", "=="];
    var n = combo.includes(z + "");
    return n;
}

function isReserved(z) {
    var res = ["void", "int", "string", "double", "char", "bool", "main", "Console", "write",
        "switch", "case", "break", "default", "for", "while", "do", "return", "continue","true","false"];
    var n = res.includes(z);
    return n;

}

module.exports = {
    lex_x
};

