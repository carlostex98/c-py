//start dintactivo

let vars = [];
let tokx = [];
let ht = [];

var a = "";
var b = "";
var c = "";

var py = [];
//varx para traduccion
var tmp = "";
var ident = "";
var h = 0;

function ilx() {
    for (let i = 0; i < 5; i++) {
        h++;
        ident += " ";
    }
}
function cln() {
    h = 0;
    ident = "";
    for (let i = 0; i < h - 5; i++) {
        h++;
        ident += " ";
    }
}

function sum(f) {
    tmp += f;
}

function adl() {
    var pu = ident + tmp;
    py.push("pu");
}

var t = 0;
function main_x() {
    fill_arr();
    rec_html();
    i();

}
//analizador

function i() {
    if (t != tokx.length - 1) {
        let x = ret_curr();
        if (x[2] == "void ") {
            sum("def");
            nxt();
            resto();
        } else if (isType(x[2])) {
            sum("def");
            nxt();
            resto_2();//con return
        } else {
            //run panic, {
            runPanic("{");
        }
    }


}
function resto() {
    let a = ret_curr();
    if (a[2] == "main") {
        sum("main ");
        nxt();
        if (ret_curr()[2] == "(") {
            sum("(");
            nxt();
            if (ret_curr()[2] == ")") {
                sum("):");
                adl();
                ilx();
                nxt();
                if (ret_curr()[2] == "{") {
                    //llama sentencias
                    nxt();
                    sentencias(0, 0);

                    if (ret_curr()[2] == "}") {
                        cln();
                        nxt();
                        i();
                    } else {
                        //no lleva panico, pero reporta el errorcillo

                        i();
                    }
                } else {
                    runPanic("}");
                }
            } else {
                runPanic("{");
            }
        } else {
            runPanic("{");
        }

    } else if (a[1] == "Identificador") {// void nombre
        sum(a[1]);
        nxt();
        if (ret_curr()[2] == "(") {
            sum(" (");
            nxt();
            params();
            //nxt();
            if (ret_curr()[2] == ")") {
                sum("):");
                adl();
                ilx();
                nxt();
                if (ret_curr()[2] == "{") {
                    //llama sentencias
                    nxt();
                    sentencias();
                    //nxt();

                    if (ret_curr()[2] == "}") {
                        nxt();
                        cln();
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
        sum(a[1]);
        nxt();
        if (ret_curr()[2] == "(") {
            sum(" (");
            nxt();
            params();
            nxt();
            if (ret_curr()[2] == ")") {
                sum("):");
                adl();
                nxt();
                if (ret_curr()[2] == "{") {
                    //llama sentencias
                    ilx();
                    nxt();
                    sentencias(1, 0);
                    //nxt();
                    if (ret_curr()[2] == "}") {
                        cln();
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


function sentencias(n, m) {
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

    if (ret_curr()[2] != "}") {
        if (ret_curr()[2] == "if") {

            nxt();
            if (ret_curr()[2] == "(") {
                sum("if (");
                nxt();
                cond_f2();
                //nxt();
                if (ret_curr()[2] == ")") {
                    sum(" ):");
                    nxt();
                    if (ret_curr()[2] == "{") {
                        adl();
                        ilx();
                        nxt();
                        sentencias(n, m);
                        //nxt();
                        if (ret_curr()[2] == "}") {
                            cln();
                            nxt();
                            //cond_f2();
                            if_ext(m, n);
                        } else {
                            runPanic("}");
                        }
                    } else {
                        runPanic();
                    }
                } else {
                    runPanic("{");
                }
            } else {
                runPanic(")");
            }

        } else if (ret_curr()[2] == "switch") {
            nxt();
            if (ret_curr()[2] == "(") {
                nxt();
                if (ret_curr()[1] == "Identificador") {
                    var a1 = ret_curr()[2];
                    nxt();
                    if (ret_curr()[2] == ")") {
                        nxt();
                        sum("def switch(" + a1 + "):");
                        adl();
                        if (ret_curr()[2] == "{") {
                            ilx();
                            sum("switcher = {");
                            adl();
                            ilx();
                            nxt();
                            sentencias_sw();
                            if (ret_curr()[2] == "}") {
                                cln();
                                sum("}");
                                adl();

                                cln();
                                nxt();
                                sentencias();
                            } else {
                                runPanic("}");
                            }
                        } else {
                            runPanic("}");
                        }
                    } else {
                        runPanic("}");
                    }
                } else {
                    runPanic("}");
                }
            } else {
                runPanic("}");
            }
        } else if (ret_curr()[2] == "for") {
            nxt();
            if (ret_curr()[2] == "(") {
                sum("for ");
                nxt();
                if (isType(ret_curr()[1])) {
                    nxt();
                    if (ret_curr()[1] == "Identificador") {
                        sum(ret_curr()[2]);
                    } else {
                        runPanic("}");
                    }
                    if (ret_curr()[2] == "=") {
                        nxt();
                        asignacion(";");
                        if (ret_curr()[2] == ";") {
                            nxt();
                            sum(" in range( ");
                            cond_f2();//suma coond
                            if (ret_curr()[2] == ";") {
                                nxt();
                                asignacion(";");
                                if (ret_curr()[2] == ")") {
                                    sum(" ): ");
                                    nxt();
                                    if (ret_curr()[2] == "{") {
                                        adl();
                                        ilx();
                                        nxt();
                                        sentencias(n, 1);
                                        if (ret_curr()[2] == "}") {
                                            nxt();
                                            cln();
                                            sentencias(n, m);
                                        } else {
                                            runPanic("}");
                                        }
                                    } else {
                                        runPanic("}");
                                    }

                                } else {
                                    runPanic("}");
                                }

                            } else {
                                runPanic("}");
                            }
                        } else {
                            runPanic("}");
                        }
                    } else {
                        runPanic("}");
                    }


                } else {
                    runPanic("}");
                }


            } else {
                runPanic("}");
            }
        } else if (ret_curr()[2] == "while") {
            nxt();
            if (ret_curr()[2] == "(") {
                sum("while ( ")
                nxt();
                cond_f2();
                if (ret_curr()[2] == ")") {
                    nxt();
                    sum("): ");
                    adl();
                    ilx();
                    if (ret_curr()[2] == "{") {
                        nxt();
                        sentencias(n, 1);
                        if (ret_curr()[2] == "}") {
                            nxt();
                            cln();
                            sentencias(n, m);
                        } else {
                            runPanic("}");
                        }
                    } else {
                        runPanic("}");
                    }
                } else {
                    runPanic("}");
                }
            } else {
                runPanic("}");
            }

        } else if (ret_curr()[2] == "do") {
            nxt();
            if (ret_curr()[2] == "{") {
                nxt();
                sum("while(true):");
                adl();
                ilx();
                sentencias(n, 1);
                if (ret_curr()[2] == "}") {
                    nxt();
                    if (ret_curr()[2] == "while") {
                        nxt();
                        if (ret_curr()[2] == "(") {
                            nxt();
                            sum("if( ")
                            cond_f2();
                            sum(" ):")
                            adl();

                            ilx();
                            sum("break");
                            adl();
                            cln();
                            if (ret_curr()[2] == ")") {
                                nxt();
                                sentencias(n, m);
                            } else {
                                runPanic(")");
                            }
                        } else {
                            runPanic(")");
                        }
                    } elserunPanic(")");
                } else {
                    runPanic(")");
                }
            } else {
                runPanic(")");
            }

        } else if (ret_curr()[2] == "Console") {
            nxt();
            if (ret_curr()[2] == ".") {
                nxt();
                if (ret_curr()[2] == "write") {
                    nxt();
                    if (ret_curr()[2] == "(") {
                        nxt();
                        sum("print( ");
                        asignacion(")");
                        if (ret_curr()[2] == ")") {
                            nxt();
                            if (ret_curr()[2] == ";") {
                                sum(")");
                                adl();
                                nxt();
                                sentencias(n, m);
                            } else {
                                runPanic("}");
                            }
                        } else {
                            runPanic("}");
                        }
                    } else {
                        runPanic("}");
                    }
                } else {
                    runPanic("}");
                }
            } else {
                runPanic("}");
            }

        } else if (isType(ret_curr()[2])) {
            //dec de var
            var w = ret_curr()[2];
            b = w;
            nxt();
            if (ret_curr()[1] == "Identificador") {
                //crea var
                a = ret_curr()[2];
                sum(a + " ");
                nxt();
                if (v2(w)) {
                    nxt();
                    asignacion(";");
                    if (ret_curr()[2] == ";") {
                        nxt();
                        adl();
                        sentencias(n, m);
                    } else {
                        runPanic("}");
                    }
                } else {
                    runPanic(";");
                }



            } else {
                runPanic(";");
            }

        } else if (ret_curr()[1] == "Identificador") {
            //run method or variable definition
            sum(ret_curr()[2]);
            nxt();
            if (ret_curr()[2] == "=") {
                sum(ret_curr()[2]);
                nxt();
                asignacion(";");
                if (ret_curr()[2] == ";") {
                    adl();
                    nxt();
                    sentencias(n, m);
                } else {
                    runPanic("}");
                }

            } else if (ret_curr()[2] == "(") {
                sum(ret_curr()[2]);
                nxt();
                p_func(")");
                if (ret_curr()[2] == ")") {
                    sum(ret_curr()[2]);
                    nxt();
                    if (ret_curr()[2] == ";") {
                        nxt();
                        adl();
                        sentencias(n, m);
                    } else {
                        runPanic("}")
                    }
                } else {
                    runPanic("}")
                }

            } else {
                runPanic("}")
            }


        } else if (n == 1 || m == 1) {

            if (n1 == 1) {
                if (ret_curr()[2] == "return") {
                    sum("return ");
                    nxt();
                    asignacion(";");
                    if (ret_curr()[2] == ";") {
                        adl();
                        nxt();
                        sentencias(n, m);
                    } else {
                        //specialpanic
                        runPanic("}");
                    }
                }
            }
            if (m == 1) {
                if (ret_curr()[2] == "break") {
                    sum("break");
                    adl();
                    nxt();
                    if (ret_curr()[2] == ";") {
                        nxt();
                        sentencias(n, m);
                    } else {
                        //specialpanic
                        runPanic("}");
                    }

                } else if (ret_curr()[2] == "continue") {
                    sum("continue");
                    adl();
                    nxt();
                    if (ret_curr()[2] == ";") {
                        nxt();
                        sentencias(n, m);
                    } else {
                        //specialpanic
                        runPanic("}");
                    }
                }
            }

        } else {
            //specialpanic
            runPanic("}");
        }
    }
}

function v2(n) {

    if (!isLast()) {
        if (ret_curr()[2] == ",") {
            sum(",");
            c = ret_curr()[3];
            ap_var(a, b, c);
            nxt();
            if (ret_curr()[1] == "Identificador") {
                //use n
                sum(ret_curr()[2]);
                a = ret_curr()[2];
                nxt();
                if (v2(n)) {

                }

            } else {
                return false;
            }
        } else if (ret_curr()[2] == "=") {
            sum("=");
            c = ret_curr()[3];
            ap_var(a, b, c);
            return true;
        } else {
            return false;
        }
    }


}

function p_func(c) {
    if (ret_curr()[2] != c) {
        asignacion(",");

        nxt();
        v5(c);
    }
}
function v5(k) {
    if (ret_curr()[2] != k) {
        nxt();
        if (ret_curr()[2] == ",") {
            sum(", ");
            nxt();
            p_func(k);
        } else {
            runPanic(")");
        }
    }
}

function asignacion(s) {//okx
    if (ret_curr()[2] != s) {
        if (ret_curr()[1] == "Identificador") {
            sum(ret_curr()[2]);
            nxt();
            if (ret_curr()[2] == "(") {
                //call paraotro
                sum("(");
                nxt();
                p_func(")");
                if (ret_curr()[2] == ")") {
                    sum(")");
                    nxt();
                    otra_asig(s);
                } else {
                    runPanic(s);
                }
            } else {
                otra_asig(s);
            }
        } else if (ret_curr()[1] = "Numero") {
            sum(ret_curr()[2]);
            nxt();
            otra_asig(s);
        } else if (ret_curr()[1] = "Cadena 1") {
            sum(ret_curr()[2]);
            nxt()
            otra_asig(s);
        } else if (ret_curr()[1] = "Cadena 2") {
            sum(ret_curr()[2]);
            nxt();
            otra_asig(s);
            //suma al html si y solo si la longitud no es (1)
        } else if (ret_curr()[2] == "(") {
            sum("(");
            nxt();
            asignacion(")");
            if (ret_curr()[2] == ")") {
                sum(")");
                nxt();
                asignacion(s);
            } else {
                runPanic(s);
            }

        } else {
            runPanic(s);
        }

    }
}

function otra_asig(sx) {//okx
    if (ret_curr()[2] != sx) {
        if (simbolo_s()) {
            sum(ret_curr()[2]);
            nxt();
            asignacion(sx);
        } else {
            runPanic(sx);
        }
    }
}

function simbolo_s() {//sin sum
    var combo = ["+", "-", "*", "/", "++", "--"];
    var n = combo.includes(ret_curr()[2]);
    return n;
}

function if_ext(p, l) {//dep okx
    if (ret_curr()[2] == "else" && calc_nxt()[2] == "if") {
        sum("elif");
        nxt();
        if (ret_curr()[2] == "(") {
            sum("(");
            nxt();
            cond_f2();
            //nxt();
            if (ret_curr()[2] == ")") {
                sum("): ");
                adl();
                ilx();
                nxt();
                if (ret_curr()[2] == "{") {
                    nxt();
                    sentencias(p, l);
                    //nxt();
                    if (ret_curr()[2] == "}") {
                        cln();
                        nxt();
                        //cond_f2();
                        if_ext();
                    } else {
                        runPanic("}");
                    }
                } else {
                    runPanic();
                }
            }
        }
    } else if (ret_curr()[2] == "else") {
        sum("else:");
        adl();
        ilx();
        nxt();
        if (ret_curr()[2] == "{") {
            nxt();
            sentencias(p, l);
            nxt();
            if (ret_curr()[2] == "}") {
                nxt();
                //cond_f2();
                //if_ext();
                cln();
                nxt();
                sentencias(p, l);
            } else {
                runPanic("}");
            }
        } else {
            runPanic();
        }
    } else {
        //no hay error, solo regresamos a las demas instrucciones
        sentencias(p, l);
        //sin nxt
    }

}

function isLast() {
    var t = true;
    for (let i = t; i < tokx.length; i++) {
        //
        if (ret_curr()[1] == "Cometario") {
            t++;
        } else {
            t = false;
            break;
        }

    }
    return t;
}

function cond_f2() {
    if (ret_curr()[2] != ")") {
        asig2();
        nxt();

        if (combo_c()) {
            sum(ret_curr()[2]);
            nxt();
            asig3();
            cond_2();
        }

    }

}
function cond_2() {

    if (ret_curr()[2] != ")") {
        if (ret_curr()[2] == "&&") {
            sum(" "+ret_curr()[2]+" ");
            cond_f2();
        } else if (ret_curr()[2] == "||") {
            cond_f2();
            sum(" "+ret_curr()[2]+" ");
        }
    }


}


function combo_c() {
    var combo = ["&&", "!=", "||", ">=", "<=", ">", "<", "=="];
    var n = combo.includes(z + "");
    return n;
}

function e1() {
    var n = ["<", ">", "<=", ">=", "==", "!="];
    var x = n.includes(ret_curr()[2]);
    return x;
}

function e2() {
    var n = ["&&", "||", ")"];
    var x = n.includes(ret_curr()[2]);
    return x;
}

function otra_asig2() {//okx
    if (!e1()) {
        if (simbolo_s()) {
            sum(ret_curr()[2]);
            nxt();
            asig2();
        }
    }
}

function otra_asig3() {//okx
    if (!e2()) {
        if (simbolo_s()) {
            sum(ret_curr()[2]);
            nxt();
            asig3();
        }
    }
}

function asig2() {
    if (!e1()) {
        if (ret_curr()[1] == "Identificador") {
            sum(ret_curr()[2]);
            nxt();
            if (ret_curr()[2] == "(") {
                //call paraotro
                sum("(");
                nxt();
                p_func(")");
                if (ret_curr()[2] == ")") {
                    sum(")");
                    nxt();
                    otra_asig2();
                } else {
                    runPanic(s);
                }
            } else {
                otra_asig2();
            }
        } else if (ret_curr()[1] = "Numero") {
            sum(ret_curr()[2]);
            nxt();
            otra_asig2();
        } else if (ret_curr()[1] = "Cadena 1") {
            sum(ret_curr()[2]);
            nxt()
            otra_asig2();
        } else if (ret_curr()[1] = "Cadena 2") {
            sum(ret_curr()[2]);
            nxt();
            otra_asig2();
            //suma al html si y solo si la longitud no es (1)
        } else if (ret_curr()[2] == "true" || ret_curr()[2] == "false") {
            sum(ret_curr()[2]);
            nxt();
            otra_asig2();
            //suma al html si y solo si la longitud no es (1)
        } else if (ret_curr()[2] == "(") {
            sum("(");
            nxt();
            asignacion(")");
            if (ret_curr()[2] == ")") {
                sum(")");
                nxt();
                asig2();
            } else {
                runPanic(")");
            }

        } else {
            runPanic(")");
        }

    }
}

function asig3() {
    if (!e2()) {
        if (ret_curr()[1] == "Identificador") {
            sum(ret_curr()[2]);
            nxt();
            if (ret_curr()[2] == "(") {
                //call paraotro
                sum("(");
                nxt();
                p_func(")");
                if (ret_curr()[2] == ")") {
                    sum(")");
                    nxt();
                    otra_asig3();
                } else {
                    runPanic(s);
                }
            } else {
                otra_asig3();
            }
        } else if (ret_curr()[1] = "Numero") {
            sum(ret_curr()[2]);
            nxt();
            otra_asig3();
        } else if (ret_curr()[1] = "Cadena 1") {
            sum(ret_curr()[2]);
            nxt()
            otra_asig3();
        } else if (ret_curr()[1] = "Cadena 2") {
            sum(ret_curr()[2]);
            nxt();
            otra_asig3();
            //suma al html si y solo si la longitud no es (1)
        } else if (ret_curr()[2] == "true" || ret_curr()[2] == "false") {
            sum(ret_curr()[2]);
            nxt();
            otra_asig2();
            //suma al html si y solo si la longitud no es (1)
        } else if (ret_curr()[2] == "(") {
            sum("(");
            nxt();
            asignacion(")");
            if (ret_curr()[2] == ")") {
                sum(")");
                nxt();
                asig3();
            } else {
                runPanic(")");
            }

        } else {
            runPanic(")");
        }

    }
}



function sentencias_sw() {//okx

    if (ret_curr()[2] == "}") {
        if (ret_curr()[2] == "case") {

            nxt();
            if (e3()) {
                sum(ret_curr()[2]);
                nxt();
                if (ret_curr()[2] == ":") {
                    nxt();
                    inst_sw();
                    if (ret_curr()[2] == ":") {
                        sum(ret_curr()[2]);
                        nxt();
                        if (ret_curr()[2] == "break") {
                            adl();
                            nxt();
                            if (ret_curr()[2] == ";") {
                                nxt();
                                sentencias_sw();

                            } else {
                                runPanic("}")
                            }
                        } else {
                            runPanic("}")
                        }
                    } else {
                        runPanic("}")
                    }
                } else {
                    runPanic("}")
                }
            } else {
                runPanic("}")
            }
        } else if (ret_curr()[2] == "default") {
            nxt();
            if (ret_curr()[2] == ":") {
                nxt();
                inst_sw();
                if (ret_curr()[2] == ":") {
                    nxt();
                    if (ret_curr()[2] == "break") {
                        if (ret_curr()[2] == ";") {
                            nxt();
                            sentencias_sw();

                        } else {
                            runPanic("}")
                        }
                    } else {
                        runPanic("}")
                    }
                } else {
                    runPanic("}")
                }
            } else {
                runPanic("}")
            }
        }
    }


}

function e3() {//nope
    if (ret_curr()[1] == "Numero") {
        return true;
    } else if (ret_curr()[1] == "Cadena 1") {
        return true;
    }
    else if (ret_curr()[1] == "Cadena 2") {
        return true;
    } else if (ret_curr()[1] == "Identificador") {
        return true;
    } else {
        return false;
    }

}
function inst_sw() {//okx
    if (ret_curr()[2] != "}") {
        if (ret_curr()[1] == "Identificador") {
            sum(ret_curr()[2]);
            nxt();
            if (ret_curr()[2] == "=") {
                sum(ret_curr()[2] + ", ");
                nxt();
                if (ret_curr()[1] == "Numero" || ret_curr()[1] == "Cadena 1" || ret_curr()[1] == "Cadena 2") {
                    sum(ret_curr()[2]);
                    nxt();
                    if (ret_curr()[2] == ";") {
                        nxt();
                        inst_sw();
                    } else {
                        runPanic("}")
                    }
                } else {
                    runPanic("}")
                }
            } else {
                runPanic("}")
            }
        } else {
            runPanic("}")
        }
    }


}


function params() {//okx
    if (ret_curr()[2] != ")") {//puede que exista sin parametros
        if (isType(ret_curr()[2])) {
            b = ret_curr()[2];

            nxt();
            if (ret_curr()[2] == "Identificador") {
                //crea var
                sum(ret_curr()[2]);
                a = ret_curr()[2];
                c = ret_curr()[3];
                ap_var(a, b, c);
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

function otros_params() {//okx
    if (ret_curr()[2] != ")") {//epsilon
        if (ret_curr() == ",") {
            sum(", ");
            nxt();
            params();
        } else {
            runPanic(")");
        }
    }
}

function rec_html() {//nope
    for (let i = 0; i < tokx.length; i++) {

        if (tokx[i][1] == "Cadena 2") {
            if (tokx[i][1].length > 1) {
                var l = tokx[i][1];
                ht.push(l);
            }
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
    //porta error
    err(delim);
    while (true) {
        c = ret_curr();
        if (c[2] == "delim") {
            break;
        } else {
            //nxt();
            if (t == tokx.length - 1) {
                break;
            } else {
                nxt();
            }
        }
    }
}
//fin ut

function err(qt) {
    var ttt = ret_curr();
    let x = require('./intern.js');
    x.lst.er_tokens("Sintactico", ttt[3], ttt[4], "Valor inesperado -> " + ttt[2] + " recuperacion: " + qt);
}

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
    if (t != tokx.length - 1) {
        t++;
        if (ret_curr()[1] == "Comentario") {
            for (let i = t; i < tokx.length; i++) {
                //
                if (ret_curr()[1] == "Cometario") {
                    t++;
                } else {
                    break;
                }

            }
        }
    }
}

function ap_var(nm, tip, ln) {
    let u = [nm, tip, ln];
    vars.push(u);
}

module.exports = {
    main_x,
    vars
};