'use strict';

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
    var rows = input.split('\r\n');
    return rows.map(function(item) {
        return splitRow(item);
    });
}

module.exports = {
    getTriangleCount,
    splitRow,
    parseInput
};
