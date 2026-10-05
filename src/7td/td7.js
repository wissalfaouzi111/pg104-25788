import { anyToString } from '#src/utils/printers.js';
import { head, tail, nil, cons, isEmpty } from '#src/utils/list.functional.api.js';
//ex1
function listMap(f,l){
    if (isEmpty(l)){
        return l;
    }
    return cons(f(head(l)),listMap(f,tail(l)));
}

function list2Squares(l){
    return listMap((x)=>x**2,l)
}


const aList = cons(1, cons(-1, cons(2, nil)));
console.logA(listMap((x)=>x+1, aList))
console.logA(list2Squares(aList))


//ex2

function listFoldL(f,l,init){
    if (isEmpty(l)){
        return init;
    }
    return listFoldL(f,tail(l),f(init,head(l)))
}

let aNumberList2 = cons(1, cons(8, cons(2, cons(7, nil))));


function listFoldR(f,l,init){
    if (isEmpty(l)){
        return init;
    }
    return f(head(l),listFoldR(f,tail(l),init))
}

console.logA(listFoldL((x)=>x+1,aList,0))


function prodIterate(g,l){
    
}