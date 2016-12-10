'use strict';

var should = require('should');
var Promise = require('bluebird');
var readFile = Promise.promisify(require("fs").readFile);

var sut = require('../7');

describe('7', function() {
    describe('a', function() {
        const exampleString = 'abba[mnop]qrst\n' +
              'abcd[bddb]xyyx\n' +
              'aaaa[qwer]tyui\n' +
              'oxxo[asdfgh]zxcvbn\n';

        it('should parse brackets', function() {
            sut.parseBrackets('abc[def]ghi[jkl]mno').brackets
                .should.deepEqual(['def', 'jkl']);
        });

        it('should parse outside of brackets', function() {
            sut.parseBrackets('abc[def]ghi[jkl]mno').nonBrackets
                .should.deepEqual(['abc', 'ghi', 'mno']);
        });

        it('should validate ABBAs', function() {
            sut.validateAbba('abcdabba').should.be.true();
            sut.validateAbba('abcdefgh').should.be.false();
            sut.validateAbba('abcdaaaa').should.be.false();
        });

        it('should complete example', function() {
            sut.parseStrings(exampleString).should.be.equal(2);
        });

        it('should complete task', function() {
            return readFile('7_input.txt', 'utf8')
                .then(function(input) {
                    sut.parseStrings(input).should.be.equal(115);
                });
        });
    });

    describe('b', function() {
        const exampleString = 'aba[bab]xyz\r\n' +
              'xyx[xyx]xyx\r\n' +
              'aaa[kek]eke\r\n' +
              'zazbz[bzb]cdb\r\n';

        it('should find ABAs', function () {
            sut.findAbas(['fdrdghrtftwe', 'gfdfaaa'])
                .should.deepEqual(['drd', 'tft', 'fdf']);
        });

        it('should find BABs', function () {
            sut.findAbas(['fdrdghrtftwe', 'gfdfaaa'], true)
                .should.deepEqual(['rdr', 'ftf', 'dfd']);
        });

        it('should solve example', function () {
            sut.parseAbaStrings(exampleString)
                .should.equal(3);
        });

        it('should complete task', function() {
            return readFile('7_input.txt', 'utf8')
                .then(function(input) {
                    sut.parseAbaStrings(input).should.be.equal(231);
                });
        });
    });
});
