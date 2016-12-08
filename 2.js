'use strict';

function limitA(p) {
    if (p > 2) {
        return 2;
    } else if (p < 0) {
        return 0;
    } else {
        return p;
    }
}

function limitB(p, start) {
    if (p > 4) {
        return 4;
    } else if (p < 0) {
        return 0;
    } else {
        return p;
    }
}

const customPad = [
    ['X', 'X', '1', 'X', 'X'],
    ['X', '2', '3', '4', 'X'],
    ['5', '6', '7', '8', '9'],
    ['X', 'A', 'B', 'C', 'X'],
    ['X', 'X', 'D', 'X', 'X']
];

function parseInstructions(instructions, pos, custom) {
    var code = '';
    var lines = instructions.split('\r\n');
    lines.forEach(function (line) {
        if(line.length) {
            code += parseLine(pos, line, custom);
        }
    });
    return code;
}

function parseLine(pos, line, custom) {
    for(var index in line) {
        pos = move(pos, line[index], custom);
    }

    return custom ?
        customPad[4 - pos.y][pos.x] :
        getDigit(pos).toString();
}

function move(pos, dir, custom) {
    var limit = custom ? limitB : limitA;
    var orig = JSON.parse(JSON.stringify(pos));
    switch (dir) {
    case 'U':
        pos.y = limit(pos.y + 1); break;
    case 'D':
        pos.y = limit(pos.y - 1); break;
    case 'R':
        pos.x = limit(pos.x + 1); break;
    case 'L':
        pos.x = limit(pos.x - 1); break;
    default:
        console.error('Unknown dir', dir);
    }

    if (custom) {
        if (customPad[4 - pos.y][pos.x] === 'X') {
            pos.x = orig.x;
            pos.y = orig.y;
        }
    }
    return pos;
}

function getDigit(pos) {
    return 1 + pos.x + (2 - pos.y) * 3;
}

module.exports = {
    parseLine,
    parseInstructions
};
