var https = require('follow-redirects').https;
var querystring = require('querystring');

/**
 * Initiates the B2ShareClient
 * @param host the host required to execute the requests(ex: trng-b2share.eudat.eu)
 * @param access_token the user's access token
 * @constructor
 */
function B2ShareClient(host, access_token)
{
    this.host = host;
    this.access_token = querystring.escape(access_token);
};

/**
 * Lists the communities, no arguments needed
 * @param callback
 */
B2ShareClient.prototype.listCommunities = function (callback) {

    var params = {
      host: this.host,
      path: '/api/communities/?access_token=' + this.access_token,
      method: 'GET'
    };

    var body = '';
    var hasError = true;
    var req = https.request(params, function (response) {
        response.on('data', function (chunk) {
           body += chunk;
        });

        response.on('end', function () {
            var result = {
                "statusCode": response.statusCode,
                "statusMessage": response.statusMessage
            };
            if(response.statusCode === 200)
            {
                result.data = JSON.parse(body);
                hasError = false;
            }
            callback(hasError, result);
        });
    });

    req.on('error', function (e) {
        console.log(e);
        var result = {
            "statusCode": '500',
            "statusMessage": 'Error getting communities'
        };
        callback(true, result);
    });

    req.end();
};

/**
 * Gets a specific community schema
 * @param communityID the community id you want the schema from
 * @param callback
 */
B2ShareClient.prototype.getCommunitySchema = function (communityID, callback) {
    communityID = querystring.escape(communityID);
    var params = {
        host: this.host,
        path: '/api/communities/' + communityID + '/schemas/last?access_token=' + this.access_token,
        method: 'GET'
    };

    var body = '';
    var hasError = true;
    var req = https.request(params, function (response) {
        response.on('data', function (chunk) {
           body += chunk;
        });

        response.on('end', function () {
            var result = {
                "statusCode": response.statusCode,
                "statusMessage": response.statusMessage
            };
            if(response.statusCode === 200)
            {
                result.data = JSON.parse(body);
                hasError = false;
            }
            callback(hasError, result);
        });
    });

    req.on('error', function (e) {
        console.log(e);
        var result = {
            "statusCode": '500',
            "statusMessage": 'Error getting the community schema'
        };
        callback(true, result);
    });

    req.end();
};

/**
 * List all the records, no arguments needed
 * @param callback
 */
B2ShareClient.prototype.listAllRecords = function (callback) {
    var params = {
        host: this.host,
        path: '/api/records/?access_token=' + this.access_token,
        method: 'GET'
    };

    var body = '';
    var hasError = true;
    var req = https.request(params, function (response) {
        response.on('data', function (chunk) {
            body += chunk;
        });

        response.on('end', function () {
            var result = {
                "statusCode": response.statusCode,
                "statusMessage": response.statusMessage
            };
            if(response.statusCode === 200)
            {
                result.data = JSON.parse(body);
                hasError = false;
            }
            callback(hasError, result);
        });
    });

    req.on('error', function (e) {
        console.log(e);
        var result = {
            "statusCode": '500',
            "statusMessage": 'Error getting all records'
        };
        callback(true, result);
    });

    req.end();
};

/**
 * List records for a specific community
 * @param communityID the community id you want the records from
 * @param callback
 */
B2ShareClient.prototype.listRecordsPerCommunity = function (communityID, callback) {
    communityID = querystring.escape(communityID);
    var params = {
        host: this.host,
        path: '/api/records/?q=community:' + communityID + '?access_token=' + this.access_token,
        method: 'GET'
    };

    var body = '';
    var hasError = true;
    var req = https.request(params, function (response) {
        response.on('data', function (chunk) {
            body += chunk;
        });

        response.on('end', function () {
            var result = {
                "statusCode": response.statusCode,
                "statusMessage": response.statusMessage
            };
            if(response.statusCode === 200)
            {
                result.data = JSON.parse(body);
                hasError = false;
            }
            callback(hasError, result);
        });
    });

    req.on('error', function (e) {
        console.log(e);
        var result = {
            "statusCode": '500',
            "statusMessage": 'Error getting records per community'
        };
        callback(true, result);
    });

    req.end();
};

