var assert = require('assert');
var math = require('./mymath.js');


describe('math', function () {

    describe('add', function () {

        it('should add numbers and give correct value', function (done) {
            var addition = math.add(2, 3);
            assert.equal(addition, 5, '2 and 3 should add up to 5');
            done();
        });

    });

});
