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
        const abba = input.slice(i, i + 4);

        if (abba[0] === abba[3] && abba[1] === abba[2] &&
            abba[0] !== abba[1]) {
            return true;
        }
    }

    return false;
}

function findAbas(input, invert) {
    var out = [];
    input.forEach(function(item) {
        for (var i = 0; i < item.length - 2; ++i) {
            var aba = item.slice(i, i + 3);

            if (aba[0] === aba[2] && aba[0] !== aba[1]) {
                invert ? out.push(aba[1] + aba[0] + aba[1]) :
                    out.push(aba);
            }
        }
    });

    return out;
}

function parseAbaStrings(input) {
    const ar = normalize(input).trim().split('\n');
    const brackets = ar.map(function(item) {
        return parseBrackets(item);
    });

    return brackets.reduce(function(ret, item) {
        const abas = findAbas(item.nonBrackets),
              babs = findAbas(item.brackets, true);
        var match = false;

        abas.forEach(function(aba) {
            babs.forEach(function(bab) {
                if (aba === bab) {
                    match = true;
                }
            });
        });

        return match ? ret = ret + 1 : ret;
    }, 0);
}

function parseStrings(input) {
    const ar = normalize(input).trim().split('\n');
    const brackets = ar.map(function(item) {
        return parseBrackets(item);
    });

    return brackets.reduce(function(ret, item) {
        const bracketAbbas = item.brackets.filter(function(i) {
            return validateAbba(i);
        });

        if (bracketAbbas.length) {
            return ret;
        }

        const nonBracketAbbas = item.nonBrackets.filter(function(i) {
            return validateAbba(i);
        });

        return nonBracketAbbas.length ? ret + 1 : ret;
    }, 0);
}

module.exports = {
    parseBrackets,
    validateAbba,
    parseStrings,
    findAbas,
    parseAbaStrings
};
