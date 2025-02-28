type nunfun=(h:number)=>number;

function myPolynomial(x:number): number{
 return 3* x**2 +4.7;
}

function differentiate2(h:number, f:nunfun):nunfun {
    return (x)=>3*2*x;
}


type PointedPair<T, U> = {
    car: T;
    cdr: U;
};


function car<T,U>(aCons:PointedPair<T,U>):T{
    return aCons.car;
}

function cdr<T,U>(aCons:PointedPair<T,U>):U{
    return aCons.cdr;
}
type List<T> = undefined | { car: T, cdr: List<T> };
const nil = undefined;
function isEmpty<T>(l:List<T>):boolean{
    return l===nil;
}

function isNonEmty<T>(l:List<T>): boolean{
    return l!=nil;
}

function head<T>(l:List<T>):T{
    if (isEmpty(l)){
        throw new Error("head:empty list");
    }
}