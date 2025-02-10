/** @packageDocumentation
 *
 * This file implements pointed pairs in Javascript. In a
 * Typescript-like manner :
 *
 * ```
 * type Pair<A,B> = { car: A, cdr: B }
 * ```
 *
 * A pointed pair is { @link https://en.wikipedia.org/wiki/CAR_and_CDR
 * | traditionally } made of a {@link car | `car` } and a {@link cdr |
 * `cdr` } that represent both parts.
 */

import * as T from "./typedefs.js";
import { anyToString } from './printers.js';
import { raiseError } from './error.js';
import { hasKey } from './object.js';
import { isObject } from './matchers.js';


/** Given two values `aCar` and `aCdr`, return the pointed pair
 * containing these two values.
 *
 * @param {any} aCar - the first element of the pair
 * @param {any} aCdr - the second element of the pair
 * @returns {T.Pair<any,any>}
 */
function cons(aCar, aCdr) {
    return { car: aCar, cdr: aCdr, toStringFun: pairToString };
}


/** Given a pointed pair `aPair`, returns its first element
 *
 * @param {T.Pair<any,any>} aPair - the pair considered
 * @returns {any} the first element of `aPair`
 */
function car(aPair) {
    return aPair.car;
}


/** Given a pointed pair `aPair`, returns its second element
 *
 * @param {T.Pair<any,any>} aPair - the pair considered
 * @returns {any} the second element of `aPair`
 */
function cdr(aPair) {
    return aPair.cdr;
}


/** Given a value `aValue`, returns a boolean telling if the value is
 * effectively a pointed pair.
 *
 * @param {any} aValue - the value considered
 * @returns {boolean} - if `aValue` is indeed a pointed pair
 */
function isCons(aValue) {
    return isObject(aValue) &&
        hasKey(aValue, 'car') &&
        hasKey(aValue, 'cdr');
}

/** An alias for `isCons` for simplicity */
const isPair = isCons;


/** Computes a string displaying the contents of the pointed pair
 * `aPair`. This function is currified, takes a printing function for
 * the values as first parameter, and then returns a function taking
 * the pointed pair to display.
 *
 * @param {(a: any) => string} dispFun1 - a function that displays the first element
 * @param {(a: any) => string} dispFun2 - a function that displays the second element
 * @returns {(a: T.Pair<any,any>) => string} a function displaying a pointed pair
 */
function pairToString(dispFun1 = anyToString, dispFun2 = anyToString) {
    return (aPair) => {
        if (!isPair(aPair))
            return raiseError({ fun_name: "pairToString", args: arguments,
                                reason: `the argument is not a list` });
        else
            return `(${dispFun1(car(aPair))}, ${dispFun2(cdr(aPair))})`;
    };
}


export {
    cons,
    car, cdr,
    isCons, isPair,
    pairToString
};
