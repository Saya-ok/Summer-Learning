"use strict";
const assert = require("node:assert");

/**
 * Return true if brackets in s are valid (properly nested & closed).
 * Only characters are ()[]{}.
 * Time target: O(n), Space target: O(n).
 */
function isValidBrackets(s) {
    // TODO: implement using a stack
    // Idea: push expected closing bracket when you see an opening.
    // When you see a closing, it must match the top of the stack.

    for (i = 0; i < s.length; i++) {}

    const stack = [];
    const map = { "(": ")", "[": "]", "{": "}" };

    for (const char of s) {
        if (char in map) {
            stack.push(map[char]);
        } else {
            if (stack.length === 0 || stack.pop() !== char) {
                return false;
            }
        }
    }
    return stack.length === 0;
}

// --- Tests ---
(function test() {
    const cases = [
        ["", true],
        ["()", true],
        ["()[]{}", true],
        ["(]", false],
        ["([)]", false],
        ["{[]}", true],
        ["(((((", false],
        ["({}[])", true],
        ["][", false],
        ["{[()()]}", true],
    ];

    for (const [input, expected] of cases) {
        assert.strictEqual(
            isValidBrackets(input),
            expected,
            `Failed on "${input}"`
        );
    }
    console.log("All tests passed!");
})();
