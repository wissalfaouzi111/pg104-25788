/** @packageDocumentation
 *
 * This file implements a series of matchers that can be used for
 * checking that the arguments of a function are correct.
 *
 * These functions are for the basic data types of Javascript. All the
 * other data types implemented in this library have their own
 * matchers.
 */


/** Given a value `aValue`, returns a boolean telling if the value is
 * effectively a number.
 *
 * @param {any} aValue - the value considered
 * @returns {boolean} - if `aValue` is indeed a number
 */
function isNumber(aValue) {
    return typeof aValue === 'number';
}


/** Given a value `aValue`, returns a boolean telling if the value is
 * effectively a string.
 *
 * @param {any} aValue - the value considered
 * @returns {boolean} - if `aValue` is indeed a string
 */
function isString(aValue) {
    return (typeof aValue === 'string' || aValue instanceof String);
}


/** Given a value `aValue`, returns a boolean telling if the value is
 * effectively a function.
 *
 * @param {any} aValue - the value considered
 * @returns {boolean} - if `aValue` is indeed a function
 */
function isFunction(aValue) {
    return typeof aValue === 'function';
}


/** Given a value `aValue`, returns a boolean telling if the value is
 * effectively an array.
 *
 * @param {any} aValue - the value considered
 * @returns {boolean} - if `aValue` is indeed an array
 */
function isArray(aValue) {
    return (!!aValue) && (aValue.constructor === Array);
}


/** Given a value `aValue`, returns a boolean telling if the value is
 * effectively an `IArguments` object.
 *
 * @param {any} aValue - the value considered
 * @returns {boolean} - if `aValue` is indeed a list of arguments
 */
function isArguments(aValue) {
    return Object.prototype.toString.call(aValue) === '[object Arguments]';
}


/** Given a value `aValue`, returns a boolean telling if the value is
 * effectively a base object.
 *
 * @param {any} aValue - the value considered
 * @returns {boolean} - if `aValue` is indeed an object
 */
function isObject(aValue) {
    return (typeof aValue === 'object') && (aValue !== null);
}


export {
    isArguments,
    isArray,
    isFunction,
    isNumber,
    isObject,
    isString,
};
