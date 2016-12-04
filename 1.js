'use strict';

var Victor = require('victor');

// N = 0, E = 1, S = 2, W = 3
const dir = [
    new Victor(0, 1),
    new Victor(1, 0),
    new Victor(0, -1),
    new Victor(-1, 0)
];

function getDirection(curDir, turn) {
    switch (turn)
    {
        case 'R':
        curDir = curDir + 1;
        if (curDir >= dir.length) {
            curDir = 0;
        }
        break;
        case 'L':
        curDir = curDir - 1;
        if (curDir < 0) {
            curDir = dir.length - 1;
        }
        break;
        default:
        console.error('Undefined turn', turn);
    }

    return curDir;
}

function getDirectionVector(curDir) {
    return dir[curDir].clone();
}

function walk(pos, dir, distance) {
    return pos.add(dir.multiply(new Victor(distance, distance)));
}

function getDistance(pos) {
    return Math.abs(pos.x) + Math.abs(pos.y);
}

function parseInput(input) {
    var split = input.split(', ');
    var a = [];
    split.forEach(function(item) {
        a.push([item[0], parseInt(item.match(/\d+/)[0])]);
    });

    return a;
}

function play(d, pos, input) {
    var route = parseInput(input);
    route.forEach(function(step) {
        d = getDirection(d, step[0]);
        var dirVector = getDirectionVector(d);
        pos = walk(pos, dirVector, step[1]);
    });

    return getDistance(pos);
}

function playUntilSamePlaceTwice(d, pos, input) {
    var visited = [];
    var route = parseInput(input);
    var ret = null;
    for(let step of route) {
        d = getDirection(d, step[0]);
        var dirVector = getDirectionVector(d);
        for(var i = 0; i < step[1]; i++) {
            pos = walk(pos, dirVector, 1);

            // toString for "easier" comparison
            if (visited.indexOf(pos.toString()) >= 0) {
                ret = pos;
                break;
            }
            visited.push(pos.toString());
        }

        if (ret) {
            break;
        }
    };

    return getDistance(ret);
}

module.exports = {
    getDirection,
    getDirectionVector,
    walk,
    getDistance,
    parseInput,
    play,
    playUntilSamePlaceTwice
};
