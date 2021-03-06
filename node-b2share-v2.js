const followRedirects = require("follow-redirects");
followRedirects.maxBodyLength = 10 * 1024 * 1024 * 1024;
const https = followRedirects.https;
const querystring = require("querystring");
const fs = require("fs");
const path = require("path");


const isAValidString = function (candidateString, minStringLength)
{
    let validation = (typeof candidateString === "string" || candidateString instanceof String) && (candidateString.length >= minStringLength);
    return validation;
};

/**
 * Initiates the B2ShareClient
 * @param host the host required to execute the requests(ex: trng-b2share.eudat.eu)
 * @param accessToken the user's access token
 * @constructor
 */
function B2ShareClient(host, accessToken)
{
    const validInputs = function ()
    {
        return isAValidString(host, 1) && isAValidString(accessToken, 1);
    };

    if(validInputs() === true)
    {
        this.host = host;
        this.accessToken = querystring.escape(accessToken);
    }
    else
    {
        throw new Error("B2SHARE host and user access token are required!");
    }
}

/**
 * Lists the communities, no arguments needed
 * @param callback
 */
B2ShareClient.prototype.listCommunities = function (callback) {

    const params = {
        host: this.host,
        path: "/api/communities/?access_token=" + this.accessToken,
        method: "GET"
    };

    let body = "";
    let hasError = true;
    let req = https.request(params, function (response) {
        response.on("data", function (chunk) {
            body += chunk;
        });

        response.on("end", function () {
            let result = {
                statusCode: response.statusCode,
                statusMessage: response.statusMessage
            };
            if(response.statusCode === 200)
            {
                result.data = JSON.parse(body);
                hasError = null;
            }
            callback(hasError, result);
        });
    });

    req.on("error", function (e) {
        console.log(e);
        let result = {
            statusCode: 500,
            statusMessage : "Error getting communities"
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
    const validInputs = function ()
    {
        return isAValidString(communityID, 1);
    };

    if(validInputs() === true)
    {
        communityID = querystring.escape(communityID);
        const params = {
            host: this.host,
            path: "/api/communities/" + communityID + "/schemas/last?access_token=" + this.accessToken,
            method: "GET"
        };

        let body = "";
        let hasError = true;
        let req = https.request(params, function (response) {
            response.on("data", function (chunk) {
                body += chunk;
            });

            response.on("end", function () {
                let result = {
                    statusCode: response.statusCode,
                    statusMessage: response.statusMessage
                };
                if(response.statusCode === 200)
                {
                    result.data = JSON.parse(body);
                    hasError = null;
                }
                callback(hasError, result);
            });
        });

        req.on("error", function (e) {
            console.log(e);
            let result = {
                statusCode: 500,
                statusMessage: "Error getting the community schema"
            };
            callback(true, result);
        });

        req.end();
    }
    else
    {
        let result = {
            statusCode: 400,
            statusMessage: "Invalid communityID"
        };
        callback(true, result);
    }
};

/**
 * List all the records, no arguments needed
 * @param callback
 */
B2ShareClient.prototype.listAllRecords = function (callback) {
    const params = {
        host: this.host,
        path: "/api/records/?access_token=" + this.accessToken,
        method: "GET"
    };

    let body = "";
    let hasError = true;
    let req = https.request(params, function (response) {
        response.on("data", function (chunk) {
            body += chunk;
        });

        response.on("end", function () {
            let result = {
                statusCode: response.statusCode,
                statusMessage: response.statusMessage
            };
            if(response.statusCode === 200)
            {
                result.data = JSON.parse(body);
                hasError = null;
            }
            callback(hasError, result);
        });
    });

    req.on("error", function (e) {
        console.log(e);
        let result = {
            statusCode: 500,
            statusMessage: "Error getting all records"
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
    const validInputs = function ()
    {
        return isAValidString(communityID, 1);
    };

    if(validInputs() === true)
    {
        communityID = querystring.escape(communityID);
        const params = {
            host: this.host,
            path: "/api/records/?q=community:" + communityID + "?access_token=" + this.accessToken,
            method: "GET"
        };
        let body = "";
        let hasError = true;
        let req = https.request(params, function (response) {
            response.on("data", function (chunk) {
                body += chunk;
            });

            response.on("end", function () {
                let result = {
                    statusCode: response.statusCode,
                    statusMessage: response.statusMessage
                };
                if(response.statusCode === 200)
                {
                    result.data = JSON.parse(body);
                    hasError = null;
                }
                callback(hasError, result);
            });
        });
        req.on("error", function (e) {
            console.log(e);
            let result = {
                statusCode: 500,
                statusMessage: "Error getting records per community"
            };
            callback(true, result);
        });
        req.end();
    }
    else
    {
        let result = {
            statusCode: 400,
            statusMessage: "Invalid communityID"
        };
        callback(true, result);
    }
};

/**
 * Search records by query string
 * @param queryString the query string
 * @param callback
 */
B2ShareClient.prototype.searchRecords = function (queryString, callback) {
    const validInputs = function ()
    {
        return isAValidString(queryString, 1);
    };

    if(validInputs() === true)
    {
        queryString = querystring.escape(queryString);
        const params = {
            host: this.host,
            path: "/api/records/?q=" + queryString + "?access_token=" + this.accessToken,
            method: "GET"
        };
        let body = "";
        let hasError = true;
        let req = https.request(params, function (response) {
            response.on("data", function (chunk) {
                body += chunk;
            });

            response.on("end", function () {
                let result = {
                    statusCode: response.statusCode,
                    statusMessage: response.statusMessage
                };
                if(response.statusCode === 200)
                {
                    result.data = JSON.parse(body);
                    hasError = null;
                }
                callback(hasError, result);
            });
        });
        req.on("error", function (e) {
            console.log(e);
            let result = {
                statusCode: 500,
                statusMessage: "Error searching a record"
            };
            callback(true, result);
        });
        req.end();
    }
    else
    {
        let result = {
            statusCode: 400,
            statusMessage: "Invalid queryString"
        };
        callback(true, result);
    }
};

/**
 * Search for drafts, no other parameters required
 * @param callback
 */
B2ShareClient.prototype.searchDrafts = function (callback) {
    const params = {
        host: this.host,
        path: "/api/records/?drafts?access_token=" + this.accessToken,
        method: "GET"
    };
    let body = "";
    let hasError = true;
    let req = https.request(params, function (response) {
        response.on("data", function (chunk) {
            body += chunk;
        });
        response.on("end", function () {
            let result = {
                statusCode: response.statusCode,
                statusMessage: response.statusMessage
            };
            if(response.statusCode === 200)
            {
                result.data = JSON.parse(body);
                hasError = null;
            }
            callback(hasError, result);
        });
    });
    req.on("error", function (e) {
        console.log(e);
        let result = {
            statusCode: 500,
            statusMessage: "Error searching for drafts"
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
    const validInputs = function ()
    {
        return isAValidString(recordID, 1);
    };

    if(validInputs() === true)
    {
        recordID = querystring.escape(recordID);
        const params = {
            host: this.host,
            path: "/api/records/" +  recordID + "?access_token=" + this.accessToken,
            method: "GET"
        };
        let body = "";
        let hasError = true;
        let req = https.request(params, function (response) {
            response.on("data", function (chunk) {
                body += chunk;
            });

            response.on("end", function () {
                let result = {
                    statusCode: response.statusCode,
                    statusMessage: response.statusMessage
                };
                if(response.statusCode === 200)
                {
                    result.data = JSON.parse(body);
                    hasError = null;
                }
                callback(hasError, result);
            });
        });

        req.on("error", function (e) {
            console.log(e);
            let result = {
                statusCode: 500,
                statusMessage: "Error getting specific record"
            };
            callback(true, result);
        });

        req.end();
    }
    else
    {
        let result = {
            statusCode: 400,
            statusMessage: "Invalid recordID"
        };
        callback(true, result);
    }
};

/**
 * Creates a draft record
 * @param data json object with basic information about the object, eg: {"titles":[{"title":"TestRest"}], "community":"e9b9792e-79fb-4b07-b6b4-b9c2bd06d095", "open_access":true, "community_specific": {}};
 * @param callback
 */
B2ShareClient.prototype.createADraftRecord = function(data, callback) {
    const validInputs = function ()
    {
        if(data === null || data === undefined || data instanceof Array || typeof data !== "object")
        {
            return false;
        }
        else
        {
            try
            {
                let dataAsAString = JSON.stringify(data);
                let dataAsObject = JSON.parse(dataAsAString);
                return true;
            }
            catch(error)
            {
                //Invalid 'data' JSON object
                return false;
            }
        }
    };

    if(validInputs() === true)
    {
        const params = {
            host: this.host,
            path: "/api/records/?access_token=" + this.accessToken,
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        };
        let body = "";
        let hasError = true;
        let req = https.request(params, function (response) {
            response.on("data", function (chunk) {
                body += chunk;
            });

            response.on("end", function () {
                let result = {
                    statusCode: response.statusCode,
                    statusMessage: response.statusMessage
                };
                if(response.statusCode === 201)
                {
                    result.data = JSON.parse(body);
                    hasError = null;
                }
                callback(hasError, result);
            });
        });
        req.on("error", function (e) {
            console.log(e);
            let result = {
                statusCode: 500,
                statusMessage: "Error creating a draft record"
            };
            callback(true, result);
        });
        req.write(JSON.stringify(data));
        req.end();
    }
    else
    {
        let result = {
            statusCode: 400,
            statusMessage: "Invalid 'data' JSON object"
        };
        callback(true, result);
    }
};


/**
 * Uploads a file into a draft record
 * @param info a json object with info(bucketID and the absolute file path) about the file eg: {"fileBucketID":"547485748754854875fgf", "absFilePath": "/Users/np/Desktop/docs/thisIsATxtFile.txt"}
 * @param callback
 */
B2ShareClient.prototype.uploadFileIntoDraftRecord = function(info, callback) {

    const validInputs = function ()
    {
        try
        {
            let infoAsAString = JSON.stringify(info);
            let infoAsObject = JSON.parse(infoAsAString);
            if(!infoAsObject.hasOwnProperty("fileBucketID") || !isAValidString(infoAsObject.fileBucketID, 1))
            {
                //Invalid 'info' JSON object, must contain 'fileBucketID' and 'absFilePath' fields
                return false;
            }
            else if(!infoAsObject.hasOwnProperty("absFilePath") || !isAValidString(infoAsObject.absFilePath, 1))
            {
                //Invalid 'info' JSON object, must contain 'fileBucketID' and 'absFilePath' fields
                return false;
            }
            else
            {
                return true;
            }
        }
        catch(error)
        {
            //Invalid 'info' JSON object, must contain 'fileBucketID' and 'absFilePath' fields
            return false;
        }
    };

    if(validInputs() === true)
    {
        const fileBucketID = querystring.escape(info.fileBucketID);
        const absFilePath = info.absFilePath;
        if (!fs.existsSync(absFilePath)) {
            let result = {
                statusCode: 400,
                statusMessage: "Invalid 'info' JSON object, must contain 'fileBucketID' and 'absFilePath' fields"
            };
            return callback(true, result);
        }
        const fileNameWithExt = querystring.escape(path.basename(absFilePath));
        const params = {
            host: this.host,
            path: "/api/files/" + fileBucketID + "/" + fileNameWithExt + "?access_token=" + this.accessToken,
            headers: {
                "Content-Type": "application/octet-stream"
            },
            method: "PUT"
        };
        let body = "";
        let hasError = true;
        let req = https.request(params, function (response) {
            response.on("data", function (chunk) {
                body += chunk;
            });

            response.on("end", function () {
                let result = {
                    statusCode: response.statusCode,
                    statusMessage: response.statusMessage
                };
                if(response.statusCode === 200)
                {
                    result.data = JSON.parse(body);
                    hasError = null;
                }
                callback(hasError, result);
            });
        });
        req.on("error", function (e) {
            console.log(e);
            let result = {
                statusCode: 500,
                statusMessage: "Error uploading a file to a draft record"
            };
            callback(true, result);
        });
        req.on("end", function (e) {
            //Request was completed!!
        });
        fs.createReadStream(absFilePath).pipe(req);
    }
    else
    {
        let result = {
            statusCode: 400,
            statusMessage: "Invalid 'info' JSON object, must contain 'fileBucketID' and 'absFilePath' fields"
        };
        callback(true, result);
    }
};

/**
 * Gets the uploaded files in a specific record
 * @param fileBucketID the file bucket id
 * @param callback
 */
B2ShareClient.prototype.listUploadedFilesInRecord = function(fileBucketID, callback) {
    const validInputs = function ()
    {
        return isAValidString(fileBucketID, 1);
    };

    if(validInputs() === true)
    {
        fileBucketID = querystring.escape(fileBucketID);
        const params = {
            host: this.host,
            path: "/api/files/" +  fileBucketID + "?access_token=" + this.accessToken,
            method: "GET"
        };

        let body = "";
        let hasError = true;
        let req = https.request(params, function (response) {
            response.on("data", function (chunk) {
                body += chunk;
            });

            response.on("end", function () {
                let result = {
                    statusCode: response.statusCode,
                    statusMessage: response.statusMessage
                };
                if(response.statusCode === 200)
                {
                    result.data = JSON.parse(body);
                    hasError = null;
                }
                callback(hasError, result);
            });
        });

        req.on("error", function (e) {
            console.log(e);
            let result = {
                statusCode: 500,
                statusMessage: "Error listing uploaded files for a record"
            };
            callback(true, result);
        });

        req.end();
    }
    else
    {
        let result = {
            statusCode: 400,
            statusMessage: "Invalid fileBucketID"
        };
        callback(true, result);
    }
};

/**
 * Updates a draft record metadata
 * @param recordID the record id of the draft
 * @param jsonPatchFormatData the content of the update, follows the json patch format ex: [{ "op": "replace", "path": "/titles/0/title", "value": "FINAL" }]
 * @param callback
 */
B2ShareClient.prototype.updateDraftRecordMetadata = function (recordID, jsonPatchFormatData, callback) {
    const validInputs = function ()
    {
        if(!isAValidString(recordID, 1))
        {
            return false;
        }
        else if(jsonPatchFormatData === null || jsonPatchFormatData === undefined || !(jsonPatchFormatData instanceof Array))
        {
            return false;
        }
        else
        {
            try
            {
                let jsonPatchFormatDataAsAString = JSON.stringify(jsonPatchFormatData);
                let jsonPatchFormatDataAsObject = JSON.parse(jsonPatchFormatDataAsAString);
                return true;
            }
            catch(error)
            {
                //Invalid 'jsonPatchFormatData' JSON object
                return false;
            }
        }
    };

    if(validInputs() === true)
    {
        recordID = querystring.escape(recordID);
        const params = {
            host: this.host,
            path: "/api/records/" +  recordID + "/draft?access_token=" + this.accessToken,
            headers: {
                "content-type": "application/json-patch+json"
            },
            json: true,
            method: "PATCH"
        };

        let body = "";
        let hasError = true;
        let req = https.request(params, function (response) {
            response.on("data", function (chunk) {
                body += chunk;
            });

            response.on("end", function () {
                let result = {
                    statusCode: response.statusCode,
                    statusMessage: response.statusMessage
                };
                if(response.statusCode === 200)
                {
                    result.data = JSON.parse(body);
                    hasError = null;
                }
                callback(hasError, result);
            });
        });

        req.on("error", function (e) {
            console.log(e);
            let result = {
                statusCode: 500,
                statusMessage: "Error updating a draft metadata"
            };
            callback(true, result);
        });

        req.write(JSON.stringify(jsonPatchFormatData));
        req.end();
    }
    else
    {
        let result = {
            statusCode: 400,
            statusMessage: "Must supply a valid recordID and jsonPatchFormatData"
        };
        callback(true, result);
    }
};

/**
 * Submits a draft for publication
 * @param recordID the record id to submit for publication
 * @param callback
 */
B2ShareClient.prototype.submitDraftRecordForPublication= function (recordID, callback) {
    const validInputs = function ()
    {
        return isAValidString(recordID, 1);
    };

    if(validInputs() === true)
    {
        const jsonPatchFormatData = [{"op": "add", "path":"/publication_state", "value": "submitted"}];
        this.updateDraftRecordMetadata(recordID, jsonPatchFormatData, function (error, body) {
            callback(error, body);
        });
    }
    else
    {
        let result = {
            statusCode: 400,
            statusMessage: "Invalid recordID"
        };
        callback(true, result);
    }
};

module.exports = B2ShareClient;