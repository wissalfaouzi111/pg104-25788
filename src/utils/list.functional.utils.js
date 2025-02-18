/** @packageDocumentation
 *
 * This file implements some helper functions on the functional {@link
 * "utils/list.functional.api" | lists }.
 */

import * as T from "./typedefs.js";
import * as LA from './list.functional.api.js';

/** Given an equality function `elemEquals` and two lists `l1` and
 * `l2`, returns a boolean telling if the two lists are equal
 * according to this equality function. This function is currified on
 * its first parameter
 *
 * @param {(a:any, b:any) => boolean} elemEquals - an equality function for elements
 * @returns {(a:T.List<any>, b:T.List<any>) => boolean} - an equality function for lists of elements
 *
 *
 * @example
 * listEquals()(cons(1, nil), cons(1, nil)) // -> true
 * listEquals()(cons(1, nil), cons(3, nil)) // -> false
 * listEquals((a,b) => (a-b)%2 === 0)(cons(1, nil), cons(3, nil)) // -> true
 */
function listEquals(elemEquals = (a,b) => a === b) {
    function listRec (l1, l2) {
        if (LA.isEmpty(l1) && LA.isEmpty(l2))
            return true;
        else if (LA.isEmpty(l1) || LA.isEmpty(l2))
            return false;
        else return (elemEquals(LA.head(l1), LA.head(l2)) &&
                     (listRec(LA.tail(l1), LA.tail(l2))));
    }
    return listRec;
}


/** Given a list `aList`, returns a clone of shallow copies. Every
 * element is cloned by simple copy.
 *
 * @param {T.List<any>} aList - the list to consider
 * @returns {T.List<any>} the cloned list
 */
function listClone(aList) {
    if (LA.isEmpty(aList))
        return LA.nil;
    else return LA.cons(LA.head(aList), listClone(LA.tail(aList)));
}


/** Given a list `aList`, returns a new list of its elements in the
 * inverse order. Every element is cloned by simple copy.
 *
 * @param {T.List<any>} aList - the list to consider
 * @returns {T.List<any>} the reversed list
 */
function listReverse(aList) {
    function listRevTR(l, r) {
        if (LA.isEmpty(l))
            return r;
        else
            return listRevTR(LA.tail(l), LA.cons(LA.head(l), r));
    }
    return listRevTR(aList, LA.nil);
}


/** Transforms an array `anArray` into a list. The elements appear in
 * the same order in the array and the returned list.
 *
 * @param {any[]} anArray - the array to consider
 * @returns {T.List<any>} a list containing the same elements
 */
function arrayToList(anArray) {
    if (anArray.length <= 0)
        return LA.nil;
    else
        return LA.cons(anArray[0], arrayToList(anArray.slice(1)));
}


/** Transforms a list `aList` into an array. The elements appear in
 * the same order in the list and the returned array.
 *
 * @param {T.List<any>} aList - the list to consider
 * @returns {any[]} an array containing the same elements
 */
function listToArray(aList) {
    if (LA.isEmpty(aList))
        return [];
    else
        return [ LA.head(aList) ].concat(listToArray(LA.tail(aList)));

}


export {
    listEquals,
    listClone,
    listReverse,
    arrayToList, listToArray,
};
