var https = require('https');

function B2ShareClient(host, access_token)
{
    this.host = host;
    this.access_token = access_token;
};

B2ShareClient.prototype.listCommunities = function (callback) {

    var params = {
      host: this.host,
      path: '/api/communities/?access_token=' + this.access_token,
      method: 'GET'
    };

    console.log('params: ', params);

    var body = '';
    var req = https.request(params, function (response) {
        response.on('data', function (chunk) {
            console.log('on data');
           body += chunk;
        });

        response.on('end', function () {
            console.log('the body is:');
            console.log(body);
            callback(false, body);
        });
    });

    req.on('error', function (e) {
        var errorMsg = 'Error getting the communities';
        console.log(e);
        callback(true, errorMsg);
    });

    req.end();
};


B2ShareClient.prototype.getCommunitySchema = function (communityID, callback) {
    var params = {
        host: this.host,
        path: '/api/communities/' + communityID + '/schemas/last?access_token=' + this.access_token,
        method: 'GET'
    };

    var body = '';
    var req = https.request(params, function (response) {
        response.on('data', function (chunk) {
           body += chunk;
        });

        response.on('end', function () {
            console.log('the body is:');
            console.log(body);
            callback(false, body);
        });
    });

    req.on('error', function (e) {
        var errorMsg = 'Error getting the community schema';
        console.log(e);
        callback(true, errorMsg);
    });

    req.end();
};


B2ShareClient.prototype.listAllRecords = function (callback) {
    var params = {
        host: this.host,
        path: '/api/records/?access_token=' + this.access_token,
        method: 'GET'
    };

    var body = '';
    var req = https.request(params, function (response) {
        response.on('data', function (chunk) {
            body += chunk;
        });

        response.on('end', function () {
            console.log('the body is:');
            console.log(body);
            callback(false, body);
        });
    });

    req.on('error', function (e) {
        var errorMsg = 'Error getting all records';
        console.log(e);
        callback(true, errorMsg);
    });

    req.end();
};

B2ShareClient.prototype.listRecordsPerCommunity = function (communityID, callback) {
    /*var params = {
        host: this.host,
        path: '/api/records/?q=community:COMMUNITY_ID' + this.access_token,
        method: 'GET'
    };

    var body = '';
    var req = https.request(params, function (response) {
        response.on('data', function (chunk) {
            body += chunk;
        });

        response.on('end', function () {
            console.log('the body is:');
            console.log(body);
            callback(false, body);
        });
    });

    req.on('error', function (e) {
        var errorMsg = 'Error getting all records';
        console.log(e);
        callback(true, errorMsg);
    });

    req.end();
    */
};



module.exports = B2ShareClient;