/**
 * Search records by query string
 * @param queryString the query string
 * @param callback
 */
B2ShareClient.prototype.searchRecords = function (queryString, callback) {
    queryString = querystring.escape(queryString);
    var params = {
        host: this.host,
        path: '/api/records/?q=' + queryString + '?access_token=' + this.access_token,
        method: 'GET'
    };

    var body = '';
    var hasError = true;
    var req = https.request(params, function (response) {
        response.on('data', function (chunk) {
            body += chunk;
        });

        response.on('end', function () {
            var result = {
                "statusCode": response.statusCode,
                "statusMessage": response.statusMessage
            };
            if(response.statusCode === 200)
            {
                result.data = JSON.parse(body);
                hasError = false;
            }
            callback(hasError, result);
        });
    });

    req.on('error', function (e) {
        console.log(e);
        var result = {
            "statusCode": '500',
            "statusMessage": 'Error searching a record'
        };
        callback(true, result);
    });

    req.end();
};

/**
 * Search for drafts, no other parameters required
 * @param callback
 */
B2ShareClient.prototype.searchDrafts = function (callback) {
    var params = {
        host: this.host,
        path: '/api/records/?drafts?access_token=' + this.access_token,
        method: 'GET'
    };

    var body = '';
    var hasError = true;
    var req = https.request(params, function (response) {
        response.on('data', function (chunk) {
            body += chunk;
        });

        response.on('end', function () {
            var result = {
                "statusCode": response.statusCode,
                "statusMessage": response.statusMessage
            };
            if(response.statusCode === 200)
            {
                result.data = JSON.parse(body);
                hasError = false;
            }
            callback(hasError, result);
        });
    });

    req.on('error', function (e) {
        console.log(e);
        var result = {
            "statusCode": '500',
            "statusMessage": 'Error searching for drafts'
        };
        callback(true, result);
    });

    req.end();
};

/**
 * Gets a specific record
 * @param recordID the record id of the record who want the information from
 * @param callback
 */
B2ShareClient.prototype.getSpecificRecord = function(recordID, callback) {
    recordID = querystring.escape(recordID);
    var params = {
        host: this.host,
        path: '/api/records/' +  recordID + '?access_token=' + this.access_token,
        method: 'GET'
    };

    var body = '';
    var hasError = true;
    var req = https.request(params, function (response) {
        response.on('data', function (chunk) {
            body += chunk;
        });

        response.on('end', function () {
            var result = {
                "statusCode": response.statusCode,
                "statusMessage": response.statusMessage
            };
            if(response.statusCode === 200)
            {
                result.data = JSON.parse(body);
                hasError = false;
            }
            callback(hasError, result);
        });
    });

    req.on('error', function (e) {
        console.log(e);
        var result = {
            "statusCode": '500',
            "statusMessage": 'Error getting specific record'
        };
        callback(true, result);
    });

    req.end();
};

/**
 * Creates a draft record
 * @param data json object with basic information about the object, eg: {"titles":[{"title":"TestRest"}], "community":"e9b9792e-79fb-4b07-b6b4-b9c2bd06d095", "open_access":true, "community_specific": {}};
 * @param callback
 */
B2ShareClient.prototype.createADraftRecord = function(data, callback) {
    var params = {
        host: this.host,
        path: '/api/records/?access_token=' + this.access_token,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    };

    var body = '';
    var hasError = true;
    var req = https.request(params, function (response) {
        response.on('data', function (chunk) {
            body += chunk;
        });

        response.on('end', function () {
            var result = {
                "statusCode": response.statusCode,
                "statusMessage": response.statusMessage
            };
            if(response.statusCode === 201)
            {
                result.data = JSON.parse(body);
                hasError = false;
            }
            callback(hasError, result);
        });
    });

    req.on('error', function (e) {
        console.log(e);
        var result = {
            "statusCode": '500',
            "statusMessage": 'Error creating a draft record'
        };
        callback(true, result);
    });

    req.write(JSON.stringify(data));
    req.end();
};

/**
 * Uploads a file into a draft record
 * @param info a json object with info(bucketID and the fileName with its extension) about the file eg: {"bucketID":'547485748754854875fgf', "fileNameWithExt": "testFile.txt"}
 * @param buffer the buffer with the file contents
 * @param callback
 */
