'use strict';

var should = require('should');

var five = require('../5');

describe('5', function() {
    describe('a', function() {
        this.timeout(60000);

        it('should solve example', function() {
            five.getDigits('abc').should.be.equal('18f47a30');
        });

        it('should solve task', function() {
            five.getDigits('ffykfhsq').should.be.equal('c6697b55');
        });
    });

    describe('b', function() {
        this.timeout(120000);

        it('should solve example', function() {
            five.getAdvancedDigits('abc').should.be.equal('05ace8e3');
        });

        it('should solve task', function() {
            five.getAdvancedDigits('ffykfhsq').should.be.equal('8c35d1ab');
        });
    });
});
