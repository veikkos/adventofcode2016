'use strict';

var should = require('should');
var Victor = require('victor');
var Promise = require('bluebird');
var readFile = Promise.promisify(require("fs").readFile);

var one = require('../1');

describe('1', function() {
    it('should return directions', function() {
        var d = 0;
        for(var i = 0; i < 3; i++) {
            d = one.getDirection(d, 'R');
            d.should.equal(i + 1);
        }

        d = one.getDirection(d, 'R');
        d.should.equal(0);

        for(var j = 3; j > 0; j--) {
            d = one.getDirection(d, 'L');
            d.should.equal(j);
        }
    });

    it('should return direction vectors', function () {
        var v;
        v = one.getDirectionVector(0);
        v.should.deepEqual(new Victor(0, 1));
        v = one.getDirectionVector(1);
        v.should.deepEqual(new Victor(1, 0));
        v = one.getDirectionVector(2);
        v.should.deepEqual(new Victor(0, -1));
        v = one.getDirectionVector(3);
        v.should.deepEqual(new Victor(-1, 0));
    });

    it('should walk', function () {
        one.walk(new Victor(1, 1), new Victor(3, 3), 2)
            .should.deepEqual(new Victor(7, 7));
    });

    it('should walk sequence', function () {
        var s = [
            ['R', 2],
            ['L', 3]
        ];
        var d = 0;
        var pos = new Victor(0, 0);
        s.forEach(function(step) {
            d = one.getDirection(d, step[0]);
            var dirVector = one.getDirectionVector(d);
            pos = one.walk(pos, dirVector, step[1]);
        });

        pos.should.deepEqual(new Victor(2, 3));
    });

    it('should get distance', function () {
        one.getDistance(new Victor(3, 5)).should.equal(8);
    });

    it('should parse input', function () {
        one.parseInput('R2, L5, R12')
            .should.deepEqual([['R', 2], ['L', 5], ['R', 12]]);
    });

    it('should perform simple task', function () {
        var d = 0;
        var pos = new Victor(0, 0);
        var input = 'R2, L5, R12';

        one.play(d, pos, input).should.equal(19);
    });

    it('should perform round task', function () {
        var d = 0;
        var pos = new Victor(0, 0);
        var input = 'R2, R2, R2, R2';

        one.play(d, pos, input).should.equal(0);
    });

    it('should perform example task', function () {
        var d = 0;
        var pos = new Victor(0, 0);
        var input = 'R5, L5, R5, R3';

        one.play(d, pos, input).should.equal(12);
    });

    it('should complete task', function () {
        return readFile('1_input.txt', 'utf8')
            .then(function(input) {
                var d = 0;
                var pos = new Victor(0, 0);

                var end = one.play(d, pos, input);
                end.should.equal(250);
            })
            .catch(function (e) {
                console.log(e);
                should(false).equal(true);
            });
    });
});

describe('2', function() {
    it('should complete example task', function () {
        var d = 0;
        var pos = new Victor(0, 0);
        var input = 'R8, R4, R4, R8';

        one.playUntilSamePlaceTwice(d, pos, input).should.equal(4);
    });

    it('should complete task', function () {
        return readFile('1_input.txt', 'utf8')
            .then(function(input) {
                var d = 0;
                var pos = new Victor(0, 0);

                one.playUntilSamePlaceTwice(d, pos, input).should.equal(151);
            })
            .catch(function (e) {
                console.log(e);
                should(false).equal(true);
            });
    });
});
