import { anyToString } from '#src/utils/printers.js';
import { head, tail, nil, cons } from '#src/utils/list.functional.api.js';
//ex2
function differentiate2(h,f){
    function f(x){
        return (f(x+h)-f(x-h))/(2*h)
    }
    return f;
}



function differentiate3(h,x,f){
    return f(x+h)-f(x-h)/(2*h)
}

const diffCurry=(h)=>(f)=>(x)=>(f(h+x)-f(h-x))/(2*h)
const speCurryH=(f)=>diffCurry(0.1)(f)
const sprCurryF=(h)=>diffCurry(h)(Math.cos)

//ex3
let current = start;
while (!hasReached(current, x, epsilon))
current = getNext(current, x);
return current;

function fixedPoint(x,start,epsilon,hasReached,getNext){

}