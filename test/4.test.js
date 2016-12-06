'use strict';

var should = require('should');
var Promise = require('bluebird');
var readFile = Promise.promisify(require("fs").readFile);

var four = require('../4');

describe('4', function() {
    describe('a', function() {
        it('should get char count', function() {
            four.getCharCount('aaaaa-bbb-z-y-x')
                .should.be.deepEqual([['a', 5],
                                      ['b', 3],
                                      ['x', 1],
                                      ['y', 1],
                                      ['z', 1]]);
        });

        it('should calculate hash', function() {
            four.calculateHash('aaaaa-bbb-z-y-x')
                .should.be.equal('abxyz');

            four.calculateHash('not-a-real-room')
                .should.be.equal('oarel');

            four.calculateHash('kfg-jvtivk-tyftfcrkv-crsfirkfip')
                .should.be.equal('fkirt');
        });

        it('should parse line', function() {
            four.parseLine('aaaaa-bbb-z-y-x-123[abxyz]')
                .should.be.deepEqual({
                    name : 'aaaaa-bbb-z-y-x',
                    id : 123,
                    checksum : 'abxyz'
                });
        });

        it('should check real room', function() {
            four.isRealRoom({
                name : 'aaaaa-bbb-z-y-x',
                id : 123,
                checksum : 'abxyz'
            }).should.be.equal(123);

            (four.isRealRoom({
                name : 'totally-real-room',
                id : 200,
                checksum : 'decoy'
            }) === null).should.equal(true);
        });

        it('should return ID sum', function() {
            four.getIdSum([
                {
                    name : 'aaaaa-bbb-z-y-x',
                    id : 123,
                    checksum : 'abxyz'
                },
                {
                    name : 'totally-real-room',
                    id : 200,
                    checksum : 'decoy'
                },
                {
                    name : 'not-a-real-room',
                    id : 404,
                    checksum : 'oarel'
                }
            ]).should.be.equal(527);
        });

        it('should complete example', function() {
            four.getIdSumFromString('aaaaa-bbb-z-y-x-123[abxyz]\r\na-b-c-d-e-f' +
                                    '-g-h-987[abcde]\r\nnot-a-real-room-404[oa' +
                                    'rel]\r\ntotally-real-room-200[decoy]')
                .should.equal(1514);
        });

        it('should get task done', function() {
            return readFile('4_input.txt', 'utf8')
                .then(function(input) {
                    four.getIdSumFromString(input).should.equal(158835);
                })
                .catch(function(e) {
                    console.error(e);
                    false.should.equal(true);
                });
        });
    });

    describe('b', function() {
        it('should rotate name', function() {
            four.rotateName({
                name : 'qzmt-zixmtkozy-ivhz',
                id : 343
            }).should.be.deepEqual({ name : 'very encrypted name', id : 343 });
        });

        it('should get task done', function() {
            return readFile('4_input.txt', 'utf8')
                .then(function(input) {
                    var location = four.getNorthPoleLocation(input);
                    location.length.should.be.equal(1);
                    location[0].id.should.be.equal(993);
                })
                .catch(function(e) {
                    console.error(e);
                    false.should.equal(true);
                });
        });
    });
});
