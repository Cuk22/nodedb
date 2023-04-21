// console.log(global);

global.setTimeout(() => {
    console.log("proslo tri sekunde");
    clearInterval(int);
}, 3000);

const int = setInterval(() => {
    console.log("prosla sekunda");
}, 1000);
