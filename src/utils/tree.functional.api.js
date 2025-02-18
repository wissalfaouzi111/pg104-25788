/** @packageDocumentation
 *
 * This file implements helper functions on trees. It uses a tree-like
 * representation with dictionaries, and the children are stored using
 * {@link "utils/list.functional.api" | lists }. Each {@link node |
 * `node` } possesses a {@link val | `val` } attribute labeling the
 * node, and a {@link children | `children` } attribute containing the
 * {@link "utils/list.functional.api" | list } of its children. In a
 * Typescript-like description :
 *
 * ```
 * type Node<A,B> = { val: A, children: B }
 * type Tree<A>   = Node<A, List<A>>
 * ```
 *
 * This description does not allow for empty trees. A {@link leaf |
 * `leaf` } is considered to be a {@link node | `node` } with an empty
 * list for its children.
 *
 * @example
 * Two ways to create a tree :
 *
 * ```
 * import * as L from "./src/utils/list.functional.api.js";
 * import * as T from "./src/utils/tree.functional.api.js";
 *
 * const aTree1 = T.node(1, L.cons(T.node(2, L.nil), L.cons(T.node(3, L.nil), L.nil)));
 * anyToString(aTree1); // -> node(1, (|leaf(2), leaf(3)|))
 *
 * const aTree2 = T.node(6, L.cons(T.leaf(5), L.cons(T.leaf(4), L.nil)));
 * anyToString(aTree2); // -> node(6, (|leaf(5), leaf(4)|))
 * ```
 */

import * as T from "./typedefs.js";
import * as LA from './list.functional.api.js';
import * as LF from './list.functional.higher.js';
import * as LU from './list.functional.utils.js';
import { hasKey } from './object.js';
import { isObject } from './matchers.js';
import { raiseError } from './error.js';


/** Given a value `aVal` and a list of children `someChildren`, returns a
 * tree whose root is labeled by `aVal` and with `someChildren` as the
 * root children.
 * The function checks that `someChildren` is really a list of trees.
 *
 * @param {any} aVal - a value at the root of the tree
 * @param {T.List<T.Tree<any>>} someChildren - a list of children trees
 * @returns {T.Tree<any>} a tree with `aVal` at its root
 */
function node(aVal, someChildren) {
    if (!isTreeList(someChildren))
        return raiseError({ fun_name: "node", args: arguments,
                            reason: "the children are not a list of trees" });
    else
        return { val: aVal, children: someChildren,
                 toStringFun: treeToString };
}


/** Given a value `aVal`, returns a tree constituted of a single leaf
 * labeled by `aVal` and no children.
 *
 * @param {any} aVal - a value for the leaf
 * @returns {T.Tree<any>} a tree with a single leaf
 */
function leaf(aVal) {
    return node(aVal, LA.nil);
}


/** Given a tree `aTree`, returns the value labeling its root.
 *
 * @param {T.Tree<any>} aTree - the tree to consider
 * @returns {any} the value at its root
 */
function val(aTree) {
    if (!isTree(aTree))
        return raiseError({ fun_name: "val", args: arguments,
                            reason : `the argument is not a tree` });
    else return aTree['val'];
}


/** Given a tree `aTree`, returns the list of children of the root.
 *
 * @param {T.Tree<any>} aTree - the tree to consider
 * @returns {T.List<T.Tree<any>>} the children of the node as a list
 */
function children(aTree) {
    if (!isTree(aTree))
        return raiseError({ fun_name: "children", args: arguments,
                            reason : `the argument is not a tree` });
    else return aTree['children'];
}


/** Given a value `aValue`, returns a boolean telling if the value is
 * effectively a list of trees. Reuses `isTree` recursively.
 */
function isTreeList(aValue) {
    function isTreeListRec(aList) {
        if (LA.isEmpty(aList))
            return true;
        else
            return isTree(LA.head(aList)) &&
            isTreeListRec(LA.tail(aList));
    }

    if (!LA.isList(aValue))
        return false;
    else
        return isTreeListRec(aValue);
}


/** Given a value `aValue`, returns a boolean telling if the value is
 * effectively a tree.
 *
 * @param {any} aValue - the value to consider
 * @returns {boolean} if the value is effectively a tree
 */
