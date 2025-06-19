"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBlockHash = void 0;
const crypto_js_1 = require("crypto-js");
const createBlockHash = (BlockhashDto) => {
    let Blockhash = "";
    for (const key in BlockhashDto) {
        Blockhash += BlockhashDto[key];
    }
    return (0, crypto_js_1.SHA256)(Blockhash).toString();
};
exports.createBlockHash = createBlockHash;
