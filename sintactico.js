//start dintactivo

let vars = [];
let tokx = [];

var t = 0;
function main_x() {
    fill_arr();

}
//analizador

function i(){
    
}




//fin analizador




function fill_arr(){
    let x = require('./intern.js');
    tokx = x.lst.ret_arr();
    t=0;
}

function ret_curr(){
    return tokx[t];
}

function nxt(){
    t++;
    return tokx[t];
}


module.exports = {
    start_x,
    vars
};