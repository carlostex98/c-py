//start dintactivo

let vars = [];
let tokx = [];
let ht = [];

var t = 0;
function main_x() {
    fill_arr();

}
//analizador

function i() {
    if (t != tokx.length - 1) {
        let x = ret_curr();
        if (x[2] == "void") {
            nxt();
            resto();
        } else if (isType(x[2])) {
            nxt();
            resto_2();
        } else {
            //run panic, {
            runPanic("{");
        }
    }


}
function resto() {
    let a = ret_curr();
    if (a[2] == "main") {
        nxt();
        if (ret_curr()[2] == "(") {
            nxt();
            if (ret_curr()[2] == ")") {
                nxt();
                if (ret_curr()[2] == "{") {
                    //llama sentencias
                    nxt();
                    sentencias();

                    if (ret_curr()[2] == "}") {
                        nxt();
                        i();
                    } else {
                        //no lleva panico, pero reporta el errorcillo

                        i();
                    }
                } else {

                }
            } else {
                runPanic("{");
            }
        } else {
            runPanic("{");
        }

    } else if (a[1] == "Identificador") {
        nxt();
        if (ret_curr()[2] == "(") {
            nxt();
            params();
            if (ret_curr()[2] == ")") {
                nxt();
                if (ret_curr()[2] == "{") {
                    //llama sentencias
                    nxt();
                    sentencias();

                    if (ret_curr()[2] == "}") {
                        nxt();
                        i();
                    } else {
                        //no lleva panico, pero reporta el errorcillo

                        i();
                    }
                } else {

                }
            } else {
                runPanic("{");
            }
        } else {
            runPanic("{");
        }
    } else {
        //panic mode
        runPanic("{");
    }
}

function resto_2() {
    let a = ret_curr();
    if (a[1] == "Identificador") {
        nxt();
        if (ret_curr()[2] == "(") {
            nxt();
            params();
            if (ret_curr()[2] == ")") {
                nxt();
                if (ret_curr()[2] == "{") {
                    //llama sentencias
                    nxt();
                    sentencias();

                    if (ret_curr()[2] == "}") {
                        nxt();
                        i();
                    } else {
                        //no lleva panico, pero reporta el errorcillo

                        i();
                    }
                } else {

                }
            } else {
                runPanic("{");
            }
        } else {
            runPanic("{");
        }
    }
}


function sentencias() {
    /*
    *Opciones:
    *if
    * while -brk -cont
    * do-while -brk -cont
    * for
    * switch 
    * 
    * var
    * return --only func
    * print
    * 
    * 
    */
}

function sentencias_func(){

}

function sentencias_sw(){

}

function sentencias_ciclo(){
    
}


function params() {
    if (calc_nxt()[2] != ")") {//puede que exista sin parametros
        if (isType(ret_curr[2])) {
            nxt();
            if (ret_curr() == "Identificador") {
                //crea var
                nxt();
                otros_params();
            } else {
                runPanic(")");
            }
        } else {
            runPanic(")");
        }
    }
}

function otros_params() {
    if (calc_nxt()[2] != ")") {//epsilon
        if (ret_curr() == ",") {
            params();
        } else {
            runPanic(")");
        }
    }
}





//fin analizador
//utilidades

function isType(z) {
    var n = ["char", "string", "int", "double", "bool"];
    var x = n.includes(z);
    return x;
}

function isComboAu(z) {
    var x = (z == "++" || z == "--");
    return x;
}

function runPanic(delim) {
    let c = ret_curr();
    while (true) {
        if (c[2] == "delim") {
            break;
        } else {
            nxt();
        }
    }
}
//fin ut

function calc_nxt() {
    return tokx[t + 1];
}

function fill_arr() {
    let x = require('./intern.js');
    tokx = x.lst.ret_arr();
    t = 0;
}

function ret_curr() {
    return tokx[t];
}

function nxt() {
    t++;
    //return tokx[t];
}


module.exports = {
    start_x,
    vars
};