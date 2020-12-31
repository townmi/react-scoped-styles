"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const crypto_1 = require("crypto");
function createDirHash(filePath) {
    const { dir: dirPath, name: dirName } = path_1.parse(filePath);
    const dirHash = crypto_1.createHash('md5').update(dirPath).digest('hex').slice(0, 10);
    return [dirName, dirHash];
}
exports.createDirHash = createDirHash;
