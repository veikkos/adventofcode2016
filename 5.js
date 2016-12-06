'use strict';

var crypto = require('crypto');

function getHash(input) {
    return crypto.createHash('md5').update(input).digest("hex");
}

function getDigits(id) {
    var index = 0,
        hash,
        code = '';

    for (var i=0; i<8; ++i) {
        do {
            hash = getHash(id + index++);
        }
        while (!hash.startsWith('00000'));

        code += hash[5];
    }

    return code;
}

function getAdvancedDigits(id) {
    var index = 0,
        hash,
        code = new Array(8),
        pos;

    code.fill(0);

    do {
        do {
            hash = getHash(id + index++);
        } while (!hash.startsWith('00000'));

        pos = parseInt(hash[5], 16);

        if (pos < code.length && code[pos] === 0) {
            code[pos] = hash[6];
        }
    }
    while(code.indexOf(0) != -1);

    return code.join('');
}

module.exports = {
    getDigits,
    getAdvancedDigits
};