B2ShareClient.prototype.uploadFileIntoDraftRecord = function(info, buffer, callback) {
    var fileBucketID = querystring.escape(info.fileBucketID);
    var fileNameWithExt = querystring.escape(info.fileNameWithExt);
    var params = {
        host: this.host,
        path: '/api/files/' + fileBucketID + '/' + fileNameWithExt + '?access_token=' + this.access_token,
        headers: {
            'Content-Type': 'application/octet-stream'
        },
        method: 'PUT'
    };

    var body = '';
    var hasError = true;
    var req = https.request(params, function (response) {
        response.on('data', function (chunk) {
            body += chunk;
        });

        response.on('end', function () {
            var result = {
                "statusCode": response.statusCode,
                "statusMessage": response.statusMessage
            };
            if(response.statusCode === 200)
            {
                result.data = JSON.parse(body);
                hasError = false;
            }
            callback(hasError, result);
        });
    });

    req.on('error', function (e) {
        console.log(e);
        var result = {
            "statusCode": '500',
            "statusMessage": 'Error uploadind a file to a draft record'
        };
        callback(true, result);
    });

    req.write(buffer);
    req.end();
};

/**
 * Gets the uploaded files in a specific record
 * @param fileBucketID the file bucket id
 * @param callback
 */
B2ShareClient.prototype.listUploadedFilesInRecord = function(fileBucketID, callback) {
    fileBucketID = querystring.escape(fileBucketID);
    var params = {
        host: this.host,
        path: '/api/files/' +  fileBucketID + '?access_token=' + this.access_token,
        method: 'GET'
    };

    var body = '';
    var hasError = true;
    var req = https.request(params, function (response) {
        response.on('data', function (chunk) {
            body += chunk;
        });

        response.on('end', function () {
            var result = {
                "statusCode": response.statusCode,
                "statusMessage": response.statusMessage
            };
            if(response.statusCode === 200)
            {
                result.data = JSON.parse(body);
                hasError = false;
            }
            callback(hasError, result);
        });
    });

    req.on('error', function (e) {
        console.log(e);
        var result = {
            "statusCode": '500',
            "statusMessage": 'Error listing uploaded files for a record'
        };
        callback(true, result);
    });

    req.end();
};

/**
 * Updates a draft record metadata
 * @param recordID the record id of the draft
 * @param jsonPatchFormatData the content of the update, follows the json patch format ex: { "op": "replace", "path": "/titles/0/title", "value": "FINAL" }
 * @param callback
 */
B2ShareClient.prototype.updateDraftRecordMetadata = function (recordID, jsonPatchFormatData, callback) {
    recordID = querystring.escape(recordID);
    var params = {
        host: this.host,
        path: '/api/records/' +  recordID + '/draft?access_token=' + this.access_token,
        headers: {
            'content-type': 'application/json-patch+json',
        },
        json: true,
        method: 'PATCH'
    };

    var body = '';
    var hasError = true;
    var req = https.request(params, function (response) {
        response.on('data', function (chunk) {
            body += chunk;
        });

        response.on('end', function () {
            var result = {
                "statusCode": response.statusCode,
                "statusMessage": response.statusMessage
            };
            if(response.statusCode === 200)
            {
                result.data = JSON.parse(body);
                hasError = false;
            }
            callback(hasError, result);
        });
    });

    req.on('error', function (e) {
        console.log(e);
        var result = {
            "statusCode": '500',
            "statusMessage": 'Error updating a draft metadata'
        };
        callback(true, result);
    });

    req.write(JSON.stringify(jsonPatchFormatData));
    req.end();
};

/**
 * Submits a draft for publication
 * @param recordID the record id to submit for publication
 * @param callback
 */
B2ShareClient.prototype.submitDraftRecordForPublication= function (recordID, callback) {
    var jsonPatchFormatData = [{"op": "add", "path":"/publication_state", "value": "submitted"}];
    this.updateDraftRecordMetadata(recordID, jsonPatchFormatData, function (error, body) {
       callback(error, body);
    });
};

module.exports = B2ShareClient;

