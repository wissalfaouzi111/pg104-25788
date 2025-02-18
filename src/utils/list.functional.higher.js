/** @packageDocumentation
 *
 * This module implements a bunch of higher-order functions on the
 * functional {@link "utils/list.functional.api" | lists }, namely
 * `map`, `reduce` and `foreach`.
 */

import * as T from "./typedefs.js";
import * as LA from './list.functional.api.js';

/** Applies the function `aFun` to each element of the list `aList` and
 * returns the list of the results
 * @param {T.List<any>} aList - the list to consider
 * @param {(_:any) => any} aFun - a mapping function applied to each element of `aList`
 * @returns {T.List<any>} the list of the results
 *
 * @example
 * listMap(cons(1, cons(2, nil)), (z) => `${z}`); // -> cons("1", cons("2", nil))
 */
function listMap(aList, aFun) {
    if (LA.isEmpty(aList))
        return LA.nil;
    else
        return LA.cons(aFun(LA.head(aList)), listMap(LA.tail(aList), aFun));
}


/** Applies the reduction of `aFun` on the list `aList` starting from
 * `anAcc`, and visiting the elements of `aList` from left to right.
 * @param {T.List<any>} aList - the list to consider
 * @param {(anAcc:any, aValue:any) => any} aFun -  a function supposed to be written (anAcc, aValue) => aNewAcc
 * @param {any} anAcc - a starting value
 *
 * @example
 * listReduce(cons(1, cons(2, nil)), (anAcc, aValue) => anAcc+aValue, 0); // -> 3 = 1 + 2
 */
function listReduce(aList, aFun, anAcc) {
    if (LA.isEmpty(aList))
        return anAcc;
    else
        return listReduce(LA.tail(aList), aFun, aFun(anAcc, LA.head(aList)));
}


/** Applies the function `aFun` to each element of the list `aList`
 * @param {T.List<any>} aList - the list to consider
 * @param {(aValue:any) => void} aFun -  a function applied to each element of `aList`
 * @returns {void}
 */
function listForEach(aList, aFun) {
    if (LA.isEmpty(aList))
        return;
    else {
        aFun(LA.head(aList));
        listForEach(LA.tail(aList), aFun);
    }
}


export {
    listMap, listReduce, listForEach,
};
