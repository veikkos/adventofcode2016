'use strict';

var should = require('should');
var Promise = require('bluebird');
var readFile = Promise.promisify(require("fs").readFile);

var two = require('../2');

describe('2', function() {
    it('should get digit 1', function() {
        var pos = {
            x : 1,
            y : 1
        };
        two.parseLine(pos, 'ULL').should.be.equal(1);
    });

    it('should get code 1985', function() {
        two.parseInstructions('ULL\nRRDDD\nLURDL\nUUUUD\n')
            .should.be.equal('1985');
    });

    it('should get task done', function() {
        return readFile('2_input.txt', 'utf8')
            .then(function(input) {
                two.parseInstructions(input)
                    .should.be.equal('65556');
            })
            .catch(function(e) {
                console.error(e);
                false.should.equal(true);
            });
    });
});
