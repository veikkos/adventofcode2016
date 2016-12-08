'use strict';

var normalize = require('./common').normalizeDelims;

function parseBrackets(input) {
    var brackets = [],
        nonBrackets = [],
        modified = '' + input,
        re = /\[([a-z]+)\]/g,
        item;

    while ((item = re.exec(input))) {
        // item[0] === '[abc]
        // item[1] === 'abc'
        brackets.push(item[1]);
        modified = modified.replace(item[0], ',');
    }

    nonBrackets = modified.split(',');

    return { brackets: brackets, nonBrackets : modified.split(',') };
}

function validateAbba(input) {
    for (var i = 0; i < input.length - 3; ++i) {
        var abba = input.slice(i, i + 4);

        if (abba[0] === abba[3] && abba[1] === abba[2] &&
            abba[0] !== abba[1]) {
            return true;
        }
    }

    return false;
}

function parseStrings(input) {
    var ar = normalize(input).trim().split('\n');
    var brackets = ar.map(function(item) {
        return parseBrackets(item);
    });

    return brackets.reduce(function(ret, item) {
        var bracketAbbas = item.brackets.filter(function(i) {
            return validateAbba(i);
        });

        if (bracketAbbas.length) {
            return ret;
        }

        var nonBracketAbbas = item.nonBrackets.filter(function(i) {
            return validateAbba(i);
        });

        return nonBracketAbbas.length ? ret + 1 : ret;
    }, 0);
}

module.exports = {
    parseBrackets,
    validateAbba,
    parseStrings
};
