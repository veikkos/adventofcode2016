'use strict';

function parseInstructions(instructions) {
    var pos = {
        x : 1,
        y : 1
    };
    var code = '';
    var lines = instructions.split('\n');
    lines.forEach(function (line) {
        if(line.length) {
            code += parseLine(pos, line).toString();
        }
    });
    return code;
}

function parseLine(pos, line) {
    for(var index in line) {
        pos = move(pos, line[index]);
    }

    return getDigit(pos);
};

function move(pos, dir) {
    function limit(p) {
        if (p > 2) {
            return 2;
        } else if (p < 0) {
            return 0;
        } else {
            return p;
        }
    }

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

    return pos;
}

function getDigit(pos) {
    return 1 + pos.x + (2 - pos.y) * 3;
}

module.exports = {
    parseLine,
    parseInstructions
};