function isTree(aValue) {
    return isObject(aValue) &&
        hasKey(aValue, 'val') &&
        hasKey(aValue, 'children') &&
        isTreeList(aValue.children);
}


/** Given a tree `aTree`, returns a boolean telling if the tree is a
 * leaf or not (i.e if it has no children). This function considers
 * that `aTree` is effectively a tree.
 *
 * @param {T.Tree<any>} aTree - the tree to consider
 * @returns {boolean} if the value is effectively a leaf with no children
 */
function isLeaf(aTree) {
    return LA.isEmpty(children(aTree));
}


/** Given a tree `aTree`, returns the height of the tree
 * (i.e the length of a maximal path to a leaf).
 *  By convention, the height of a leaf is 1.
 *
 * @param {T.Tree<any>} aTree - the tree to consider
 * @returns {number} the height of the tree
 */
function treeHeight(aTree) {
    if (isLeaf(aTree))
        return 1;
    else
        return LF.listReduce(LF.listMap(children(aTree), treeHeight),
                             (acc, val) => val > acc ? val : acc,
                             0) + 1;
}


/** Given an equality function `elemEquals` and two trees `aTree1` and
 * `aTree2`, returns a boolean telling if the two trees are equal
 * according to this equality function. This function is currified on
 * its first parameter
 *
 * @param {(a:any, b:any) => boolean} elemEquals - an equality function for elements
 * @returns {(a:T.Tree<any>, b:T.Tree<any>) => boolean} - an equality function for trees of elements
 *
 * @example
 * treeEquals()(leaf(1, nil), leaf(1, nil)) // -> true
 * treeEquals()(leaf(1, nil), leaf(3, nil)) // -> false
 * treeEquals((a,b) => (a-b)%2 === 0)(leaf(1, nil), leaf(3, nil)) // -> true
 */
function treeEquals(elemEquals = (a,b) => a === b) {
    function treeRec(aTree1, aTree2) {
        return (elemEquals(val(aTree1), val(aTree2))) &&
            (LU.listEquals(treeEquals(elemEquals))(children(aTree1), children(aTree2)));
    }
    return treeRec;
}


/** Returns a string describing the tree, on a single line. This
 * function is currified, takes a printing function for the values as
 * first parameter, and then returns a function taking the root of a
 * tree to display.
 *
 * @param {(a: any) => string} dispFun - a function that displays a single element
 * @param {string} nodeName - a string for displaying nodes
 * @param {string} leafName - a string for displaying leaves
 * @returns {(a: T.Tree<any>) => string} a function displaying a tree
 */
function treeToString(dispFun = (s) => s, nodeName = "node", leafName = "leaf") {
    return (aTree) => {
        if (!isTree(aTree))
            return raiseError({ fun_name: "treeToString", args: arguments,
                                reason: "not a tree" });
        else if (isLeaf(aTree))
            return `${leafName}(${dispFun(val(aTree))})`;
        else
            return `${nodeName}(${dispFun(val(aTree))}, ` +
            `${LA.listToString(treeToString(dispFun, nodeName, leafName))(children(aTree))})`;
    };
}


/** Displays a tree on the console. This function is currified, takes a
 * printing function as first parameter, and then returns a function
 * taking the root of a tree to display.
 *
 * @param {(a: any) => string} dispFun - a function that displays a single element
 * @returns {(a: T.Tree<any>) => void} - a function displaying a tree
 */
function treeDisp(dispFun = (s) => s) {
    function treeDispIndent(root, indent, prefix, suffix) {
        const valString = dispFun ? dispFun(root.val) : root.val;
        console.log(`${indent}${prefix}{`);
        console.log(`${indent}  val: ${valString},`);
        if (LA.isEmpty(children(root)))
            console.log(`${indent}  children: nil`);
        else {
            console.log(`${indent}  children: `);
            LF.listForEach(children(root), (child) =>
                treeDispIndent(child, indent + '    ', 'cons(', ','));
            const close = ')'.repeat(LA.listLength(children(root)));
            console.log(`${indent}    nil${close},`);
        }
        console.log(`${indent}}${suffix}`);
    }
    return (root) => treeDispIndent(root, "", "", "");
}

export {
    node, val, children, leaf,
    isTree, isLeaf,
    treeHeight,
    treeEquals,
    treeToString, treeDisp,
};
