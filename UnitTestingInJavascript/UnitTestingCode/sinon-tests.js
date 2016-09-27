var mymath = require('./mymath.js');
var sinon = require('sinon');
var assert = require('assert');

describe('mymath', function () {

    describe('add', function () {

        it('spy should be able to spy without changing behavior', function (done) {
            var spy = sinon.spy(mymath, 'add');
            var result = mymath.add(2, 3);
            assert.equal(result, 5);
            sinon.assert.calledWith(spy, 2, 3);
            spy.restore();
            done();
        });

        it('stub should be able simulate different behavior', function (done) {
            var stub = sinon.stub(mymath, 'add');
            stub.returns(7);
            var result = mymath.add(2, 3);
            assert.equal(result, 7);
            sinon.assert.calledWith(stub, 2, 3);
            stub.restore();
            done();
        });

        it('mock should be able set expectations on object', function (done) {
            var mock = sinon.mock(mymath);
            var expectation = sinon.expectation.create(['add']);
            expectation.once();
            var result = mymath.add(2, 3);
            assert.equal(result, 5);
            mock.verify();
            mock.restore();
            done();
        });

    });

});
