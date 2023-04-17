function render(fog= 0, fogLevel= 1) {
    console.log(`fog: ${fog}, fogLevel: ${fogLevel}`)
}
render(10)

var scope = 'outer-scope'

function sc(param=scope){
    var scope = "inner-scope"
    console.log(param)
}

sc();

function say(name, ...qoutes){
    console.log(`In ${name} voice, i say ${qoutes}`)
    console.log(qoutes.map((item) => {
        return item;
    }))
}
say('Morgan Freeman', 'something serious', ' AI is dangerously beneficial for mankind', ' the inventiion of deepfake technology is mind blowing', ' be cautious.')

function sum(a,b,c){
    return a+b+c
}
let numb = [5, 6,7]

console.log(sum.apply(null, numb))//es5 => 18
console.log(sum(...numb))//es6 => 18

// parseInt(number, radix)
//decimal
console.log(parseInt('FF', 10));
// hexadecimal
console.log(parseInt('FF', 16));


function swap(a,b){ // <--function scope starts here
    if(a>0 && b>0){ // <--block scope starts here
    let tmp=a;
    a=b;
    b=tmp;
    } // <--block scope ends here
    console.log(a,b);
    // console.log(tmp); // tmp is not defined as it is available only in the block scope
    return [a,b];
    }
    swap(1,2);
   