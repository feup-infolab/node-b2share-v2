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

    var body = '';
    var req = https.request(params, function (response) {
        response.on('data', function (chunk) {
           body += chunk;
        });

        response.on('end', function () {
            console.log(response);
            callback(false, JSON.parse(body));
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
            callback(false, JSON.parse(body));
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
            callback(false, JSON.parse(body));
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
    var params = {
        host: this.host,
        path: '/api/records/?q=community:' + communityID + '?access_token=' + this.access_token,
        method: 'GET'
    };

    var body = '';
    var req = https.request(params, function (response) {
        response.on('data', function (chunk) {
            body += chunk;
        });

        response.on('end', function () {
            callback(false, JSON.parse(body));
        });
    });

    req.on('error', function (e) {
        var errorMsg = 'Error getting records per community';
        console.log(e);
        callback(true, errorMsg);
    });

    req.end();
};

B2ShareClient.prototype.searchRecords = function (queryString, callback) {
    var params = {
        host: this.host,
        path: '/api/records/?q=' + queryString + '?access_token=' + this.access_token,
        method: 'GET'
    };

    var body = '';
    var req = https.request(params, function (response) {
        response.on('data', function (chunk) {
            body += chunk;
        });

        response.on('end', function () {
            callback(false, JSON.parse(body));
        });
    });

    req.on('error', function (e) {
        var errorMsg = 'Error searching a record';
        console.log(e);
        callback(true, errorMsg);
    });

    req.end();
};


B2ShareClient.prototype.searchDrafts = function (callback) {
    var params = {
        host: this.host,
        path: '/api/records/?drafts?access_token=' + this.access_token,
        method: 'GET'
    };

    var body = '';
    var req = https.request(params, function (response) {
        response.on('data', function (chunk) {
            body += chunk;
        });

        response.on('end', function () {
            callback(false, JSON.parse(body));
        });
    });

    req.on('error', function (e) {
        var errorMsg = 'Error searching for drafts';
        console.log(e);
        callback(true, errorMsg);
    });

    req.end();
};


B2ShareClient.prototype.getSpecificRecord = function(recordID, callback) {
    var params = {
        host: this.host,
        path: '/api/records/' +  recordID + '?access_token=' + this.access_token,
        method: 'GET'
    };

    var body = '';
    var req = https.request(params, function (response) {
        response.on('data', function (chunk) {
            body += chunk;
        });

        response.on('end', function () {
            callback(false, JSON.parse(body));
        });
    });

    req.on('error', function (e) {
        var errorMsg = 'Error getting specific record';
        console.log(e);
        callback(true, errorMsg);
    });

    req.end();
};


B2ShareClient.prototype.createADraftRecord = function(data, callback) {
    var params = {
        host: this.host,
        path: '/api/records/?access_token=' + this.access_token,
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST'
    };

    var body = '';
    var req = https.request(params, function (response) {
        response.on('data', function (chunk) {
            body += chunk;
        });

        response.on('end', function () {
            var result;
            if(response.statusCode == '201')
            {
                result = {
                    "statusCode": response.statusCode,
                    "statusMessage": response.statusMessage,
                    "data": JSON.parse(body)
                };
            }
            else
            {
                result = {
                    "statusCode": response.statusCode,
                    "statusMessage": response.statusMessage
                };
            }
            callback(false, result);
        });
    });

    req.on('error', function (e) {
        var errorMsg = 'Error creating a draft record';
        console.log(e);
        callback(true, errorMsg);
    });

    req.write(JSON.stringify(data));
    req.end();
};


/*
B2ShareClient.prototype.uploadFileIntoDraftRecord = function(info, buffer, callback) {
    var bucketID = info.bucketID;
    var fileName = info.fileName;
    console.log('info is:', info);
    var params = {
        host: this.host,
        path: '/api/files/' + bucketID + '/' + fileName + '/?access_token=' + this.access_token,
        headers: {
            'Content-Type': 'application/octet-stream'
        },
        method: 'PUT'
    };

    var body = '';
    var req = https.request(params, function (response) {
        response.on('data', function (chunk) {
            console.log('on data');
            console.log('chunk:', chunk);
            body += chunk;
        });

        response.on('end', function () {
            var result;
            console.log(response.statusCode);
            console.log(response.statusMessage);
            callback(false, body);
        });
    });

    req.on('error', function (e) {
        var errorMsg = 'Error uploadind a file to a record';
        console.log(errorMsg);
        //console.log(e);
        callback(true, errorMsg);
    });

    //var newBuffer = new Buffer(10);
    req.write(buffer.toString());
    req.end();
};
*/


B2ShareClient.prototype.listUploadedFilesInRecord = function(fileBucketID, callback) {
    var params = {
        host: this.host,
        path: '/api/files/' +  fileBucketID + '?access_token=' + this.access_token,
        method: 'GET'
    };

    var body = '';
    var req = https.request(params, function (response) {
        response.on('data', function (chunk) {
            body += chunk;
        });

        response.on('end', function () {
            console.log('statusCode:', response.statusCode);
            var result;
            if(response.statusCode == '200')
            {
                result = {
                    "statusCode": response.statusCode,
                    "statusMessage": response.statusMessage,
                    "data": JSON.parse(body)
                };
            }
            else
            {
                result = {
                    "statusCode": response.statusCode,
                    "statusMessage": response.statusMessage,
                };
            }
            callback(false, result);
        });
    });

    req.on('error', function (e) {
        var errorMsg = 'Error getting specific record';
        console.log(e);
        callback(true, errorMsg);
    });

    req.end();
};

B2ShareClient.prototype.updateDraftRecordMetadata = function (recordID, jsonPatchFormatData, callback) {
    var params = {
        host: this.host,
        path: '/api/records/' +  recordID + '/draft?access_token=' + this.access_token,
        headers: {
            'content-type': 'application/json-patch+json',
        },
        //body: jsonPatchFormatData,
        json: true,
        method: 'PATCH'
    };

    var body = '';
    var req = https.request(params, function (response) {
        response.on('data', function (chunk) {
            body += chunk;
        });

        response.on('end', function () {
            console.log('statusCode:', response.statusCode);
            var result;
            if(response.statusCode == '200')
            {
                result = {
                    "statusCode": response.statusCode,
                    "statusMessage": response.statusMessage,
                    "data": JSON.parse(body)
                };
            }
            else
            {
                result = {
                    "statusCode": response.statusCode,
                    "statusMessage": response.statusMessage,
                };
            }
            callback(false, result);
        });
    });

    req.on('error', function (e) {
        var errorMsg = 'Error updating a specific draft';
        console.log(e);
        callback(true, errorMsg);
    });

    req.write(JSON.stringify(jsonPatchFormatData));
    req.end();
};

B2ShareClient.prototype.submitDraftRecordForPublication= function (recordID, callback) {
    var jsonPatchFormatData = [{"op": "add", "path":"/publication_state", "value": "submitted"}];
    this.updateDraftRecordMetadata(recordID, jsonPatchFormatData, function (error, body) {
       callback(error, body);
    });
};

module.exports = B2ShareClient;

