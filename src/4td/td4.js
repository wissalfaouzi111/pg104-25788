
import { anyToString } from '#src/utils/printers.js';
import { head, tail, nil, cons } from '#src/utils/list.functional.api.js';

let aList = cons(1, cons(2, nil));
console.log(anyToString(aList));
//cons(value, list) : crée un nouvel élément (tête) qui pointe vers le reste de la liste.
//head(list) : récupère le premier élément de la liste.
//tail(list) : récupère le reste de la liste (tout sauf le premier élément).
//nil : représente une liste vide.
//anyToString(list) : convertit la liste en une chaîne lisible.

function listIota(a,b){
    if (a>b){
        return nil
    }
    else{
        return cons(a,listIota(a+1,b))
    }
}
console.logA(listIota(1,4))
console.logA(listIota(4,1))

function listDisp(L){
    if (L===nil){
        return anyToString(L)
    }
    else{
        return anyToString(cons(a,listIota(a+1,b)))
    }
}

console.logA(listIota(1,4))
console.logA(listIota(4,1))



function listLength(L){
    if (L===nil){
        return 0;
    }
    else{
        return 1+listLength(tail(L)) 
    }
}

console.log(listLength(nil))
console.log(listLength(listIota(1,4)))

function listAppend(L,M){
    if (listLength(L)==0){
        return M
    }
    else{
        return cons(head(L),listAppend(tail(L),M))
    }
}
console.logA(listAppend(listIota(1,3),listIota(1,4)))

//terminaaaaale

function insert(L,e){
    if (listLength(L)===0){
        return cons(e,L)
    }
    else{
        return cons(head(L),)
    }
}