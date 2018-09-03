const INFO = 3;
const LOG = 2;
const WARN = 1;
const ERR = 0;

const LOG_LEVEL = 3;
const PREFIXES = ["!!!!", "????", "----", "iiii"];

var stack = [];
setInterval(()=>{
   for (let msg of stack){
       console.log(...msg);
   }
   stack = [];
}, 100);

function addToStack(msg=[], level){
    if(level > LOG_LEVEL){
        return;
    }

    let time = new Date().toLocaleTimeString()
    stack.push( [ PREFIXES[level], time, ...msg] );
}

export function info(){
    addToStack(arguments, INFO);
}

export function error(){
    addToStack(arguments, ERR);
}

export function warn(){
    addToStack(arguments, WARN);
}

export function log(){
    addToStack(arguments, LOG);
}