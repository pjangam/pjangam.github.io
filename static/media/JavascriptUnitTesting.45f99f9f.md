<!-- TOC -->

- [Unit Testing in javascript (NodeJS)](#unit-testing-in-javascript-nodejs)
  - [Tools](#tools)
    - [Test cases](#test-cases)
      - [Mocha](#mocha)
    - [Assertion](#assertion)
    - [Mocking](#mocking)
      - [proxyquire](#proxyquire)
      - [SinonJS](#sinonjs)
      - [nock ####](#nock-)
    - [Code coverage](#code-coverage)
      - [nyc](#nyc)

<!-- /TOC -->

# Unit Testing in javascript (NodeJS) #

Writing code in interpreted language like javascript can get very ugly if not thought properly. I'm not saying javascript as language is ugly, but moving from object oriented and type safe language such as C# to javascript I learned it hard way that writing code in language like javascript you need to be very careful else you will end up in real messy code.

There are so many things you need to take care to write a real maintainable code but to start with, I'll talk about unit testing.

## Tools ##

### Test cases ###

There are so many tools available on npm gallery. Out of which [mocha](https://mochajs.org/) and [chai](http://chaijs.com/guide/) have huge community available. For this article We will move ahead with mocha. You can find detailed documentation on their website. Let's just see syntax to write simple unit test.

#### Mocha ####

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

There are three ways to mock a function in sinon, based on use. Definitions picked directly from their official site.

1. spy: A test spy is a function that records arguments, return value, the value of this and exception thrown (if any) for all its calls. A test spy can be an anonymous function or it can wrap an existing function.
2. stub: Test stubs are functions (spies) with pre-programmed behavior. They support the full test spy API in addition to methods which can be used to alter the stub’s behavior.
As spies, stubs can be either anonymous, or wrap existing functions. When wrapping an existing function with a stub, the original function is not called.
3. mock: Mocks (and mock expectations) are fake methods (like spies) with pre-programmed behavior (like stubs) as well as pre-programmed expectations. A mock will fail your test if it is not used as expected.

To understand each of them see the example below

**sinon-test.js**
```javascript
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
```

Note that spy, stub and mock do have incremental set of functionality. i.e. Any functionality available with spy is available with stub any functionality available with stub is available with mock.

Along with mocking sinon comes with rich set of [assertions](http://sinonjs.org/docs/#assertions-api) and [matchers](http://sinonjs.org/docs/#-api) (not always you want to check a === 5)

#### nock #### 

[Nock](https://github.com/node-nock/nock) is used for single purpose, mocking http calls. See example below:

```javascript
var nock = require('nock');
var assert = require('assert');

describe('nock test', function () {

    it('should return mock data on http call', function (done) {
          this.timeout(60000);

        var api = nock("https://www.google.com")
            .get('/doodles')
            .reply(200, 'mockResponse');

        var https = require('https');
        var responseMessage = '';
        var options = {
            "host": "www.google.com",
            //"protocol": "https",
            "path":"/doodles"
        };
        var req = https.request(options, (res) => {
            res.setEncoding('utf8');
            var statusCode = res.statusCode;

            res.on('data', (response) => {
                responseMessage += response;
            });
            res.on('end', () => {
                ValidateResponse(responseMessage);
            });
            var ValidateResponse = function (webResponse) {
                assert.equal(webResponse, 'mockResponse');
                done();
            };
        });
        req.end();

    });

});
```
In above example I'm using `GET` verb with route doodle.

Nock does support both `http` and `https` protocols. It supports all http verbs, It supports request with and without body/path. All three of them url, path and body can be string or regex. For body it also support json object with partial matchers and custom logic by specifying your own function. 


### Code coverage ###
Code coverage is the only visible way you make sure that you have written enough test cases to cover maximum features/behaviors of your application.
Popular tools for code coverage are [istanbul](https://www.npmjs.com/package/istanbul) and [nyc](https://www.npmjs.com/package/nyc). I personally prefer nyc for it's added features over istanbul.

#### nyc ####
To use nyc you need to add nyc to your global packages using 

```batch
npm install -g nyc
```

Sample command for instrumenting your test coverage is shown below

```batch
nyc -x configurations/**/*.js -x node_modules/**/*.js --reporter=html --all ./node_modules/.bin/mocha -- test'
```

nyc supports many switches (use `nyc --help` to see them all) Let's discuss essential switches I'm using here
- -x to exclude configurations folder to appear in code coverage reports, 
- --reporter=html to generate html report for code coverage. default reporter will text which will show tabular report to console. 
- --all to cover all files in workspace(by default only files that are touched by test suite will be instrumented) 
- path to mocha is provided which will actually run test cases
- At the very end, I've added double dashes and space. Everything after such notation is passed as switch to your test framework which is mocha in this case. Here I'm passing name of folder which contain all my test cases. 


Note 1. Each framework given above have rich functionality than demonstrated e.g. mocha along with BDD style syntax used above supports [TDD](https://mochajs.org/#interfaces) style syntax, it also supports test case/suite level initializer and cleanups, custom timeouts, test retries, multiple reporters etc. Snippets above are just to get started you up with unit testing. You can explore each of them in detail when you actually start using them.
Note 2. Most of the frameworks above are not restricted to NodeJS and can be used for browser side javascript testing as well. e.g. [mocha](https://mochajs.org/#running-mocha-in-the-browser) and [sinon](http://sinonjs.org/docs/)