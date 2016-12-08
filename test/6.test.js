'use strict';

var should = require('should');
var Promise = require('bluebird');
var readFile = Promise.promisify(require("fs").readFile);

var sut = require('../6');

describe('6', function() {
    const exampleString = 'eedadn\r\n' +
          'drvtee\r\n' +
          'eandsr\r\n' +
          'raavrd\r\n' +
          'atevrs\r\n' +
          'tsrnev\r\n' +
          'sdttsa\r\n' +
          'rasrtv\r\n' +
          'nssdts\r\n' +
          'ntnada\r\n' +
          'svetve\r\n' +
          'tesnvt\r\n' +
          'vntsnd\r\n' +
          'vrdear\r\n' +
          'dvrsen\r\n' +
          'enarar\r\n';

    describe('a', function() {
        it('should get correct character', function() {
            sut.getCharacter(['t', 'd', 'y' ,'d' ,'e' ,'f'])
                .should.equal('d');
        });

        it('should parse character', function() {
            sut.parseCharacter(['abc', 'bcd', 'abc'], 0)
                .should.deepEqual(['a', 'b', 'a']);

            sut.parseCharacter(['abc', 'bcd', 'abc'], 1)
                .should.deepEqual(['b', 'c', 'b']);
        });

        it('should not parse if lengths differ', function() {
            (sut.solveTask(['abc', 'bcd', 'abcd']) === null)
                .should.equal(true);
        });

        it('should parse input', function() {
            sut.solveTask(['abc', 'bcd', 'abc'])
                .should.deepEqual('abc');
        });

        it('should complete example', function() {
            sut.parseAndSolve(exampleString)
                .should.equal('easter');
        });

        it('should complete task', function() {
            return readFile('6_input.txt', 'utf8')
                .then(function(input) {
                    sut.parseAndSolve(input)
                        .should.equal('liwvqppc');
                });
        });
    });

    describe('b', function() {
        it('should complete example', function() {
            sut.parseAndSolve(exampleString, true)
                .should.equal('advent');
        });

        it('should complete task', function() {
            return readFile('6_input.txt', 'utf8')
                .then(function(input) {
                    sut.parseAndSolve(input, true)
                        .should.equal('caqfbzlh');
                });
        });
    });
});
