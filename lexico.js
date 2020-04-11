function lex_x(cadena) {
    var letter = "abcdefghijklmnñopqrstuvwxyzABCDEFGHIJKLMNÑOPQRSTUVWXYZ";

    let ltt = require('./intern.js');
    var c = "";
    var v = "";
    var aux = "";
    var e = 0;
    var ln = 1;
    var cl = 1;
    for (let i = 0; i < cadena.length; i++) {
        c = cadena[i];

        if (i != cadena.length - 1) {
            c = cadena[i + 1];
        }
        switch (e) {
            case 0:
                if (c == "/" && v == "/") {
                    e = 1;
                } else if (c == "/" && v == "*") {
                    e = 2;
                } else if (isLetter(c) || c == "_") {
                    e = 3;
                } else if (isNum(c)) {
                    e = 4
                } else if (c == "\"") {
                    e = 7;
                } else if (c == "\'") {
                    e = 8
                } else if (isSimbol(c)) {
                    //no cambia estado, solo declara
                } else if (isCombo(c + v)) {
                    //no cambia estado solo declara
                } else if (c != "\n" && c != " " || c != "\t") {
                    //error
                }
                break;

            case 1:
                if (c == "\n") {
                    ltt.lst.add_token("Comentario", aux, ln, cl);
                    aux = "";
                } else {
                    aux += c;
                }
                break;

            case 2:
                if (c == "*" && v == "/") {
                    ltt.lst.add_token("Comentario", aux, ln, cl);
                    aux = "";
                } else {
                    aux += c;
                }

                break;

            case 3:
                break;

            case 4:
                break;

            case 5:
                break;

            case 6:
                break;

            case 7:
                break;

            case 8:
                break;

            case 9:
                break;

            case 10:
                break;

            default:
                break;
        }

    }
    cl++;
    if (c == "\n") {
        ln++;
        cl = 0;
    }

    //ltt.lst.add_token("a","a","a","a");
    //ltt.lst.add_token("a","a","a","a");
    //ltt.lst.prt_tok();

    //idx.lst.add_token("a","a","a","a")
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
    var res = ["void"];
    var n = res.includes(z);
    return n;

}

module.exports = {
    lex_x
};

