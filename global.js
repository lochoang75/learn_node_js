console.log(__filename);
console.log(__dirname);

function printHello() {
    console.log("Hello, world! I'm from callback");
}

var t = setTimeout(printHello, 2000);

clearTimeout(t);
