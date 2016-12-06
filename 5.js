'use strict';

var crypto = require('crypto');

function getDigits(id, len) {
    var index = 0,
        hash,
        code = '';

    for(var i=0; i<len; ++i) {
        do {
            hash = crypto.createHash('md5').update(id + index++).digest("hex");
        } while (!hash.startsWith('00000'));

        code += hash[5];
    }

    return code;
}

module.exports = {
    getDigits
};
