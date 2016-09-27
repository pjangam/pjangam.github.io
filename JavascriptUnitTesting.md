# Unit Testing in javascript (NodeJS) #

Writing code in interpreted language like javascript can get very ugly if not thought properly. I'm not saying javascript as language is ugly, but moving from object oriented and type safe language such as C# to javascript I learned it hard way that writing code in language like javascript you need to be very careful else you will end up in real messy code.

There are so many things you need to take care to write a real maintainable code but to start with, I'll talk about unit testing.

## Tools ##

### Test cases ###

There are so many tools available on npm gallery. Out of which [mocha](https://mochajs.org/) and [chai](http://chaijs.com/guide/) have huge community available. For this article We will move ahead with mocha. You can find detailed documentation on their website. Let's just see syntax to write simple unit test.

**codebase: mymath.js**
```javascript
function add(a, b) {
    return a + b;
};

exports.add = add;
```

**Test case: mymath-test.js**
```javascript
var assert = require('assert');
var math = require('./math.js');

describe('math', function () {

    describe('add', function () {

        it('should add numbers and give correct value', function (done) {
            var addition = math.add(2, 3);
            assert.equal(addition, 5, '2 and 3 should add up to 5');
            done();
        });

    });

});
```

 Let's talks about the code I have written in *math-test.js*.
 
 `describe`:  This function is used by mocha to group results of related test cases in one block. `describe` function takes two arguments, first is name of group which is string, second parameter is function which can contain different groups or test cases. You can use nested grouping to any level as you wish. I'm here using two level of grouping for test cases. First group I use has name same as module name, second group is named after function it will test. This convention that I normally use you can change it according to your needs/practices. 
 
 `it`:  Inside second `describe` function I have function named `it` this is your actual test case. This function  takes two arguments, first is name of your test case and later is function which will contain steps to execute your test cases. A normal test case will have format as: initialize, execute, assert and done.
 
 `done`: Role of done argument to your test executor is to tell mocha that your test case was completed successfully. 

 `assert`: [assert](https://www.npmjs.com/package/assert) is another npm module used for test case assertion(mocha or any other test framework in NodeJS do not provide assertion functionality out of the box). I have used `assert.equal` in above snippet. assert module provide support for all kind of assertions including not equal, strict equal, should throw exception, should not throw exception etc.

 ### Assertion ###

 Similar to test tools there are many modules available on npm gallery for assertion. In our snippet we have used [assert](https://www.npmjs.com/package/assert). Some other notable modules are [should](https://www.npmjs.com/package/should), [expect](https://www.npmjs.com/package/expect). Assert module gives more TDD like syntax while should and expect are preferred provide BDD friendly syntax.

### Mocking ###
Unit testing can never be achieved without proper mocking. There are lot of tools available for mocking as well. We will focus on tools which can just get your task done. Unlike testing tools and assertion tools we need to use multiple mocking tools to achieve true unit testing. Let's talk about them one by one.

#### proxyquire ####

As name suggest it will give you abstraction layer over require statements. see snippet below.

**safe-math.js**
```javascript
var math = require('./mymath.js')

function add(a, b) {
    if (typeof a !== 'number' && !isNaN(a) && isFinite(a))
        throw new Error('a is not valid number');
    if (typeof b !== 'number' && !isNaN(b) && isFinite(b))
        throw new Error('b is not valid number');
    return (math.add(a, b));
}

exports.add = add;
````

**safe-math-test.js**
```javascript
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
```

1. When to use proxyquire: to mock modules used by your code using require statements.
2. Syntax: 
```
 var moduleToTest = proxyquire('moduleToTest', {
    'modulePathToMock' : mockedObject
})
```
in this second parameter which is JSON object you can send all modules required by your test subject module. One important thing to note here is that path in this object should be exactly equal to path required inside your module. So when you are using relative paths for require pathToMock is relative to test subject and not relative to test case file, but path to test subject is relative to test case.

#### SinonJS ####
[SinonJS](sinonjs.org/docs/) is very powerful mocking tool in javascript. It is used to mock any function inside any module that you write or require inside your test subject. With Sinon you will be able to not just simulating hardcoded behavior but also you can validate that your code calls those mocked functions with specific arguments. Apart from that sinon inbuilt provide mocks for timers, xhr.

There are three ways to mock a function in sinon, based on use.

1. spy: spies are used for simple assertions.
2. stub: 
3. mock:

#### nock #### 

[Nock](https://github.com/node-nock/nock) is used for single purpose, mocking http calls. See example below:

```javascript

```