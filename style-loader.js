"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dirhash_1 = require("./lib/dirhash");
function styleLoader(source) {
    const { globalsPrefix = 'app' } = this.query;
    const prefix = Array.isArray(globalsPrefix) ? globalsPrefix : [globalsPrefix];
    const classLineRegex = /(.*(\..*?)(?<!;)$)/gm;
    const classRegex = new RegExp(`(?<=\\.)((?!(${prefix.join('|')})[-_])\\w+[\\w-]*\\b)`, 'g');
    if (!source.match(classLineRegex)) {
        return source;
    }
    const [dirName, dirHash] = dirhash_1.createDirHash(this.context);
    return source.replace(classLineRegex, matchingLine => matchingLine.replace(classRegex, className => `${dirName}-${dirHash}-${className}`));
}
exports.default = styleLoader;
;