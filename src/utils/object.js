/** @packageDocumentation
 *
 * This file implements some helper functions on plain Javascript objects.
 */


/** Given an object `anObject` and a key `aKey`, returns a boolean
 * telling is this object effectively possesses this key as an
 * attribute (in this function, objects are considered as a set of
 * key-value pairs).
 *
 * @param {any} anObject - the object to consider
 * @param {string} aKey - the key inside the object
 * @returns {boolean} if `anObject` possesses a value associated to `aKey`
 *
 * @example
 * hasKey({ x: 1 }, "y"); // -> false
 * hasKey({ y: 1 }, "y"); // -> true
 */
function hasKey(anObject, aKey) {
    return Object.keys(anObject).includes(aKey);
}


export {
    hasKey,
};
