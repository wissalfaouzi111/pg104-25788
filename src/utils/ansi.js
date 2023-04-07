/** @packageDocumentation
 *
 * This file implements string colorization with ANSI escape codes.
 * All colorization can be bypassed if the environment in which the
 * code is executed contains the variable `COLOR=false`
 */

/** Generic string colorizer
 * @param {number} aCode - an ANSI code
 * @returns {(s: string) => string}
 */
function internalString(aCode) {
    return (aString) => {
        if (process.env.COLOR !== "false")
            return `\u001b[${aCode}m${aString}\u001b[0m`;
        else
            return aString;
    };
}

/** Colorizes the string `s` in red (ANSI code 31)
 * @returns {string} the colorized string
 */
const redString    = internalString(31);

/** Colorizes the string `s` in green (ANSI code 32)
 * @returns {string} the colorized string
 */
const greenString  = internalString(32);

/** Colorizes the string `s` in yellow (ANSI code 33)
 * @returns {string} the colorized string
 */
const yellowString = internalString(33);

/** Colorizes the string `s` in blue (ANSI code 34)
 * @returns {string} the colorized string
 */
const blueString   = internalString(34);

/** Colorizes the string `s` in pink (ANSI code 35)
 * @returns {string} the colorized string
 */
const pinkString   = internalString(35);

/** Colorizes the string `s` in gray (ANSI code 90)
 * @returns {string} the colorized string
 */
const grayString   = internalString(90);

export {
    greenString, redString, yellowString,
    grayString, blueString, pinkString,
};
