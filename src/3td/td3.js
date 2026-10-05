function plus(a,b){
    if(b===0)
        return a
    else
        return plus(a+1,b-1)
}

/*function produit(a,b){
    if (b==0)
        return a
    else
        return produit(a+a,b-1)
}*/
function produit(a,b){
    function produit(a,b,c){
        if (b==0)
            return c
        else
            return produit(a,b-1,c+a)
    }
    return produit(a,b,0)
}
console.log(plus(2,3))
console.log(produit(2,3))

function fibo(a){
    if (a===1 || a===2)
        return 1
    return fibo(n-1)+fibo(n-2)
}
//45 //appel de fonction repeté
function fiboGen(n,a,b){
    if (n===1)
        return a
    if (n===2)
        return b
    else
        return fiboGen(n-1,a,b)+fiboGen(n-2,a,b)
    }
//f(n,a,b) = f(n-1,a,b+a)

function fact(n, p) {
    if (n <= 1n)
    return p;
    else
    return fact(n-1n, n*p);
}

//10 float  //10n bigint

//() ⇒ fact(10n∗∗4n, 1n) declarer un fonction . une fonction qui appelle fact


function enscapler(){
    return fact(a,b)
}
function frozenFact(n,p){
    if (n<=1n)
        return p;
    else
        return ()=>fact(n - 1n, n*p);
    
}
console.log(frozenFact(4n,1n) instanceof Function)
console.log(fact(4n,1n))

function trampoline(f){
    while (f instanceof Function)
        f=f()
    return f
}

function factTotal(n){
    function frozenFact(n,p){
    if (n<=1n)
        return p;
    else
        return ()=>fact(n - 1n, n*p);
    }
    return trampoline(frozenFact(n,1n))
}