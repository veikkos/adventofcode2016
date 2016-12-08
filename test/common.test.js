'use strict';

var should = require ('should');

var sut = require('../common');

describe('common', function() {
    it('should normalize \\r\\n delimiters', function () {
        sut.normalizeDelims('some\r\ntext\r\nhere')
            .should.equal('some\ntext\nhere');
    });

    it('should normalize \\r delimiters', function () {
        sut.normalizeDelims('some\rtext\rhere')
            .should.equal('some\ntext\nhere');
    });

    it('should not normalize \\n delimiters', function () {
        sut.normalizeDelims('some\ntext\nhere')
            .should.equal('some\ntext\nhere');
    });
});
