import { isEmpty, listAppend } from '#src/utils/list.functional.api';
import { hasKey } from '#src/utils/object.js';
hasKey({ name: "Alf" }, "name"); // → true
hasKey({ name: "Alf" }, "cat"); // → false

function isList(L){
    return (L===nil || hasKey(L,"car") && hasKey(L,"cdr") && (typeof L=="object") && isList(cons(L.cdr)));
}

//node=creer un arbre
//val: acceder à la valeur
//children:liste d'arbres
function isTree(t){
    function isTreelist(l){
        return isEmpty(l) || (isList(l) && isTree(head(l)) && isTreelist(tail(l)))
    }
    return hasKey(t,"val") && hasKey(t,"children") && (typeof t === "object ") && isTreelist(t.children);
}


//exo2

function listFlatten(l){
    if (isEmpty(l)){
        return l
    }
    else if (isList(head(l))){
        return listAppend(listFlatten(head(l),listFlatten(tail(l))))
    }
    else{
        return cons(head(l),listFlatten(tail(l)))
    }
}


function listFlattentr(l,p){
    function listFlattenInt(l,acc){
        if (isEmpty(l)){
            return acc
        }
        else if(isList(head(l))){
            return listFlattenInt(listAppend(head(l),tail(l),acc))
        }
        else{
            return listFlattenInt(tail(l),listAppend(acc,cons(head(l),nil)))
        }
        return listFlattenInt(l,nil)
    }
}