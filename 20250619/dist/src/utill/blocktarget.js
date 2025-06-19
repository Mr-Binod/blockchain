"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBlockTarget = void 0;
const constant_1 = require("../constant");
const createBlockTarget = (difficulty) => {
    return BigInt(constant_1.MAX_TARGET) / BigInt(difficulty);
};
exports.createBlockTarget = createBlockTarget;
