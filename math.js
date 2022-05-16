// operators

const lt = 1 < 2; // less than
const lte = 1 <= 2; // less than or equal to
const eq = 1 == 2; // equal to
const eeq = 1 === 2; // exact equal to
const neq = 1 != 2; // not equal to
const neeq = 1 !== 2; // not exact equal to
const gte = 1 >= 2; // greater than or equal to
const gt = 1 > 2; // greater than

const positive = +123;
const negative = -positive;
const not = !true;
const castToBool = !!123;

const plus = 1 + 2;
const minus = 1 - 2;
const multiply = 1 * 2;
const divide = 1 / 2;
const remainder = 1 % 2; // also called mod or modulo or modulus
const power = 1 ** 2; // can also use Math.pow(1, 2)

const bitAND = 1 | 2; // 0001 | 0010 === 0011
const bitOR = 1 & 2; // 0001 & 0010 === 0000
const bitXOR = 5 ^ 3; // 0101 ^ 0011 === 0110
const bitShift = 1 << 2; // 0001 << 2 === 0100, there's more of these, but this is the basic
// bitwise is very limited / can cause issues in JS due to numeric representation

const and = true && false;
const or = true || false;
const nullCoallesce = null ?? 5; // if the left hand value is null or undefined, take the right hand, otherwise take left
const ternary = true ? 1 : 2; // if true, take left, otherwise take right

// good things to know

boolA || boolB === !(!boolA && !boolB) // OR
boolA && boolB === !(!boolA || !boolB) // OR
!boolA && !boolB === !(boolA || boolB) // OR <--- probably the most intuitive to read
!boolA || !boolB === !(boolA && boolB) // DeMorgan's Law - if (A and B) is equivalent to if (not(not(A) or not(B)))
// effectively: negate each boolean, flip 'and' and 'or', negate whole statement

123_456_789; // you can use _ as visible separators
0b1111; // binary
0xFF; // hexadecimal
123456789012345678901234567890n; // BigInt, always integers, allows effectively infinitely large integers since otherwise numbers in JS are doubles which have limited space

Math.sign(12); // returns -1, -0, 0, or 1
Math.pow(1, 2);
Math.sqrt(2);
Math.sin(1);
Math.cos(1);
// etc.
Math.PI;
Math.E;
Infinity; // result of 1 / 0, effectively all numbers except Infinity are less than it
NaN; // Not a Number, math error, never equal to itself (NaN from 1 / 'hi' cannot be considered the same as NaN from 3 / 'hey'), technically still a number
