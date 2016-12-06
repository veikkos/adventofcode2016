'use strict';

var should = require('should');

var five = require('../5');

describe('5', function() {
    describe('a', function() {
        this.timeout(60000);

        it('should solve example', function() {
            five.getDigits('abc', 8).should.be.equal('18f47a30');
        });

        it('should solve task', function() {
            five.getDigits('ffykfhsq', 8).should.be.equal('c6697b55');
        });
    });
});
