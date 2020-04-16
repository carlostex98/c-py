let tkn = [];
let err = [];
let vrs = [];



function add_token(tipo, valor, ln, cl) {
    const e = tkn.length + "";
    var ebj = [e, tipo, valor, ln + "", cl + ""];
    tkn.push(ebj); 

}

function ret_arr(){
    let x=tkn;
    return x;
}

function er_tokens(tipo, ln, cl, descrip) {
    var ebj = [err.length+"", tipo, ln + "", cl + "", descrip];
    err.push(ebj);
}

function prt_tok() {
    for (let i = 0; i < tkn.length; i++) {
        console.log(tkn[i]);

    }
}

function ret_err(){
    let x=err;
    return x;
}


function cln() {
    tkn = [];
    err = [];
}

module.exports = {
    add_token,
    er_tokens,
    tkn,
    err,
    vrs,
    prt_tok,
    cln,
    ret_arr,
    ret_err
};