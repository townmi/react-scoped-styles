"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dirhash_1 = require("./lib/dirhash");
function scriptLoader(source) {
    const { globalsPrefix = 'app' } = this.query;
    const prefix = Array.isArray(globalsPrefix) ? globalsPrefix : [globalsPrefix];
    const prefixRegex = new RegExp(`^(${prefix.join('|')})[-_]`);
    const classExprRegex = /classname:\s(["'].*?["']|.*?\))/gi;
    const classStringRegex = new RegExp(`['|"](.*?)['|"]`, 'g');
    if (!source.match(classExprRegex)) {
        return source;
    }
    const [dirName, dirHash] = dirhash_1.createDirHash(this.context);
    return source.replace(classExprRegex, classExpr => {
        return classExpr.replace(classStringRegex, (_match, classNames) => {
            const uniqueClassNames = classNames.split(' ')
                .filter(Boolean)
                .map((className) => {
                const containsPrefix = prefixRegex.test(className);
                const uniqueClassName = `${dirName}-${dirHash}-${className}`;
                return containsPrefix ? className : uniqueClassName;
            })
                .join(' ');
            const prefix = /^\s/.test(classNames) ? "' " : "'";
            const suffix = /\s$/.test(classNames) ? " '" : "'";
            return prefix + uniqueClassNames + suffix;
        });
    });
}
exports.default = scriptLoader;
