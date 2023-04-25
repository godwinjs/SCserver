(function () {
    function render(fog = 0, fogLevel = 1) {
        console.log(`fog: ${fog}, fogLevel: ${fogLevel}`)
    }
    render(10)

    var scope = 'outer-scope'

    function sc(param = scope) {
        var scope = "inner-scope"
        console.log(param)
    }

    sc();//outer-scope

    function say(name, ...qoutes) {
        console.log(`In ${name} voice, i say ${qoutes}`)
        console.log(qoutes.map((item) => {
            return item;
        }))
    }
    say('Morgan Freeman', 'something serious', ' AI is dangerously beneficial for mankind', ' the inventiion of deepfake technology is mind blowing', ' be cautious.')

    function sum(a, b, c) {
        return a + b + c
    }
    let numb = [5, 6, 7]

    console.log(sum.apply(null, numb))//es5 => 18
    console.log(sum(...numb))//es6 => 18

    // parseInt(number, radix)
    //decimal
    console.log(parseInt('FF', 10));
    // hexadecimal
    console.log(parseInt('FF', 16));


    function swap(a, b) { // <--function scope starts here
        if (a > 0 && b > 0) { // <--block scope starts here
            let tmp = a;
            a = b;
            b = tmp;
        } // <--block scope ends here
        console.log(a, b);
        // console.log(tmp); // tmp is not defined as it is available only in the block scope
        return [a, b];
    }
    swap(1, 2);

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
    function f_clo() {
        var arr = [], i;

        for (i = 0; i < 3; i++) {
            arr[i] = function () {
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
            (function (x) {
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
            set: function (...argsNumb) {
                argsNumb.map((item) => {
                    if (typeof (item) === 'number') {
                        numbers.push(item)
                    }
                })
                return numbers
            },
            get: function () {
                return numbers;
            }
        }
    }();
    data.set(1, 2, "effewsdf", 10, 30, 40, 'ees')
    console.log(data.get())

    var loopArr = function (arr) {
        var i = 0;
        return function () {
            return arr[i++]
        }
    }

    var next = loopArr([1, 2, 3, 10, 3, 81, 99])
    for (var i = 0; i < 7; i++) {
        console.log(next())
    }

    function h() {
        var u = 'outer-scope'
        function j() {
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
    function getRGB(hex) {
        let h = hex.split(''),
            p = function (a, b) {
                return parseInt(a + b, 16)
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
    (function () {
        return console.log;
    }
    )()('Boo!');

    // 5:

})()


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

console.log(ha)

var a_ = 1;
//    console.log(window.a_)
console.log(__filename)

var o_ = {}
console.log(o_.constructor)

let a = 1
let b = 2
//object literals1
let val = { a, b }
console.log(val)
//object literals2
var obj_ = {
    prop: 1,
    modifier() {
        console.log(this.prop);
    }
}
console.log(obj_)

//Object properties and attributes

let a__ = { age: 23, gender: "male" }
Object.defineProperty(a__, 'superpowers', {
    enumberable: false, value:
        'ES6'
})
console.log(Object.getOwnPropertyDescriptor(a__, 'superpowers'));
// \\\\\object.asign to copy object to source
console.log(Object.assign(a__, { age: 33 }))
// 
console.log(NaN === NaN) //false
console.log(-0 === +0) //true
//ES6 Object.is
console.log(Object.is(NaN, NaN)) //true
console.log(Object.is(-0, +0)) //false


// Destructuring Objects

let config = {
    server: 'localhost',
    port: '8080',
    timeout: 900,
}
console.log(config.valueOf())

let { server, port, timeout: t/*using custom variable*/, stats = 'keep alive'/*adding props to detructured object*/ } = config;
console.log(server, port, t, stats)

// Destructuring arrays
const days = ['Thursday', 'Friday', 'Saturday', 'Sunday']
const [, , sat, sun] = days;
console.log(sat, sun)
let a___ = 1, b___ = 2;
[b___, a___] = [a___, b___]
console.log(a___, b___) //2 1
const [x, ...y] = ['a', 'b', 'c'];
console.log(x, y)

// Arrays a special type of Object
var ar = []
ar[0] = 1;
ar.props = 2;
ar.push('end', 4, true, 'animation')
console.log(ar)
console.log(ar.slice(1, 3))//start starts at the start ind, and stop stops before the stop ind

// Array.from(arg, mappingFunction)
function makeArrayAndDoSome(){
    return Array.from(arguments, arr =>  arr + 2)
}
console.log(makeArrayAndDoSome(1,3,5,7,9))
// Array.of() es6 of Array()
console.log(Array.of(2))//with Array() this would have returned [undefined, undefined] with arr.length = 2

// Array iteration
// Array.prototype.entries()
// Array.prototype.values()
// Array.prorotype.keys()
var sec = [1, 2, 'des', 'sews', 3, 4,5,true]
for (const [index, value] of sec.entries()){
    let ar = [];
    ar.props = {[index]: value};
    console.log(ar)
}

let numbers = [1,2,3,4,5,6,7,8,9,10];
console.log(numbers.find(n => n > 8)); //search
console.log(numbers.findIndex(n => n > 5)); //search
console.log(eval('2+2')) //and
var sed =  new Function('a', 'b', 'return a + b'); //executes a string
console.log(sed(2,2))

console.log((() => {}).toString())

// need for hacks to access this when using a normal function
{
    var greeter = {
    default: 'hello',
    greet: function(names){
        var that = this;
        names.forEach( function(name){
            console.log(that.default + ' ' + name)
        })
    }
}

greeter.greet(['world', 'heaven'])

}
// Lexical this in arrow function no need for hacks to access this
{
    var greeter = {
    default: 'hello',
    greet: function(names){
        var that = this;
        names.forEach( (name) => {
            console.log(that.default + ' ' + name)
        })
    }
}

greeter.greet(['world', 'heaven'])

}
console.log(Object.prototype.toString.call({}))
console.log(Object.prototype.toString.call([]))
console.log((new String('couch casting')).indexOf('cou'))

{
    var statss = [0, 0, 0, 0, 0, 0, 0];
    for (var i = 2016; i < 3016; i++) {
        stats[new Date(i, 5, 20).getDay()]++;
    }
}
{
    var re = new RegExp("j.*t")
    console.log(Object.getOwnPropertyDescriptors(re))

    /*
        match(): Returns an array of matches
        search(): Returns the position of the first match
        replace(): Allows you to substitute matched text with another string
        split(): Accepts a regexp when splitting a string into array elements
    */
}
// EXERCISES
{
    // Global Object
    function F() {
        function C() {
        return this;
        }
        return C();
        }
        var o = new F();
        console.log(o)

}
{
    // C is Object
    function C(){
        this.a = 1;
        return false;
        }
        Object.prototype.toString.call(C)
        console.log(typeof new C());
       

}
{
    //'1--1,2--2'
    c = [1, 2, [1, 2]];
    c.sort()
    console.log(c.join('--'))
}
{
    /*
        4. Imagine the String() constructor didn't exist. Create a constructor function,
            MyString(), that acts like String() as closely as possible. You're not allowed to
            use any built-in string methods or properties, and remember that the String()
            doesn't exist. You can use this code to test your constructor
    */
    class MyString {
        constructor(str) {
            let arr = []
            console.log(arr)
            for (var i in str) {
                this[i] = str[i]
                arr.push(str[i])
            }
            this.length = str.length
            this.toString = function () {
                return str
            }
            this.valueOf = function () {
                return str
            }
            this.charAt = (char) => {
                if(arr[char] === undefined){
                    return arr[0]
                }
                return arr[char]
            }
            this.concat = (arg) => {
                return str + arg
            }
            this.slice = (start, end) => {
                var result = [];
                for(var i in arr){
        
                    if( i < end && i >= start ){
                        if(arr[i] !== undefined){
                            result.push(arr[i])
                        }
                    }else if(end <= 0 && (i >= start && i < end+arr.length)){
                        if(arr[i] !== undefined){
                            result.push(arr[i])
                        }
                    }else if( start <= 0 && (i >= start+arr.length && i < end)){
                        if(arr[i] !== undefined){
                            result.push(arr[i])
                        }
                    }
                }

                return result;
                // return arr.slice(start, end)
            }
            this.split = (arg) => {
                var result = [], final=[];

                for(var i in arr){
                    if(arr[i] !== arg){
                        result.push(arr[i])

                    }else{
                        result.push(' ')
                    }
                }
                
                if(result.length === arr.length){
                    console.log('done')
                    let add = '';
                    for(var i in result){
                        if(result[i] !== ' '){
                            add= add+result[i]
                        }else{
                            final.push(add)
                            add = ''
                        }
                        if(i == result.length - 1){
                            final.push(add)
                        }
                    }
                    
                }


                return final;
            }            
            this.reverse = () => {
                let ar = []
                for(let i = arr.length - 1; i >= 0; i--){
                    ar.push(arr[i])
                }
                return ar;
            }

        }

    }
    var s = new MyString('hello');

    console.log(s[0])
    console.log(s.toString())
    console.log( s.valueOf())
    console.log( s.charAt(1))
    console.log( s.charAt('2'))
    console.log( s.charAt('e'))
    console.log(s.concat(' world!'))
    console.log( s.slice(1, 3))
    console.log(s.slice(0, -1))
    console.log(s.split('e'))
    console.log(s.split('l'))
    console.log(s.reverse())
}
