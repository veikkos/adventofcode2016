'use strict';

var three = require('../3');
var should = require('should');
var Promise = require('bluebird');
var readFile = Promise.promisify(require("fs").readFile);

describe('3', function() {
    describe('a', function() {
        it('should filter simple list', function() {
            var t = [
                [10, 11, 12],
                [1, 10, 100],
                [5, 5, 5]
            ];
            three.getTriangleCount(t).should.equal(2);
        });

        it('should filter example list', function() {
            var t = [
                [5, 10, 25]
            ];
            three.getTriangleCount(t).should.equal(0);
        });

        it('should split rows', function() {
            var s = ' 12 30  4';
            three.splitRow(s).should.deepEqual([12, 30, 4]);
        });

        it('should get task done', function() {
            return readFile('3_input.txt', 'utf8')
                .then(function(input) {
                    var ar = three.parseInput(input);
                    return three.getTriangleCount(ar).should.equal(869);
                })
                .catch(function(e) {
                    console.error(e);
                    false.should.equal(true);
                });
        });
    });

    describe('b', function() {
        it('should vertical flatten input', function() {
            three.verticalFlattenInput([
                [1, 4, 7],
                [2, 5, 8],
                [3, 6, 9]
            ]).should.deepEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
        });

        it('should split flat input', function() {
            three.splitFlatInput([1, 2, 3, 4, 5, 6, 7, 8, 9])
                .should.deepEqual([
                    [1, 2, 3],
                    [4, 5, 6],
                    [7, 8, 9]
                ]);
        });

        it('should get task done', function() {
            return readFile('3_input.txt', 'utf8')
                .then(function(input) {
                    var ar = three.splitFlatInput(
                        three.verticalFlattenInput(
                            three.parseInput(input)));
                    return three.getTriangleCount(ar).should.equal(1544);
                })
                .catch(function(e) {
                    console.error(e);
                    false.should.equal(true);
                });
        });
    });
});
