describe('nock test', function () {

    it('should return mock data on http call', function (done) {
        var api = nock("https://www.google.com")
            .get('/doodles')
            .reply(200, 'mockResponse');

        var http = require('http');
        var responseMessage = '';
        var options={};
        http.request(options, (res) => {
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

    });

});
