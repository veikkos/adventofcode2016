'use strict';

function normalizeDelims(input) {
    return input.split('\r\n').join('\n').split('\r').join('\n');
}

module.exports = {
    normalizeDelims
};
