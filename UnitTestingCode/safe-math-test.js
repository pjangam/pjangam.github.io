var assert = require('assert');
var proxyquire = require('proxyquire');

describe('safe-math', function () {

    describe('add', function () {

        it('should provide successful response on valid input', function (done) {
            mockmath = {
                add: function () {
                    return 5;
                }
            };
            var safeMath = proxyquire('./safe-math.js',
                {
                    'math': mockmath
                }
            );
            var sum = safeMath.add(2, 3);
            assert.strictEqual(sum, 5, '2+3=5');
            done();
        });

    });

});
