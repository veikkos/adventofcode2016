'use strict';

var normalize = require('./common').normalizeDelims;

function getTriangleCount(input) {
    var filttered = input.filter(function(item) {
        return (item[0] + item[1] > item[2]) &&
            (item[1] + item[2] > item[0]) &&
            (item[0] + item[2] > item[1]);
    });
    return filttered.length;
}

function splitRow(row) {
    return row.trim().split(/ +/).map(function(item) {
        return parseInt(item);
    });
}

function parseInput(input) {
    var rows = normalize(input).trim().split('\n');
    return rows.map(function(item) {
        return splitRow(item);
    });
}

function verticalFlattenInput(input) {
    var flatA = input.reduce(function(o, row) {
        return o.concat(row[0]);
    }, []);
    var flatB = input.reduce(function(o, row) {
        return o.concat(row[1]);
    }, []);
    var flatC = input.reduce(function(o, row) {
        return o.concat(row[2]);
    }, []);
    return flatA.concat(flatB.concat(flatC));
}

function splitFlatInput(input) {
    var out = [];
    for(var i = 0; i<input.length; i += 3) {
        out.push([input[i], input[i + 1], input[i + 2]]);
    }
    return out;
}

module.exports = {
    getTriangleCount,
    splitRow,
    parseInput,
    verticalFlattenInput,
    splitFlatInput
};
