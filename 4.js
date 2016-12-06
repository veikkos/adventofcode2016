'use strict';

function getCharCount(input) {
    var word = input.replace(/-/g, '');
    var chars = [];

    while (word.length) {
        var ch = word[0];
        var numberOfChars = word.split(ch).length - 1;
        var regex = new RegExp(ch, 'g');
        word = word.replace(regex, '');
        chars.push([ch, numberOfChars]);
    }

    return chars.sort(compare);
}

function compare(a, b) {
    return a[1] === b[1] ? (a[0] > b[0] ? 1 : -1) : b[1] - a[1];
}

function calculateHash(input) {
    var chars = getCharCount(input);
    var out = [];

    if (chars.length < 5) {
        return null;
    }

    chars.slice(0, 5).forEach(function(char) {
        out.push(char[0]);
    });

    return out.join('');
}

function parseLine(line) {
    var out = {};
    out.checksum = line.substring(line.lastIndexOf("[") + 1, line.lastIndexOf("]"));
    out.id = parseInt(line.match(/[0-9]+/)[0]);
    out.name = line.match(/[a-z/-]+/)[0].slice(0, -1);

    return out;
};

function isRealRoom(obj) {
    const hash = calculateHash(obj.name);
    return hash === obj.checksum ? obj.id : null;
}

function getIdSum(objs) {
    var out = objs.reduce(function(accu, line) {
        var isReal = isRealRoom(line);
        return accu + (isReal ? isReal : 0);
    }, 0);

    return out;
}

function getIdSumFromString(input) {
    var rooms = input.trim().split('\r\n');
    var roomObjs = rooms.map(function(line) {
        return parseLine(line);
    });

    return getIdSum(roomObjs);
}

module.exports = {
    getCharCount,
    calculateHash,
    parseLine,
    isRealRoom,
    getIdSum,
    getIdSumFromString
};
