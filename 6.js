'use strict';

var normalize = require('./common').normalizeDelims;

function getCharacter(input, reversed) {
    var charCount = input.reduce(function(ar, ch) {
        return (ar.indexOf(ch) == -1) ? ar.concat(ch) : ar;
    }, []).map(function(item) {
        var count = input.reduce(function(c, ch) {
            return (ch === item) ? c + 1: c;
        }, 0);
        return [count, item];
    }).sort();

    if (!reversed) {
        charCount = charCount.reverse();
    }

    return charCount.length ? charCount[0][1]: null;
}

function parseCharacter(input, index) {
    return input.map(function(line) {
        return line[index];
    });
}

function solveTask(input, reversed) {
    var code = '';
    var lengths = input.reduce(function(o, item) {
        return o.concat(item.length);
    }, []);

    function lengthsEqual () {
        return lengths.reduce(function(o, i) {
            return o === i ? o : NaN;
        });
    }

    var commonLength = lengthsEqual(lengths);

    if (!commonLength) {
        return null;
    }

    for(var i=0; i<commonLength; ++i) {
        var chars = parseCharacter(input, i);
        code = code + getCharacter(chars, reversed);
    };

    return code;
}

function parseAndSolve(input, reversed) {
    return solveTask(normalize(input).trim().split('\n'), reversed);
};

module.exports = {
    getCharacter,
    parseCharacter,
    solveTask,
    parseAndSolve
};
