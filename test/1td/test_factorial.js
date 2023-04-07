import * as A from "../../src/utils/ansi.js";
import { factorial } from "../../src/1td/factorial.js";

const aTest = factorial(5) === 5*4*3*2*1;
const aResult = aTest ? A.greenString("OK") : A.redString("KO");
console.log(`factorial(5) === ${factorial(5)} : ${aResult}`);
