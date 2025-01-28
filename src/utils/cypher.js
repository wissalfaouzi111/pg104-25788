/** @packageDocumentation
 *
 * This file implements some very simple cyphers.
 */

/** Caesar cypher function
 * (https://en.wikipedia.org/wiki/Caesar_cipher) Returns the encoding
 * of `aStr` after a rotation of size `offset`. `aStr` is supposed to
 * be a string composed uniquely from `a-z` characters.
 *
 * @param {string} aStr - the string to cypher
 * @param {number} offset - the rotation to apply
 * @returns {string} the cyphered string
 *
 * @example
 * cypher(’abcde’, 1);  // -> ’bcdef’
 * cypher(’bcdef’, -1); // -> ’abcde’
 * cypher(’abcde’, 13); // -> ’nopqr’
 * cypher(’nopqr’, 13); // -> ’abcde’
 */
function cypherCaesar(aStr, offset) {
    let res = '';
    const codeA  = 'a'.charCodeAt(0); // character code of 'a'
    const extent = 26;                // number of letters in alphabet
    const realoffset = ((offset % extent) + extent) % extent;
    for (let i = 0; i < aStr.length; i++) {
        const code = aStr.charCodeAt(i);
        if ((code >= codeA) && (code <= codeA + extent)) {
            const newcode = ((code-codeA+realoffset) % extent) + codeA;
            res += String.fromCharCode(newcode);
        } else {
            res += aStr[i];
        }
    }
    return res;
}

export {
    cypherCaesar,
};
