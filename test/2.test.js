'use strict';

var should = require('should');
var Promise = require('bluebird');
var readFile = Promise.promisify(require("fs").readFile);

var two = require('../2');

describe('2', function() {
    describe('a', function() {
        it('should get digit 1', function() {
            var pos = {
                x : 1,
                y : 1
            };
            two.parseLine(pos, 'ULL').should.be.equal('1');
        });

        it('should get code 1985', function() {
            var pos = {
                x : 1,
                y : 1
            };
            two.parseInstructions('ULL\nRRDDD\nLURDL\nUUUUD\n',
                                  pos)
                .should.be.equal('1985');
        });

        it('should get task done', function() {
            return readFile('2_input.txt', 'utf8')
                .then(function(input) {
                    var pos = {
                        x : 1,
                        y : 1
                    };
                    two.parseInstructions(input,
                                          pos)
                        .should.be.equal('65556');
                })
                .catch(function(e) {
                    console.error(e);
                    false.should.equal(true);
                });
        });
    });
    describe('b', function() {
        it('should get digit 2', function() {
            var pos = {
                x : 2,
                y : 2
            };
            two.parseLine(pos, 'ULL', true).
                should.be.equal('2');
        });

        it('should get code 5DB3', function() {
            var pos = {
                x : 0,
                y : 2
            };
            two.parseInstructions('ULL\nRRDDD\nLURDL\nUUUUD\n',
                                  pos,
                                  true)
                .should.be.equal('5DB3');
        });

        it('should get task done', function() {
            return readFile('2_input.txt', 'utf8')
                .then(function(input) {
                    var pos = {
                        x : 1,
                        y : 1
                    };
                    two.parseInstructions(input,
                                          pos,
                                          true)
                        .should.be.equal('CB779');
                })
                .catch(function(e) {
                    console.error(e);
                    false.should.equal(true);
                });
        });
    });
});
