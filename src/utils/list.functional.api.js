/** @packageDocumentation
 *
 * This file implements lists as linked lists. A list is either {@link
 * "utils/list.functional.api".nil | `nil` } or a {@link
 * "utils/list.functional.api".cons | `cons` } of a head value and a
 * tail sublist. Each element of the list is a {@link "utils/pair" |
 * pointed pair }. In a Typescript-like description :
 *
 * ```
 * type Nil = {}
 * type List<A>   = Nil | Pair<A, List<A>>
 * ```
 *
 * @example
 * Here are two different ways to create lists :
 *
 * ```
 * import * as L from "./src/utils/list.functional.api.js";
 *
 * const aList1 = L.cons(1, L.cons(2, L.nil));
 * anyToString(aList1); // -> (|1, 2|)
 *
 * const aList2 = [1, 2, 3, 4, 5, 6, 7].reduce((acc, v) => L.cons(v, acc), L.nil);
 * anyToString(aList2); // -> (|7, 6, 5, 4, 3, 2, 1|)
 * ```
 */

import * as T from "./typedefs.js";
import { hasKey } from './object.js';
import { raiseError } from './error.js';
import { anyToString } from './printers.js';
import * as P from './pair.js';


/** @returns {T.List<any>} */
const internalMakeNil = () => {
    const insideNil = {};     // A generic placeholder for the end of lists
    insideNil.toStringFun = listToStringInternal;
    Object.freeze(insideNil); // Make it immutable
    return insideNil;
};

/** The empty list */
const nil = internalMakeNil();


/** The function creating a linked list, with its first element `head`
 * and the following elements as another list `tail`
 *
 * @param {any} aHead - a head for the list
 * @param {T.List<any>} aTail - a tail for the list
 * @returns {T.List<any>} a list with the aforementioned head and tail
 */
function cons(aHead, aTail) {
    if (!isList(aTail)) {
        return raiseError({ fun_name: "cons", args: arguments,
                            reason: "the tail is not a list" });
    } else {
        const aCons = P.cons(aHead, aTail);
        aCons.toStringFun = listToStringInternal;
        return aCons;
    }
}


/** Given a list `aList`, return its first element.
 *
 * Raises an error in case of an empty list.
 *
 * `head` is mostly an alias for `car` with error handling.
 *
 * @param {T.List<any>} aList - the list considered
 * @returns {any} - the head of `aList` if any
 */
function head(aList)    {
    if (!isList(aList)) {
        return raiseError({ fun_name: "head", args: arguments,
                            reason: "the argument is not a list" });
    } else if (isEmpty(aList))
        return raiseError({ fun_name: "head", args: arguments,
                            reason: "the list is empty" });
    else
        // @ts-ignore: subtyping
        return P.car(aList);
}


/** Given a list `aList`, return its tail, i.e the list deprived of its
 * first element.
 *
 * Raises an error in case of an empty list.
 *
 * `tail` is mostly an alias for `cdr` with error handling.
 *
 * @param {T.List<any>} aList - the list considered
 * @returns {any} - the tail of `aList` if any
 */
function tail(aList)    {
    if (!isList(aList)) {
        return raiseError({ fun_name: "tail", args: arguments,
                            reason: "the argument is not a list" });
    } else if (isEmpty(aList))
        return raiseError({ fun_name: "tail", args: arguments,
                            reason: "the list is empty" });
    else
        // @ts-ignore: subtyping
        return P.cdr(aList);
}


/** Given a list `aList`, returns a boolean telling if the list is
 * empty (i.e contains no element and is in fact equal to nil)
 *
 * @param {T.List<any>} aList - the list considered
 * @returns {boolean} - if `aList` is empty or not
 */
function isEmpty(aList) { return aList === nil; }


/** Given a value `aValue`, returns a boolean telling if the value is
 * effectively a list.
 *
 * @param {any} aValue - the value considered
 * @returns {boolean} - if `aValue` is indeed a list
 */
function isList(aValue) {
    return (aValue === nil) ||
        (P.isCons(aValue) && isList(P.cdr(aValue)));
}


/** Computes a string displaying the contents of the list `aList`. This
 * function is currified, takes a printing function for the values as
 * first parameter, and then returns a function taking the list to
 * display.
 *
 * @param {(a: any) => string} dispFun - a function that displays a single element
 * @returns {(a: T.List<any>) => string} a function displaying a list
 *
 * @example
 * listToString()(cons(1, cons(2, nil))) // -> "(|1, 2|)"
 */
function listToStringInternal(dispFun = (s) => s) {
    function listDispRec(dfun, l) {
        if (isEmpty(l))
            return "";
        else if (isEmpty(tail(l)))
            return `${dfun(head(l))}`;
        else
            return `${dfun(head(l))}, ${listDispRec(dfun, tail(l))}`;
    }
    return (aList) => {
        if (!isList(aList))
            return raiseError({ fun_name: "listToString", args: arguments,
                                reason: `the argument is not a list`});
        else if (isEmpty(aList))
            return `(|nil|)`;
        else
            return `(|${listDispRec(dispFun, aList)}|)`;
    };
}
const listToString = listToStringInternal;


export {
    cons, nil,
    head, tail,
    isEmpty,
    listToString,
};
