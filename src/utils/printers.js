/** @packageDocumentation
 *
 * This file implements a series of printers that can be used for
 * displaying the types implemented in this directory. Most important
 * is the {@link anyToString | `anyToString`} function that is
 * supposed to display any kind of Javascript value without error.
 */
import { hasKey } from './object.js';
import * as M from './matchers.js';
import * as Z from './ansi.js';


function strToString(aString) {
    return Z.greenString(`'${aString}'`);
}


function arrToString(anArray) {
    const vals = anArray.map((v) => `${anyToString(v)}`);
    return `[ ${vals.join(', ')} ]`;
}


function argumentsToString(someArguments) {
    const vals = Array.from({ length: someArguments.length },
                            (_, i) => anyToString(someArguments[i]));
    return `(${vals.join(', ')})`;
}


function objToString(anObject) {
    const keys = Object.keys(anObject);
    if (keys.length === 0)
        return "{}";
    const maps = keys.map((k) => `${k}:${anyToString(anObject[k])}`);
    return `{ ${maps.join(', ')} }`;
}


/** Returns a string representing the arguments passed to the
 * function. If more than one argument is given, returns a string
 * representing the array of arguments.
 *
 * Internally, if an object contains a `toStringFun` key, this function
 * reuses this key to print the object.
 *
 * @returns {string}
 *
 * @example
 * When working with trees and lists :
 *
 * ```
 * import * as L from "./utils/list.functional.api.js";
 * import * as T from "./utils/tree.functional.api.js";
 *
 * anyToString(3.14);                                // -> "3.14"
 * anyToString(L.cons(1, L.cons(2, L.nil)));         // -> "(|1, 2|)"
 * anyToString(T.node(1, L.cons(T.leaf(2), L.nil))); // -> "node(1, (|leaf(2)|))"
 * ```
 */
function anyToString() {
    const aValue = (arguments.length === 1) ? arguments[0] : arguments;
    if (aValue === undefined) {
        return Z.yellowString("undefined");
    } else if (aValue === null) {
        return Z.yellowString("null");
    } else if (M.isObject(aValue) && hasKey(aValue, "toStringFun")) {
        return aValue.toStringFun(anyToString)(aValue);
    } else if (M.isArray(aValue)) {
        return arrToString(aValue);
    } else if (M.isArguments(aValue)) {
        return argumentsToString(aValue);
    } else if (M.isObject(aValue)) {
        return objToString(aValue);
    } else if (M.isString(aValue)) {
        return strToString(aValue);
    } else {
        return aValue.toString();
    }
}


/** Logs a string to the standard output, using a combination of
 * `anyToString` and `console.log`.
 */
function logString() {
    const aValue = (arguments.length === 1) ? arguments[0] : arguments;
    console.log(anyToString(aValue));
}


/** Install the `logString` function into the `console` object */
if (console.logA === undefined) {
    console.logA = logString;
}


export {
    anyToString, logString,
};
