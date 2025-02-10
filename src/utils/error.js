/** @packageDocumentation
 *
 * This file implements a generic error function {@link raiseError |
 * `raiseError`} that displays the arguments of a function call.
 */

import { hasKey } from './object.js';
import { anyToString } from './printers.js';

/** Given a function name, a list of arguments and a string for a
 * reason, throw an error with a prescribed message. This function
 * always throws an error. When provided a list of arguments, the
 * error message displays them with a call to {@link
 * "utils/printers".anyToString | `anyToString` }. Note that because
 * of { @link
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions
 * | the way Javascript works}, inside a lambda-function, it is
 * impossible to provide a list of arguments.
 *
 * @example
 * Here's an example of usage inside a dummy `insert` function :
 *
 * ```
 * function insert(aList, aValue) {
 *   return raiseError({ fun_name: "insert", args: arguments,
 *                       reason: "there is a good reason for that" });
 * }
 * ```
 *
 * It provides the following message in case of error :
 *
 * ```
 * Error: when calling insert((| |), 1) : there is a good reason for that
 *     at raiseError (file:///path/to/error.js:41:11)
 * ```
 *
 * It is recommended to use `return` in a functional setting because
 * the function probably returns something elsewhere inside its code
 * (and it mollifies `tsc`), but it's not necessary in an imperative
 * setting.
 *
 * @param {object} config - a list of parameters describing the error
 * @param {string} config.fun_name - the name of the function at the callpoint
 * @param {IArguments} config.args - typically the `arguments` variable at the callpoint
 * @param {string} config.reason - an explanation of the error
 *
 */
function raiseError({ fun_name: fun_name, args: args,
                      reason: reason }) {
    let message = `when calling ${fun_name}${anyToString(args)}`;
    if (reason !== undefined) {
        message = message + ` : ${reason}`;
    }
    throw new Error(message);
    return undefined; // Never reached
}

export {
    raiseError,
};
