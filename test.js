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