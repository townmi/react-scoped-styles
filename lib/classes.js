"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function classes(...classPairs) {
    const classNames = classPairs
        .map((pair) => {
        if (typeof pair === 'string') {
            return pair;
        }
        const [condition, className] = pair;
        return condition ? className : '';
    })
        .filter(Boolean)
        .join(' ');
    return classNames;
}
exports.classes = classes;
