function render(fog= 0, fogLevel= 1) {
    console.log(`fog: ${fog}, fogLevel: ${fogLevel}`)
}
render(10)

var scope = 'outer-scope'

function sc(param=scope){
    var scope = "inner-scope"
    console.log(param)
}

sc();//outer-scope

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

 var f = function myFunc() {
    return 1;
 }
   
 console.log(f())


var newFunc = function a() {
 console.log('A!');
 return function () {
 console.log('B!');
 };
 }();

 newFunc()

 function a() {
    console.log('first run!');
    a = function () {
        console.log('rewrite function a during second run!');
    }()
 }

 a();

//  Closures
function f_clo(){
    var arr = [], i;

    for(i =0; i<3; i++) {
        arr[i] = function(){
            //functions don't have access to or stores the value of a variable,
            // but stores the reference to that variable and gets the value ofthe variable whenever 
            // the function is called.
            return i;
        }
    }
    return arr;
}

function f_clo2() {
    var arr = [], i;
    for (i = 0; i < 3; i++) {
        (function (x){
            arr[i] = function () {
                return x;
            }
        })(i)//with closures the function gets the value of a variable at that particular time.
        //closures: passing the data of an inner scoped variable to an outer scoped function.
    }
    return arr;
}
// calling the items in the f_clo() array will return [3, 3, 3] but expected to return [1,2 ,3]
//but f_clo2() will return [1,2,3] as expected
var arr = f_clo2().map((item) => {
    return item()
})

console.log(arr)

var data = function () {
    let numbers = [0]
    
    return {
        set: function (...argsNumb){
            argsNumb.map((item) => {
                if(typeof(item) === 'number'){
                    numbers.push(item)
                }
            })
            return numbers
        },
        get: function (){
            return numbers;
        }
    }
}();
data.set(1, 2, "effewsdf", 10, 30, 40, 'ees')
console.log(data.get())

var loopArr = function(arr) {
    var i =0;
    return function(){
        return arr[i++]
    }
}

var next = loopArr([1, 2, 3, 10, 3, 81, 99])
for(var i = 0; i < 7; i++){
    console.log(next())
}

function h(){
    var u = 'outer-scope'
    function j(){
        let u = 'inner scope'

        function ut() {
            console.log(u)
        }
        ut()
    }
    j(); 
}
h()

// EXERCISE @ pg132
// 1
function getRGB(hex){
    let h = hex.split(''), 
        p = function (a, b){
            return parseInt(a+b, 16)
        };

    return `rgb(${p(h[1], h[2])}, ${p(h[3], h[4])}, ${p(h[5], h[6])})`
}
console.log(getRGB('#0000ff'))

// 2

// 3 ans=2
var a3 = 1;
 function f3() {
 function n3() {
    console.log(a3);
 }
 var a3 = 2;
 n3();
 }
 f3()

// 4: All these following examples alert "Boo!". Can you explain why?
var f = console.log;
 eval('f("Boo!")');
 //
 var e;
 var f = console.log;
 eval('e=f')('Boo!');
 //
 (function(){
    return console.log;}
    )()('Boo!');

// 5:

// OOP
var oo = {}
oo.fname = 'scott';
oo.lname = 'lang'
delete oo.fname;
console.log(oo)
class Hero {
    constructor(name) {
        this.name = name
        this.occupation = 'Ninja'
        this.whoAreYou = function () {
            return "I'm " +
                this.name + " and I'm a " + this.occupation
        }
    }
}

    var ha = new Hero('Leonardo');

    console.log(typeof(ha) ) 






