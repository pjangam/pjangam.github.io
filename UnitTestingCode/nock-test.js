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
