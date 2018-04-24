let chai = require("chai");
let assert = chai.assert,
    expect = chai.expect,
    B2ShareClient = require("../node-b2share-v2"),
    recordIDToUpdate = null,
    bucketUrlToListFiles = null,
    fileBucketID = null;
const testFileAbsLocation = __dirname + "/testFile.txt";

const createDefaultB2ShareClient = function () {
    const host = "trng-b2share.eudat.eu";
    const accessTokens = "MmGKBzjpdlT382lag38zxhsKttZDw9e7u6zZmzucVFUu1aYM5i55WpeUSgFE";
    return new B2ShareClient(host, accessTokens);
};

const createDefaultB2ShareDraft = function (callback) {
    const data = {"titles":[{"title":"NEWTESTFIXE"}], "community":"e9b9792e-79fb-4b07-b6b4-b9c2bd06d095", "open_access":true, "community_specific": {}};
    const client = createDefaultB2ShareClient();
    client.createADraftRecord(data, function (err, body) {
        recordIDToUpdate = body.data.id;
        bucketUrlToListFiles = body.data.links.files;
        callback(err, body);
    });
};

const uploadFileIntoDefaultB2shareDraft = function (callback) {
    createDefaultB2ShareDraft(function (err, info) {
       if(err === true)
       {
           callback(err, info);
       }
       else
       {
           fileBucketID = bucketUrlToListFiles.split("/").pop();
           const info = {"fileBucketID":fileBucketID, "absFilePath": testFileAbsLocation};
           const client = createDefaultB2ShareClient();
           client.uploadFileIntoDraftRecord(info, function (err, body) {
               callback(err, body);
           });
       }
    });
};

describe("Create B2SHARE Client with errors", function () {
    //WHEN HOST IS NULL
    it("Should throw an exception if the host is null", function (done) {
        this.timeout(5000);
        var testClientConstructor = function () {
            const host = null;
            const accessTokens = "MmGKBzjpdlT382lag38zxhsKttZDw9e7u6zZmzucVFUu1aYM5i55WpeUSgFE";
            const client = new B2ShareClient(host, accessTokens);
        };

        expect(testClientConstructor).to.throw("B2SHARE host and user access token are required!");
        done();
    });

    //HOST IS UNDEFINED
    it("Should throw an exception if the host is undefined", function (done) {
        this.timeout(5000);
        var testClientConstructor = function () {
            const host = undefined;
            const accessTokens = "MmGKBzjpdlT382lag38zxhsKttZDw9e7u6zZmzucVFUu1aYM5i55WpeUSgFE";
            const client = new B2ShareClient(host, accessTokens);
        };

        expect(testClientConstructor).to.throw("B2SHARE host and user access token are required!");
        done();
    });

    //HOST IS A BOOLEAN
    it("Should throw an exception if the host is a boolean", function (done) {
        this.timeout(5000);
        var testClientConstructor = function () {
            const host = true;
            const accessTokens = "MmGKBzjpdlT382lag38zxhsKttZDw9e7u6zZmzucVFUu1aYM5i55WpeUSgFE";
            const client = new B2ShareClient(host, accessTokens);
        };

        expect(testClientConstructor).to.throw("B2SHARE host and user access token are required!");
        done();
    });

    //HOST IS A NUMBER
    it("Should throw an exception if the host is a number", function (done) {
        this.timeout(5000);
        var testClientConstructor = function () {
            const host = 1;
            const accessTokens = "MmGKBzjpdlT382lag38zxhsKttZDw9e7u6zZmzucVFUu1aYM5i55WpeUSgFE";
            const client = new B2ShareClient(host, accessTokens);
        };

        expect(testClientConstructor).to.throw("B2SHARE host and user access token are required!");
        done();
    });

    //HOST IS A STRING OF LENGTH INFERIOR TO 1
    it("Should throw an exception if the host is strong of length inferior to 1", function (done) {
        this.timeout(5000);
        var testClientConstructor = function () {
            const host = "";
            const accessTokens = "MmGKBzjpdlT382lag38zxhsKttZDw9e7u6zZmzucVFUu1aYM5i55WpeUSgFE";
            const client = new B2ShareClient(host, accessTokens);
        };

        expect(testClientConstructor).to.throw("B2SHARE host and user access token are required!");
        done();
    });

    //ACCESS TOKEN IS NULL
    it("Should throw an exception if the host is null", function (done) {
        this.timeout(5000);
        var testClientConstructor = function () {
            const host = "trng-b2share.eudat.eu";
            const accessTokens = null;
            const client = new B2ShareClient(host, accessTokens);
        };

        expect(testClientConstructor).to.throw("B2SHARE host and user access token are required!");
        done();
    });

    //ACCESS TOKEN IS UNDEFINED
    it("Should throw an exception if the host is null", function (done) {
        this.timeout(5000);
        var testClientConstructor = function () {
            const host = "trng-b2share.eudat.eu";
            const accessTokens = undefined;
            const client = new B2ShareClient(host, accessTokens);
        };

        expect(testClientConstructor).to.throw("B2SHARE host and user access token are required!");
        done();
    });

    //ACCESS TOKEN IS A BOOLEAN
    it("Should throw an exception if the host is null", function (done) {
        this.timeout(5000);
        var testClientConstructor = function () {
            const host = "trng-b2share.eudat.eu";
            const accessTokens = true;
            const client = new B2ShareClient(host, accessTokens);
        };

        expect(testClientConstructor).to.throw("B2SHARE host and user access token are required!");
        done();
    });

    //ACCESS TOKEN IS A NUMBER
    it("Should throw an exception if the host is null", function (done) {
        this.timeout(5000);
        var testClientConstructor = function () {
            const host = "trng-b2share.eudat.eu";
            const accessTokens = 1;
            const client = new B2ShareClient(host, accessTokens);
        };

        expect(testClientConstructor).to.throw("B2SHARE host and user access token are required!");
        done();
    });

    //ACCESS TOKEN IS A STRING OF LENGTH INFERIOR TO 1
    it("Should throw an exception if the host is null", function (done) {
        this.timeout(5000);
        var testClientConstructor = function () {
            const host = "trng-b2share.eudat.eu";
            const accessTokens = "";
            const client = new B2ShareClient(host, accessTokens);
        };
        expect(testClientConstructor).to.throw("B2SHARE host and user access token are required!");
        done();
    });
});

describe("Create B2SHARE Client with SUCCESS", function () {
    it("Should create a B2SHARE client successfully", function (done) {
        this.timeout(5000);
        expect(createDefaultB2ShareClient).to.not.throw();
        done();
    });
});

describe("listCommunities with success", function () {
    it("Should list all communities when the B2SHARE is created with a proper host and access token", function (done) {
        const client = createDefaultB2ShareClient();
        const expectedStatusCode = 200;
        const expectedStatusMessage = "OK";
        this.timeout(5000);
        assert.doesNotThrow(function () {
            client.listCommunities(function (err, body) {
                assert.equal(body.statusCode, expectedStatusCode);
                assert.equal(body.statusMessage, expectedStatusMessage);
                expect(body.data).to.be.an("object");
                done();
            }, done);
        });
    });
});

describe("getCommunitySchema with errors", function () {
    //communityID IS NULL
    it("should give an error if communityID is null", function (done) {
        const client = createDefaultB2ShareClient();
        const expectedStatusCode = 400;
        const expectedMessage = "Invalid communityID";
        this.timeout(5000);
        const communityID = null;
        client.getCommunitySchema(communityID, function (err, body) {
            assert.equal(body.statusCode, expectedStatusCode);
            assert.equal(body.statusMessage, expectedMessage);
            done();
        }, done);
    });

    //communityID IS UNDEFINED
    it("should give an error if communityID is undefined", function (done) {
        const client = createDefaultB2ShareClient();
        const expectedStatusCode = 400;
        const expectedMessage = "Invalid communityID";
        this.timeout(5000);
        const communityID = undefined;
        client.getCommunitySchema(communityID, function (err, body) {
            assert.equal(body.statusCode, expectedStatusCode);
            assert.equal(body.statusMessage, expectedMessage);
            done();
        }, done);
    });

    //communityID IS A BOOLEAN
    it("should give an error if communityID is a boolean", function (done) {
        const client = createDefaultB2ShareClient();
        const expectedStatusCode = 400;
        const expectedMessage = "Invalid communityID";
        this.timeout(5000);
        const communityID = true;
        client.getCommunitySchema(communityID, function (err, body) {
            assert.equal(body.statusCode, expectedStatusCode);
            assert.equal(body.statusMessage, expectedMessage);
            done();
        }, done);
    });

    //communityID IS A NUMBER
    it("should give an error if communityID is a number", function (done) {
        const client = createDefaultB2ShareClient();
        const expectedStatusCode = 400;
        const expectedMessage = "Invalid communityID";
        this.timeout(5000);
        const communityID = 1;
        client.getCommunitySchema(communityID, function (err, body) {
            assert.equal(body.statusCode, expectedStatusCode);
            assert.equal(body.statusMessage, expectedMessage);
            done();
        }, done);
    });

    //communityID IS A STRING OF LENGTH INFERIOR TO 1
    it("should give an error if communityID is a string of length inferior to 1", function (done) {
        const client = createDefaultB2ShareClient();
        const expectedStatusCode = 400;
        const expectedMessage = "Invalid communityID";
        this.timeout(5000);
        const communityID = "";
        client.getCommunitySchema(communityID, function (err, body) {
            assert.equal(body.statusCode, expectedStatusCode);
            assert.equal(body.statusMessage, expectedMessage);
            done();
        }, done);
    });
});

describe("getCommunitySchema with success", function () {
    it("should get the getCommunitySchema when the B2SHARE is properly created and a valid communityID is given", function (done) {
        const expectedStatusCode = 200;
        const expectedStatusMessage = "OK";
        this.timeout(5000);

        assert.doesNotThrow(function () {
            const client = createDefaultB2ShareClient();
            const communityID = "0afede87-2bf2-4d89-867e-d2ee57251c62";
            client.getCommunitySchema(communityID, function (err, body) {
                assert.equal(body.statusCode, expectedStatusCode);
                assert.equal(body.statusMessage, expectedStatusMessage);
                expect(body.data).to.be.an("object");
                done();
            }, done);
        });
    });
});

describe("listAllRecords with success", function () {
    it("should list all records with success when the B2SHARE client is properly created", function (done) {
        const expectedStatusCode = 200;
        const expectedStatusMessage = "OK";
        this.timeout(5000);
        const client = createDefaultB2ShareClient();
        assert.doesNotThrow(function () {
            client.listAllRecords(function (err, body) {
                assert.equal(body.statusCode, expectedStatusCode);
                assert.equal(body.statusMessage, expectedStatusMessage);
                expect(body.data).to.be.an("object");
                done();
            }, done);
        });
    });
});

describe("listRecordsPerCommunity with error", function () {
    //communityID IS NULL
    it("should give an error when the communityID is null", function (done) {
        const expectedStatusCode = 400;
        const expectedStatusMessage = "Invalid communityID";
        this.timeout(5000);
        assert.doesNotThrow(function () {
            const communityID = null;
            const client = createDefaultB2ShareClient();
            client.listRecordsPerCommunity(communityID,function (err, body) {
                assert.equal(body.statusCode, expectedStatusCode);
                assert.equal(body.statusMessage, expectedStatusMessage);
                done();
            }, done);
        });
    });

    //communityID IS UNDEFINED
    it("should give an error when the communityID is undefined", function (done) {
        const expectedStatusCode = 400;
        const expectedStatusMessage = "Invalid communityID";
        this.timeout(5000);
        assert.doesNotThrow(function () {
            const communityID = undefined;
            const client = createDefaultB2ShareClient();
            client.listRecordsPerCommunity(communityID,function (err, body) {
                assert.equal(body.statusCode, expectedStatusCode);
                assert.equal(body.statusMessage, expectedStatusMessage);
                done();
            }, done);
        });
    });

    //communityID IS A BOOLEAN
    it("should give an error when the communityID is a boolean", function (done) {
        const expectedStatusCode = 400;
        const expectedStatusMessage = "Invalid communityID";
        this.timeout(5000);
        assert.doesNotThrow(function () {
            const communityID = true;
            const client = createDefaultB2ShareClient();
            client.listRecordsPerCommunity(communityID,function (err, body) {
                assert.equal(body.statusCode, expectedStatusCode);
                assert.equal(body.statusMessage, expectedStatusMessage);
                done();
            }, done);
        });
    });

    //communityID IS A NUMBER
    it("should give an error when the communityID is a number", function (done) {
        const expectedStatusCode = 400;
        const expectedStatusMessage = "Invalid communityID";
        this.timeout(5000);
        assert.doesNotThrow(function () {
            const communityID = 1;
            const client = createDefaultB2ShareClient();
            client.listRecordsPerCommunity(communityID,function (err, body) {
                assert.equal(body.statusCode, expectedStatusCode);
                assert.equal(body.statusMessage, expectedStatusMessage);
                done();
            }, done);
        });
    });

    //communityID IS A STRING OF LENGTH INFERIOR TO 1
    it("should give an error when the communityID is a String of length inferior to 1", function (done) {
        const expectedStatusCode = 400;
        const expectedStatusMessage = "Invalid communityID";
        this.timeout(5000);
        assert.doesNotThrow(function () {
            const communityID = "";
            const client = createDefaultB2ShareClient();
            client.listRecordsPerCommunity(communityID,function (err, body) {
                assert.equal(body.statusCode, expectedStatusCode);
                assert.equal(body.statusMessage, expectedStatusMessage);
                done();
            }, done);
        });
    });

});

describe("listRecordsPerCommunity with success", function () {
    //communityID is a string
    it("should listRecordsPerCommunity with success when the B2SHARE client is created properly and a valid communityID is given", function (done) {
        const expectedStatusCode = 200;
        const expectedStatusMessage = "OK";
        this.timeout(5000);
        assert.doesNotThrow(function () {
            const communityID = "0afede87-2bf2-4d89-867e-d2ee57251c62";
            const client = createDefaultB2ShareClient();
            client.listRecordsPerCommunity(communityID,function (err, body) {
                assert.equal(body.statusCode, expectedStatusCode);
                assert.equal(body.statusMessage, expectedStatusMessage);
                expect(body.data).to.be.an("object");
                done();
            }, done);
        });
    });
});

describe("searchRecords with error", function () {
    //queryString IS NULL
    it("should give an error if the queryString is null", function (done) {
        const expectedStatusCode = 400;
        const expectedStatusMessage = "Invalid queryString";
        this.timeout(5000);
        assert.doesNotThrow(function () {
            const queryString = null;
            const client = createDefaultB2ShareClient();
            client.searchRecords(queryString,function (err, body) {
                assert.equal(body.statusCode, expectedStatusCode);
                assert.equal(body.statusMessage, expectedStatusMessage);
                done();
            }, done);
        });
    });

    //queryString IS UNDEFINED
    it("should give an error if the queryString is undefined", function (done) {
        const expectedStatusCode = 400;
        const expectedStatusMessage = "Invalid queryString";
        this.timeout(5000);
        assert.doesNotThrow(function () {
            const queryString = undefined;
            const client = createDefaultB2ShareClient();
            client.searchRecords(queryString,function (err, body) {
                assert.equal(body.statusCode, expectedStatusCode);
                assert.equal(body.statusMessage, expectedStatusMessage);
                done();
            }, done);
        });
    });

    //queryString IS A BOOLEAN
    it("should give an error if the queryString is a boolean", function (done) {
        const expectedStatusCode = 400;
        const expectedStatusMessage = "Invalid queryString";
        this.timeout(5000);
        assert.doesNotThrow(function () {
            const queryString = true;
            const client = createDefaultB2ShareClient();
            client.searchRecords(queryString,function (err, body) {
                assert.equal(body.statusCode, expectedStatusCode);
                assert.equal(body.statusMessage, expectedStatusMessage);
                done();
            }, done);
        });
    });

    //queryString IS A NUMBER
    it("should give an error if the queryString is a number", function (done) {
        const expectedStatusCode = 400;
        const expectedStatusMessage = "Invalid queryString";
        this.timeout(5000);
        assert.doesNotThrow(function () {
            const queryString = 1;
            const client = createDefaultB2ShareClient();
            client.searchRecords(queryString,function (err, body) {
                assert.equal(body.statusCode, expectedStatusCode);
                assert.equal(body.statusMessage, expectedStatusMessage);
                done();
            }, done);
        });
    });

    //queryString IS A STRING OF LENGTH INFERIOR TO 1
    it("should give an error if the queryString is a string of length inferior to 1", function (done) {
        const expectedStatusCode = 400;
        const expectedStatusMessage = "Invalid queryString";
        this.timeout(5000);
        assert.doesNotThrow(function () {
            const queryString = "";
            const client = createDefaultB2ShareClient();
            client.searchRecords(queryString,function (err, body) {
                assert.equal(body.statusCode, expectedStatusCode);
                assert.equal(body.statusMessage, expectedStatusMessage);
                done();
            }, done);
        });
    });
});

describe("searchRecords with success", function () {
    //queryString is a string
    it("should searchRecords with success if the B2Share Client was created properly and a valid queryString was given", function (done) {
        const expectedStatusCode = 200;
        const expectedStatusMessage = "OK";
        this.timeout(5000);
        assert.doesNotThrow(function () {
            const queryString = "0afede87-2bf2-4d89-867e-d2ee57251c62";
            const client = createDefaultB2ShareClient();
            client.searchRecords(queryString,function (err, body) {
                assert.equal(body.statusCode, expectedStatusCode);
                assert.equal(body.statusMessage, expectedStatusMessage);
                expect(body.data).to.be.an("object");
                done();
            }, done);
        });
    });
});

describe("searchDrafts with success", function () {
    it("should searchDrafts with success if the B2Share client is created properly", function (done) {
        const expectedStatusCode = 200;
        const expectedStatusMessage = "OK";
        this.timeout(5000);
        assert.doesNotThrow(function () {
            const client = createDefaultB2ShareClient();
            client.searchDrafts(function (err, body) {
                assert.equal(body.statusCode, expectedStatusCode);
                assert.equal(body.statusMessage, expectedStatusMessage);
                expect(body.data).to.be.an("object");
                done();
            }, done);
        });
    });
});

describe("getSpecificRecord with error", function () {
    //recordID IS NULL
    it("should give an error if the recordID is null", function (done) {
        const expectedStatusCode = 400;
        const expectedStatusMessage = "Invalid recordID";
        this.timeout(5000);
        assert.doesNotThrow(function () {
            const recordID = null;
            const client = createDefaultB2ShareClient();
            client.getSpecificRecord(recordID, function (err, body) {
                assert.equal(body.statusCode, expectedStatusCode);
                assert.equal(body.statusMessage, expectedStatusMessage);
                done();
            }, done);
        });
    });

    //recordID IS UNDEFINED
    it("should give an error if the recordID is undefined", function (done) {
        const expectedStatusCode = 400;
        const expectedStatusMessage = "Invalid recordID";
        this.timeout(5000);
        assert.doesNotThrow(function () {
            const recordID = undefined;
            const client = createDefaultB2ShareClient();
            client.getSpecificRecord(recordID, function (err, body) {
                assert.equal(body.statusCode, expectedStatusCode);
                assert.equal(body.statusMessage, expectedStatusMessage);
                done();
            }, done);
        });
    });

    //recordID IS A BOOLEAN
    it("should give an error if the recordID is a boolean", function (done) {
        const expectedStatusCode = 400;
        const expectedStatusMessage = "Invalid recordID";
        this.timeout(5000);
        assert.doesNotThrow(function () {
            const recordID = true;
            const client = createDefaultB2ShareClient();
            client.getSpecificRecord(recordID, function (err, body) {
                assert.equal(body.statusCode, expectedStatusCode);
                assert.equal(body.statusMessage, expectedStatusMessage);
                done();
            }, done);
        });
    });

    //recordID IS A NUMBER
    it("should give an error if the recordID is a number", function (done) {
        const expectedStatusCode = 400;
        const expectedStatusMessage = "Invalid recordID";
        this.timeout(5000);
        assert.doesNotThrow(function () {
            const recordID = 1;
            const client = createDefaultB2ShareClient();
            client.getSpecificRecord(recordID, function (err, body) {
                assert.equal(body.statusCode, expectedStatusCode);
                assert.equal(body.statusMessage, expectedStatusMessage);
                done();
            }, done);
        });
    });

    //recordID IS A STRING OF LENGTH INFERIOR TO 1
    it("should give an error if the recordID is a string of length inferior to 1", function (done) {
        const expectedStatusCode = 400;
        const expectedStatusMessage = "Invalid recordID";
        this.timeout(5000);
        assert.doesNotThrow(function () {
            const recordID = "";
            const client = createDefaultB2ShareClient();
            client.getSpecificRecord(recordID, function (err, body) {
                assert.equal(body.statusCode, expectedStatusCode);
                assert.equal(body.statusMessage, expectedStatusMessage);
                done();
            }, done);
        });
    });
});

describe("getSpecificRecord with success", function () {
    //recordID is a string
    it("should get a specific record with success if the B2share client is properly created and if the recordID given is valid", function (done) {
        const expectedStatusCode = 200;
        const expectedStatusMessage = "OK";
        this.timeout(5000);
        assert.doesNotThrow(function () {
            const recordID = "a1c2ef96a1e446fa9bd7a2a46d2242d4";
            const client = createDefaultB2ShareClient();
            client.getSpecificRecord(recordID, function (err, body) {
                assert.equal(body.statusCode, expectedStatusCode);
                assert.equal(body.statusMessage, expectedStatusMessage);
                expect(body.data).to.be.an("object");
                done();
            }, done);
        });
    });
});

describe("createADraftRecord with error", function () {
    //data IS NULL
    it("should give an error if data is null", function (done) {
        const expectedStatusCode = 400;
        const expectedStatusMessage = "Invalid 'data' JSON object";
        this.timeout(5000);
        assert.doesNotThrow(function () {
            const data = null;
            const client = createDefaultB2ShareClient();
            client.createADraftRecord(data, function (err, body) {
                assert.equal(body.statusCode, expectedStatusCode);
                assert.equal(body.statusMessage, expectedStatusMessage);
                done();
            }, done);
        });
    });

    //data IS UNDEFINED
    it("should give an error if data is undefined", function (done) {
        const expectedStatusCode = 400;
        const expectedStatusMessage = "Invalid 'data' JSON object";
        this.timeout(5000);
        assert.doesNotThrow(function () {
            const data = undefined;
            const client = createDefaultB2ShareClient();
            client.createADraftRecord(data, function (err, body) {
                assert.equal(body.statusCode, expectedStatusCode);
                assert.equal(body.statusMessage, expectedStatusMessage);
                done();
            }, done);
        });
    });

    //data IS A BOOLEAN
    it("should give an error if data is a boolean", function (done) {
        const expectedStatusCode = 400;
        const expectedStatusMessage = "Invalid 'data' JSON object";
        this.timeout(5000);
        assert.doesNotThrow(function () {
            const data = true;
            const client = createDefaultB2ShareClient();
            client.createADraftRecord(data, function (err, body) {
                assert.equal(body.statusCode, expectedStatusCode);
                assert.equal(body.statusMessage, expectedStatusMessage);
                done();
            }, done);
        });
    });

    //data IS A NUMBER
    it("should give an error if data is a number", function (done) {
        const expectedStatusCode = 400;
        const expectedStatusMessage = "Invalid 'data' JSON object";
        this.timeout(5000);
        assert.doesNotThrow(function () {
            const data = 1;
            const client = createDefaultB2ShareClient();
            client.createADraftRecord(data, function (err, body) {
                assert.equal(body.statusCode, expectedStatusCode);
                assert.equal(body.statusMessage, expectedStatusMessage);
                done();
            }, done);
        });
    });

    //data IS A STRING
    it("should give an error if data is a string", function (done) {
        const expectedStatusCode = 400;
        const expectedStatusMessage = "Invalid 'data' JSON object";
        this.timeout(5000);
        assert.doesNotThrow(function () {
            const data = "This is a string";
            const client = createDefaultB2ShareClient();
            client.createADraftRecord(data, function (err, body) {
                assert.equal(body.statusCode, expectedStatusCode);
                assert.equal(body.statusMessage, expectedStatusMessage);
                done();
            }, done);
        });
    });

    //data IS AN ARRAY
    it("should give an error if data is an array", function (done) {
        const expectedStatusCode = 400;
        const expectedStatusMessage = "Invalid 'data' JSON object";
        this.timeout(5000);
        assert.doesNotThrow(function () {
            const data = ["1", "2"];
            const client = createDefaultB2ShareClient();
            client.createADraftRecord(data, function (err, body) {
                assert.equal(body.statusCode, expectedStatusCode);
                assert.equal(body.statusMessage, expectedStatusMessage);
                done();
            }, done);
        });
    });
});

describe("createADraftRecord with success", function () {
    //data is a valid JSON with the required fields for B2SHARE
    it("Should create a draft record with success if the B2Share client was properly created and the data is a valid JSON object", function (done) {
        const expectedStatusCode = 201;
        const expectedStatusMessage = "CREATED";
        this.timeout(5000);
        assert.doesNotThrow(function () {
            const data = {"titles":[{"title":"NEWTESTFIXE"}], "community":"e9b9792e-79fb-4b07-b6b4-b9c2bd06d095", "open_access":true, "community_specific": {}};
            const client = createDefaultB2ShareClient();
            client.createADraftRecord(data, function (err, body) {
                assert.equal(body.statusCode, expectedStatusCode);
                assert.equal(body.statusMessage, expectedStatusMessage);
                expect(body.data).to.be.an("object");
                done();
            }, done);
        });
    });
});

describe("uploadFileIntoDraftRecord with error", function () {
    //info IS NULL
    it("should give an error if the info is null", function (done) {
        this.timeout(5000);
        const expectedStatusCode = 400;
        const expectedStatusMessage = "Invalid 'info' JSON object, must contain 'fileBucketID' and 'absFilePath' fields";
        assert.doesNotThrow(function () {
            const info = null;
            const client = createDefaultB2ShareClient();
            client.uploadFileIntoDraftRecord(info, function (err, body) {
                assert.equal(body.statusCode, expectedStatusCode);
                assert.equal(body.statusMessage, expectedStatusMessage);
                done();
            }, done);
        });
    });

    //info IS UNDEFINED
    it("should give an error if the info is undefined", function (done) {
        this.timeout(5000);
        const expectedStatusCode = 400;
        const expectedStatusMessage = "Invalid 'info' JSON object, must contain 'fileBucketID' and 'absFilePath' fields";
        assert.doesNotThrow(function () {
            const info = undefined;
            const client = createDefaultB2ShareClient();
            client.uploadFileIntoDraftRecord(info, function (err, body) {
                assert.equal(body.statusCode, expectedStatusCode);
                assert.equal(body.statusMessage, expectedStatusMessage);
                done();
            }, done);
        });
    });

    //info IS A BOOLEAN
    it("should give an error if the info is a boolean", function (done) {
        this.timeout(5000);
        const expectedStatusCode = 400;
        const expectedStatusMessage = "Invalid 'info' JSON object, must contain 'fileBucketID' and 'absFilePath' fields";
        assert.doesNotThrow(function () {
            const info = true;
            const client = createDefaultB2ShareClient();
            client.uploadFileIntoDraftRecord(info, function (err, body) {
                assert.equal(body.statusCode, expectedStatusCode);
                assert.equal(body.statusMessage, expectedStatusMessage);
                done();
            }, done);
        });
    });

    //info IS A NUMBER
    it("should give an error if the info is a number", function (done) {
        this.timeout(5000);
        const expectedStatusCode = 400;
        const expectedStatusMessage = "Invalid 'info' JSON object, must contain 'fileBucketID' and 'absFilePath' fields";
        assert.doesNotThrow(function () {
            const info = 1;
            const client = createDefaultB2ShareClient();
            client.uploadFileIntoDraftRecord(info, function (err, body) {
                assert.equal(body.statusCode, expectedStatusCode);
                assert.equal(body.statusMessage, expectedStatusMessage);
                done();
            }, done);
        });
    });

    //info IS A STRING
    it("should give an error if the info is a string", function (done) {
        this.timeout(5000);
        const expectedStatusCode = 400;
        const expectedStatusMessage = "Invalid 'info' JSON object, must contain 'fileBucketID' and 'absFilePath' fields";
        assert.doesNotThrow(function () {
            const info = "This is a string";
            const client = createDefaultB2ShareClient();
            client.uploadFileIntoDraftRecord(info, function (err, body) {
                assert.equal(body.statusCode, expectedStatusCode);
                assert.equal(body.statusMessage, expectedStatusMessage);
                done();
            }, done);
        });
    });

    //info IS A JSON but fileBucketID and absFilePath are null
    it("should give an error if the info is a JSON object but fileBucketID and absFilePath are null", function (done) {
        this.timeout(5000);
        const expectedStatusCode = 400;
        const expectedStatusMessage = "Invalid 'info' JSON object, must contain 'fileBucketID' and 'absFilePath' fields";
        assert.doesNotThrow(function () {
            const info = {fileBucketID: null, absFilePath: null};
            const client = createDefaultB2ShareClient();
            client.uploadFileIntoDraftRecord(info, function (err, body) {
                assert.equal(body.statusCode, expectedStatusCode);
                assert.equal(body.statusMessage, expectedStatusMessage);
                done();
            }, done);
        });
    });

    //info IS A JSON but fileBucketID and absFilePath are UNDEFINED
    it("should give an error if the info is a JSON object but fileBucketID and absFilePath are undefined", function (done) {
        this.timeout(5000);
        const expectedStatusCode = 400;
        const expectedStatusMessage = "Invalid 'info' JSON object, must contain 'fileBucketID' and 'absFilePath' fields";
        assert.doesNotThrow(function () {
            const info = {fileBucketID: undefined, absFilePath: undefined};
            const client = createDefaultB2ShareClient();
            client.uploadFileIntoDraftRecord(info, function (err, body) {
                assert.equal(body.statusCode, expectedStatusCode);
                assert.equal(body.statusMessage, expectedStatusMessage);
                done();
            }, done);
        });
    });

    //info IS A JSON but fileBucketID and absFilePath are BOOLEANS
    it("should give an error if the info is a JSON object but fileBucketID and absFilePath are booleans", function (done) {
        this.timeout(5000);
        const expectedStatusCode = 400;
        const expectedStatusMessage = "Invalid 'info' JSON object, must contain 'fileBucketID' and 'absFilePath' fields";
        assert.doesNotThrow(function () {
            const info = {fileBucketID: true, absFilePath: true};
            const client = createDefaultB2ShareClient();
            client.uploadFileIntoDraftRecord(info, function (err, body) {
                assert.equal(body.statusCode, expectedStatusCode);
                assert.equal(body.statusMessage, expectedStatusMessage);
                done();
            }, done);
        });
    });

    //info IS A JSON but fileBucketID and absFilePath are NUMBERS
    it("should give an error if the info is a JSON object but fileBucketID and absFilePath are numbers", function (done) {
        this.timeout(5000);
        const expectedStatusCode = 400;
        const expectedStatusMessage = "Invalid 'info' JSON object, must contain 'fileBucketID' and 'absFilePath' fields";
        assert.doesNotThrow(function () {
            const info = {fileBucketID: 1, absFilePath: 1};
            const client = createDefaultB2ShareClient();
            client.uploadFileIntoDraftRecord(info, function (err, body) {
                assert.equal(body.statusCode, expectedStatusCode);
                assert.equal(body.statusMessage, expectedStatusMessage);
                done();
            }, done);
        });
    });

    //info IS A JSON but fileBucketID and absFilePath are STRINGS BUT WITH LENGTH INFERIOR TO 1
    it("should give an error if the info is a JSON object but fileBucketID and absFilePath are strings but with length inferior to 1", function (done) {
        this.timeout(5000);
        const expectedStatusCode = 400;
        const expectedStatusMessage = "Invalid 'info' JSON object, must contain 'fileBucketID' and 'absFilePath' fields";
        assert.doesNotThrow(function () {
            const info = {fileBucketID: "", absFilePath: ""};
            const client = createDefaultB2ShareClient();
            client.uploadFileIntoDraftRecord(info, function (err, body) {
                assert.equal(body.statusCode, expectedStatusCode);
                assert.equal(body.statusMessage, expectedStatusMessage);
                done();
            }, done);
        });
    });

    //info IS A JSON but fileBucketID IS null
    it("should give an error if the info is a JSON object but fileBucketID is null", function (done) {
        this.timeout(5000);
        const expectedStatusCode = 400;
        const expectedStatusMessage = "Invalid 'info' JSON object, must contain 'fileBucketID' and 'absFilePath' fields";
        assert.doesNotThrow(function () {
            const info = {fileBucketID: null, absFilePath: testFileAbsLocation};
            const client = createDefaultB2ShareClient();
            client.uploadFileIntoDraftRecord(info, function (err, body) {
                assert.equal(body.statusCode, expectedStatusCode);
                assert.equal(body.statusMessage, expectedStatusMessage);
                done();
            }, done);
        });
    });

    //info IS A JSON but fileBucketID IS UNDEFINED
    it("should give an error if the info is a JSON object but fileBucketID is undefined", function (done) {
        this.timeout(5000);
        const expectedStatusCode = 400;
        const expectedStatusMessage = "Invalid 'info' JSON object, must contain 'fileBucketID' and 'absFilePath' fields";
        assert.doesNotThrow(function () {
            const info = {fileBucketID: undefined, absFilePath: testFileAbsLocation};
            const client = createDefaultB2ShareClient();
            client.uploadFileIntoDraftRecord(info, function (err, body) {
                assert.equal(body.statusCode, expectedStatusCode);
                assert.equal(body.statusMessage, expectedStatusMessage);
                done();
            }, done);
        });
    });

    //info IS A JSON but fileBucketID IS A BOOLEAN
    it("should give an error if the info is a JSON object but fileBucketID is a boolean", function (done) {
        this.timeout(5000);
        const expectedStatusCode = 400;
        const expectedStatusMessage = "Invalid 'info' JSON object, must contain 'fileBucketID' and 'absFilePath' fields";
        assert.doesNotThrow(function () {
            const info = {fileBucketID: true, absFilePath: testFileAbsLocation};
            const client = createDefaultB2ShareClient();
            client.uploadFileIntoDraftRecord(info, function (err, body) {
                assert.equal(body.statusCode, expectedStatusCode);
                assert.equal(body.statusMessage, expectedStatusMessage);
                done();
            }, done);
        });
    });

    //info IS A JSON but fileBucketID IS A NUMBER
    it("should give an error if the info is a JSON object but fileBucketID is a number", function (done) {
        this.timeout(5000);
        const expectedStatusCode = 400;
        const expectedStatusMessage = "Invalid 'info' JSON object, must contain 'fileBucketID' and 'absFilePath' fields";
        assert.doesNotThrow(function () {
            const info = {fileBucketID: 1, absFilePath: testFileAbsLocation};
            const client = createDefaultB2ShareClient();
            client.uploadFileIntoDraftRecord(info, function (err, body) {
                assert.equal(body.statusCode, expectedStatusCode);
                assert.equal(body.statusMessage, expectedStatusMessage);
                done();
            }, done);
        });
    });

    //info IS A JSON but fileBucketID IS A STRING BUT WITH LENGTH INFERIOR TO 1
    it("should give an error if the info is a JSON object but fileBucketID is a number", function (done) {
        this.timeout(5000);
        const expectedStatusCode = 400;
        const expectedStatusMessage = "Invalid 'info' JSON object, must contain 'fileBucketID' and 'absFilePath' fields";
        assert.doesNotThrow(function () {
            const info = {fileBucketID: "", absFilePath: testFileAbsLocation};
            const client = createDefaultB2ShareClient();
            client.uploadFileIntoDraftRecord(info, function (err, body) {
                assert.equal(body.statusCode, expectedStatusCode);
                assert.equal(body.statusMessage, expectedStatusMessage);
                done();
            }, done);
        });
    });


    //info IS A JSON but absFilePath IS null
    it("should give an error if the info is a JSON object but absFilePath is null", function (done) {
        this.timeout(5000);
        const expectedStatusCode = 400;
        const expectedStatusMessage = "Invalid 'info' JSON object, must contain 'fileBucketID' and 'absFilePath' fields";
        assert.doesNotThrow(function () {
            const info = {fileBucketID: "ThisIsAFileBucketID", absFilePath: null};
            const client = createDefaultB2ShareClient();
            client.uploadFileIntoDraftRecord(info, function (err, body) {
                assert.equal(body.statusCode, expectedStatusCode);
                assert.equal(body.statusMessage, expectedStatusMessage);
                done();
            }, done);
        });
    });

    //info IS A JSON but absFilePath IS UNDEFINED
    it("should give an error if the info is a JSON object but absFilePath is undefined", function (done) {
        this.timeout(5000);
        const expectedStatusCode = 400;
        const expectedStatusMessage = "Invalid 'info' JSON object, must contain 'fileBucketID' and 'absFilePath' fields";
        assert.doesNotThrow(function () {
            const info = {fileBucketID: "ThisIsAFileBucketID", absFilePath: undefined};
            const client = createDefaultB2ShareClient();
            client.uploadFileIntoDraftRecord(info, function (err, body) {
                assert.equal(body.statusCode, expectedStatusCode);
                assert.equal(body.statusMessage, expectedStatusMessage);
                done();
            }, done);
        });
    });


    //info IS A JSON but absFilePath IS A BOOLEAN
    it("should give an error if the info is a JSON object but absFilePath is a boolean", function (done) {
        this.timeout(5000);
        const expectedStatusCode = 400;
        const expectedStatusMessage = "Invalid 'info' JSON object, must contain 'fileBucketID' and 'absFilePath' fields";
        assert.doesNotThrow(function () {
            const info = {fileBucketID: "ThisIsAFileBucketID", absFilePath: true};
            const client = createDefaultB2ShareClient();
            client.uploadFileIntoDraftRecord(info, function (err, body) {
                assert.equal(body.statusCode, expectedStatusCode);
                assert.equal(body.statusMessage, expectedStatusMessage);
                done();
            }, done);
        });
    });

    //info IS A JSON but absFilePath IS A NUMBER
    it("should give an error if the info is a JSON object but absFilePath is a number", function (done) {
        this.timeout(5000);
        const expectedStatusCode = 400;
        const expectedStatusMessage = "Invalid 'info' JSON object, must contain 'fileBucketID' and 'absFilePath' fields";
        assert.doesNotThrow(function () {
            const info = {fileBucketID: "ThisIsAFileBucketID", absFilePath: 1};
            const client = createDefaultB2ShareClient();
            client.uploadFileIntoDraftRecord(info, function (err, body) {
                assert.equal(body.statusCode, expectedStatusCode);
                assert.equal(body.statusMessage, expectedStatusMessage);
                done();
            }, done);
        });
    });

    //info IS A JSON but absFilePath IS A STRING BUT WITH LENGTH INFERIOR TO 1
    it("should give an error if the info is a JSON object but absFilePath is a string but with length inferior to 1", function (done) {
        this.timeout(5000);
        const expectedStatusCode = 400;
        const expectedStatusMessage = "Invalid 'info' JSON object, must contain 'fileBucketID' and 'absFilePath' fields";
        assert.doesNotThrow(function () {
            const info = {fileBucketID: "ThisIsAFileBucketID", absFilePath: ""};
            const client = createDefaultB2ShareClient();
            client.uploadFileIntoDraftRecord(info, function (err, body) {
                assert.equal(body.statusCode, expectedStatusCode);
                assert.equal(body.statusMessage, expectedStatusMessage);
                done();
            }, done);
        });
    });


    //info IS A JSON BUT absFilePath IS THE ABSOLUTE FILE PATH OF A FILE THAT DOES NOT EXIST
    it("should give an error if the info is a JSON object but absFilePath is the absolute file path of a file that does not exist", function (done) {
        this.timeout(5000);
        const expectedStatusCode = 400;
        const expectedStatusMessage = "Invalid 'info' JSON object, must contain 'fileBucketID' and 'absFilePath' fields";
        assert.doesNotThrow(function () {
            const info = {fileBucketID: "ThisIsAFileBucketID", absFilePath: "this is a file that does not exist"};
            const client = createDefaultB2ShareClient();
            client.uploadFileIntoDraftRecord(info, function (err, body) {
                assert.equal(body.statusCode, expectedStatusCode);
                assert.equal(body.statusMessage, expectedStatusMessage);
                done();
            }, done);
        });
    });
});

describe("uploadFileIntoDraftRecord with success", function () {
    //info IS A VALID JSON with properties fileBucketID(a string of min length of 1) and absFilePath(a string of min length of 1)
    it("should uploadFileIntoDraftRecord with success if the B2Share client is created properly and info is a valid JSON object with the required fields", function (done) {
        this.timeout(5000);
        const expectedStatusCode = 200;
        const expectedStatusMessage = "OK";
        createDefaultB2ShareDraft(function (err, info) {
            expect(err).to.not.equal(true);
            expect(bucketUrlToListFiles).to.not.equal(null);
            fileBucketID = bucketUrlToListFiles.split("/").pop();
            expect(fileBucketID).to.not.equal(null);
            assert.doesNotThrow(function () {
                const info = {"fileBucketID":fileBucketID, "absFilePath": testFileAbsLocation};
                const client = createDefaultB2ShareClient();
                client.uploadFileIntoDraftRecord(info, function (err, body) {
                    assert.equal(body.statusCode, expectedStatusCode);
                    assert.equal(body.statusMessage, expectedStatusMessage);
                    expect(body.data).to.be.an("object");
                    done();
                }, done);
            });
        });
    });
});

describe("listUploadedFilesInRecord with error", function () {
    //fileBucketID IS NULL
    it("should give an error if fileBucketID is null", function (done) {
        const expectedStatusCode = 400;
        const expectedStatusMessage = "Invalid fileBucketID";
        this.timeout(5000);
        assert.doesNotThrow(function () {
            const client = createDefaultB2ShareClient();
            let testFileBucketID = null;
            client.listUploadedFilesInRecord(testFileBucketID, function (err, body) {
                assert.equal(body.statusCode, expectedStatusCode);
                assert.equal(body.statusMessage, expectedStatusMessage);
                done();
            }, done);
        });
    });

    //fileBucketID IS UNDEFINED
    it("should give an error if fileBucketID is undefined", function (done) {
        const expectedStatusCode = 400;
        const expectedStatusMessage = "Invalid fileBucketID";
        this.timeout(5000);
        assert.doesNotThrow(function () {
            const client = createDefaultB2ShareClient();
            let testFileBucketID = undefined;
            client.listUploadedFilesInRecord(testFileBucketID, function (err, body) {
                assert.equal(body.statusCode, expectedStatusCode);
                assert.equal(body.statusMessage, expectedStatusMessage);
                done();
            }, done);
        });
    });

    //fileBucketID IS A BOOLEAN
    it("should give an error if fileBucketID is a boolean", function (done) {
        const expectedStatusCode = 400;
        const expectedStatusMessage = "Invalid fileBucketID";
        this.timeout(5000);
        assert.doesNotThrow(function () {
            const client = createDefaultB2ShareClient();
            let testFileBucketID = true;
            client.listUploadedFilesInRecord(testFileBucketID, function (err, body) {
                assert.equal(body.statusCode, expectedStatusCode);
                assert.equal(body.statusMessage, expectedStatusMessage);
                done();
            }, done);
        });
    });

    //fileBucketID IS A NUMBER
    it("should give an error if fileBucketID is a number", function (done) {
        const expectedStatusCode = 400;
        const expectedStatusMessage = "Invalid fileBucketID";
        this.timeout(5000);
        assert.doesNotThrow(function () {
            const client = createDefaultB2ShareClient();
            let testFileBucketID = 1;
            client.listUploadedFilesInRecord(testFileBucketID, function (err, body) {
                assert.equal(body.statusCode, expectedStatusCode);
                assert.equal(body.statusMessage, expectedStatusMessage);
                done();
            }, done);
        });
    });

    //fileBucketID IS A STRING OF LENGTH INFERIOR TO 1
    it("should give an error if fileBucketID is a string of length inferior to 1", function (done) {
        const expectedStatusCode = 400;
        const expectedStatusMessage = "Invalid fileBucketID";
        this.timeout(5000);
        assert.doesNotThrow(function () {
            const client = createDefaultB2ShareClient();
            let testFileBucketID = "";
            client.listUploadedFilesInRecord(testFileBucketID, function (err, body) {
                assert.equal(body.statusCode, expectedStatusCode);
                assert.equal(body.statusMessage, expectedStatusMessage);
                done();
            }, done);
        });
    });
});

describe("listUploadedFilesInRecord with success", function () {
    it("should listUploadedFilesInRecord with success if the B2Share client is properly created and fileBucketID is a valid file bucket id", function (done) {
        const expectedStatusCode = 200;
        const expectedStatusMessage = "OK";
        this.timeout(5000);
        assert.doesNotThrow(function () {
            const client = createDefaultB2ShareClient();
            uploadFileIntoDefaultB2shareDraft(function (err, info) {
                expect(err).to.not.equal(true);
                expect(fileBucketID).to.not.equal(null);
                client.listUploadedFilesInRecord(fileBucketID, function (err, body) {
                    assert.equal(body.statusCode, expectedStatusCode);
                    assert.equal(body.statusMessage, expectedStatusMessage);
                    expect(body.data).to.be.an("object");
                    done();
                }, done);
            });
        });
    });
});

describe("updateDraftRecordMetadata with error", function () {
    //recordIDToUpdate and jsonPatchFormatData is null
    it("should give an error if recordIDToUpdate and jsonPatchFormatData is null", function (done) {
        const expectedStatusCode = 400;
        const expectedStatusMessage = "Must supply a valid recordID and jsonPatchFormatData";
        this.timeout(5000);
        const testJsonPatchFormatData = null;
        const testRecordIDToUpdate = null;
        assert.doesNotThrow(function () {
            const client = createDefaultB2ShareClient();
            client.updateDraftRecordMetadata(testRecordIDToUpdate, testJsonPatchFormatData, function (err, body) {
                assert.equal(body.statusCode, expectedStatusCode);
                assert.equal(body.statusMessage, expectedStatusMessage);
                done();
            }, done);
        });
    });

    //recordIDToUpdate and jsonPatchFormatData is undefined
    it("should give an error if recordIDToUpdate and jsonPatchFormatData is undefined", function (done) {
        const expectedStatusCode = 400;
        const expectedStatusMessage = "Must supply a valid recordID and jsonPatchFormatData";
        this.timeout(5000);
        const testJsonPatchFormatData = undefined;
        const testRecordIDToUpdate = undefined;
        assert.doesNotThrow(function () {
            const client = createDefaultB2ShareClient();
            client.updateDraftRecordMetadata(testRecordIDToUpdate, testJsonPatchFormatData, function (err, body) {
                assert.equal(body.statusCode, expectedStatusCode);
                assert.equal(body.statusMessage, expectedStatusMessage);
                done();
            }, done);
        });
    });

    //recordIDToUpdate and jsonPatchFormatData is BOOLEAN
    it("should give an error if recordIDToUpdate and jsonPatchFormatData is Boolean", function (done) {
        const expectedStatusCode = 400;
        const expectedStatusMessage = "Must supply a valid recordID and jsonPatchFormatData";
        this.timeout(5000);
        const testJsonPatchFormatData = true;
        const testRecordIDToUpdate = true;
        assert.doesNotThrow(function () {
            const client = createDefaultB2ShareClient();
            client.updateDraftRecordMetadata(testRecordIDToUpdate, testJsonPatchFormatData, function (err, body) {
                assert.equal(body.statusCode, expectedStatusCode);
                assert.equal(body.statusMessage, expectedStatusMessage);
                done();
            }, done);
        });
    });

    //recordIDToUpdate and jsonPatchFormatData is a NUMBER
    it("should give an error if recordIDToUpdate and jsonPatchFormatData is a number", function (done) {
        const expectedStatusCode = 400;
        const expectedStatusMessage = "Must supply a valid recordID and jsonPatchFormatData";
        this.timeout(5000);
        const testJsonPatchFormatData = 1;
        const testRecordIDToUpdate = 1;
        assert.doesNotThrow(function () {
            const client = createDefaultB2ShareClient();
            client.updateDraftRecordMetadata(testRecordIDToUpdate, testJsonPatchFormatData, function (err, body) {
                assert.equal(body.statusCode, expectedStatusCode);
                assert.equal(body.statusMessage, expectedStatusMessage);
                done();
            }, done);
        });
    });

    //recordIDToUpdate is a String of length inferior to 1 and jsonPatchFormatData is a String
    it("should give an error if recordIDToUpdate is a String of length inferior to 1 and jsonPatchFormatData is a String", function (done) {
        const expectedStatusCode = 400;
        const expectedStatusMessage = "Must supply a valid recordID and jsonPatchFormatData";
        this.timeout(5000);
        const testJsonPatchFormatData = "this is a test string";
        const testRecordIDToUpdate = "";
        assert.doesNotThrow(function () {
            const client = createDefaultB2ShareClient();
            client.updateDraftRecordMetadata(testRecordIDToUpdate, testJsonPatchFormatData, function (err, body) {
                assert.equal(body.statusCode, expectedStatusCode);
                assert.equal(body.statusMessage, expectedStatusMessage);
                done();
            }, done);
        });
    });

    //recordIDToUpdate IS NULL
    it("should give an error if recordIDToUpdate IS NULL", function (done) {
        const expectedStatusCode = 400;
        const expectedStatusMessage = "Must supply a valid recordID and jsonPatchFormatData";
        this.timeout(5000);
        const testJsonPatchFormatData = [
            { "op": "replace", "path": "/titles/0/title", "value": "TESTEBONITO2" }
        ];
        const testRecordIDToUpdate = null;
        assert.doesNotThrow(function () {
            const client = createDefaultB2ShareClient();
            client.updateDraftRecordMetadata(testRecordIDToUpdate, testJsonPatchFormatData, function (err, body) {
                assert.equal(body.statusCode, expectedStatusCode);
                assert.equal(body.statusMessage, expectedStatusMessage);
                done();
            }, done);
        });
    });


    //recordIDToUpdate is undefined
    it("should give an error if recordIDToUpdate is undefined", function (done) {
        const expectedStatusCode = 400;
        const expectedStatusMessage = "Must supply a valid recordID and jsonPatchFormatData";
        this.timeout(5000);
        const testJsonPatchFormatData = [
            { "op": "replace", "path": "/titles/0/title", "value": "TESTEBONITO2" }
        ];
        const testRecordIDToUpdate = undefined;
        assert.doesNotThrow(function () {
            const client = createDefaultB2ShareClient();
            client.updateDraftRecordMetadata(testRecordIDToUpdate, testJsonPatchFormatData, function (err, body) {
                assert.equal(body.statusCode, expectedStatusCode);
                assert.equal(body.statusMessage, expectedStatusMessage);
                done();
            }, done);
        });
    });

    //recordIDToUpdate IS a BOOLEAN
    it("should give an error if recordIDToUpdate is a boolean", function (done) {
        const expectedStatusCode = 400;
        const expectedStatusMessage = "Must supply a valid recordID and jsonPatchFormatData";
        this.timeout(5000);
        const testJsonPatchFormatData = [
            { "op": "replace", "path": "/titles/0/title", "value": "TESTEBONITO2" }
        ];
        const testRecordIDToUpdate = true;
        assert.doesNotThrow(function () {
            const client = createDefaultB2ShareClient();
            client.updateDraftRecordMetadata(testRecordIDToUpdate, testJsonPatchFormatData, function (err, body) {
                assert.equal(body.statusCode, expectedStatusCode);
                assert.equal(body.statusMessage, expectedStatusMessage);
                done();
            }, done);
        });
    });

    //recordIDToUpdate IS A NUMBER
    it("should give an error if recordIDToUpdate is a number", function (done) {
        const expectedStatusCode = 400;
        const expectedStatusMessage = "Must supply a valid recordID and jsonPatchFormatData";
        this.timeout(5000);
        const testJsonPatchFormatData = [
            { "op": "replace", "path": "/titles/0/title", "value": "TESTEBONITO2" }
        ];
        const testRecordIDToUpdate = 1;
        assert.doesNotThrow(function () {
            const client = createDefaultB2ShareClient();
            client.updateDraftRecordMetadata(testRecordIDToUpdate, testJsonPatchFormatData, function (err, body) {
                assert.equal(body.statusCode, expectedStatusCode);
                assert.equal(body.statusMessage, expectedStatusMessage);
                done();
            }, done);
        });
    });

    //recordIDToUpdate IS STRING OF LENGTH INFERIOR TO 1
    it("should give an error if recordIDToUpdate IS STRING OF LENGTH INFERIOR TO 1", function (done) {
        const expectedStatusCode = 400;
        const expectedStatusMessage = "Must supply a valid recordID and jsonPatchFormatData";
        this.timeout(5000);
        const testJsonPatchFormatData = [
            { "op": "replace", "path": "/titles/0/title", "value": "TESTEBONITO2" }
        ];
        const testRecordIDToUpdate = "";
        assert.doesNotThrow(function () {
            const client = createDefaultB2ShareClient();
            client.updateDraftRecordMetadata(testRecordIDToUpdate, testJsonPatchFormatData, function (err, body) {
                assert.equal(body.statusCode, expectedStatusCode);
                assert.equal(body.statusMessage, expectedStatusMessage);
                done();
            }, done);
        });
    });

    //jsonPatchFormatData IS NULL
    it("should give an error if jsonPatchFormatData is null", function (done) {
        const expectedStatusCode = 400;
        const expectedStatusMessage = "Must supply a valid recordID and jsonPatchFormatData";
        this.timeout(5000);
        const testJsonPatchFormatData = null;
        const testRecordIDToUpdate = "thisIsAPossibleRecordID";
        assert.doesNotThrow(function () {
            const client = createDefaultB2ShareClient();
            client.updateDraftRecordMetadata(testRecordIDToUpdate, testJsonPatchFormatData, function (err, body) {
                assert.equal(body.statusCode, expectedStatusCode);
                assert.equal(body.statusMessage, expectedStatusMessage);
                done();
            }, done);
        });
    });

    //jsonPatchFormatData IS UNDEFINED
    it("should give an error if jsonPatchFormatData is undefined", function (done) {
        const expectedStatusCode = 400;
        const expectedStatusMessage = "Must supply a valid recordID and jsonPatchFormatData";
        this.timeout(5000);
        const testJsonPatchFormatData = undefined;
        const testRecordIDToUpdate = "thisIsAPossibleRecordID";
        assert.doesNotThrow(function () {
            const client = createDefaultB2ShareClient();
            client.updateDraftRecordMetadata(testRecordIDToUpdate, testJsonPatchFormatData, function (err, body) {
                assert.equal(body.statusCode, expectedStatusCode);
                assert.equal(body.statusMessage, expectedStatusMessage);
                done();
            }, done);
        });
    });

    //jsonPatchFormatData IS A BOOLEAN
    it("should give an error if jsonPatchFormatData is a boolean", function (done) {
        const expectedStatusCode = 400;
        const expectedStatusMessage = "Must supply a valid recordID and jsonPatchFormatData";
        this.timeout(5000);
        const testJsonPatchFormatData = true;
        const testRecordIDToUpdate = "thisIsAPossibleRecordID";
        assert.doesNotThrow(function () {
            const client = createDefaultB2ShareClient();
            client.updateDraftRecordMetadata(testRecordIDToUpdate, testJsonPatchFormatData, function (err, body) {
                assert.equal(body.statusCode, expectedStatusCode);
                assert.equal(body.statusMessage, expectedStatusMessage);
                done();
            }, done);
        });
    });

    //jsonPatchFormatData IS A NUMBER
    it("should give an error if jsonPatchFormatData is a number", function (done) {
        const expectedStatusCode = 400;
        const expectedStatusMessage = "Must supply a valid recordID and jsonPatchFormatData";
        this.timeout(5000);
        const testJsonPatchFormatData = 1;
        const testRecordIDToUpdate = "thisIsAPossibleRecordID";
        assert.doesNotThrow(function () {
            const client = createDefaultB2ShareClient();
            client.updateDraftRecordMetadata(testRecordIDToUpdate, testJsonPatchFormatData, function (err, body) {
                assert.equal(body.statusCode, expectedStatusCode);
                assert.equal(body.statusMessage, expectedStatusMessage);
                done();
            }, done);
        });
    });

    //jsonPatchFormatData IS A STRING
    it("should give an error if jsonPatchFormatData is a string", function (done) {
        const expectedStatusCode = 400;
        const expectedStatusMessage = "Must supply a valid recordID and jsonPatchFormatData";
        this.timeout(5000);
        const testJsonPatchFormatData = "This is a string";
        const testRecordIDToUpdate = "thisIsAPossibleRecordID";
        assert.doesNotThrow(function () {
            const client = createDefaultB2ShareClient();
            client.updateDraftRecordMetadata(testRecordIDToUpdate, testJsonPatchFormatData, function (err, body) {
                assert.equal(body.statusCode, expectedStatusCode);
                assert.equal(body.statusMessage, expectedStatusMessage);
                done();
            }, done);
        });
    });
});

describe("updateDraftRecordMetadata with success", function () {
    //jsonPatchFormatData IS A VALID jsonPatchFormatData
    it("should updateDraftRecordMetadata with success if the B2Share client was properly created and recordIDToUpdate and jsonPatchFormatData are valid", function (done) {
        const expectedStatusCode = 200;
        const expectedStatusMessage = "OK";
        this.timeout(5000);
        const jsonPatchFormatData = [
            { "op": "replace", "path": "/titles/0/title", "value": "TESTEBONITO2" }
        ];
        assert.doesNotThrow(function () {
            uploadFileIntoDefaultB2shareDraft(function (err, info) {
                expect(err).to.equal(null);
                expect(recordIDToUpdate).to.not.equal(null);
                const client = createDefaultB2ShareClient();
                client.updateDraftRecordMetadata(recordIDToUpdate, jsonPatchFormatData, function (err, body) {
                    assert.equal(body.statusCode, expectedStatusCode);
                    assert.equal(body.statusMessage, expectedStatusMessage);
                    expect(body.data).to.be.an("object");
                    done();
                }, done);
            });
        });
    });
});

describe("submitDraftRecordForPublication with error", function () {
    //recordIDToUpdate IS NULL
    it("should give an error if recordIDToUpdate is null", function (done) {
        const expectedStatusCode = 400;
        const expectedStatusMessage = "Invalid recordID";
        this.timeout(5000);
        assert.doesNotThrow(function () {
            const client = createDefaultB2ShareClient();
            const testRecordIDToUpdate = null;
            client.submitDraftRecordForPublication(testRecordIDToUpdate, function (err, body) {
                assert.equal(body.statusCode, expectedStatusCode);
                assert.equal(body.statusMessage, expectedStatusMessage);
                done();
            }, done);
        });
    });

    //recordIDToUpdate IS UNDEFINED
    it("should give an error if recordIDToUpdate is undefined", function (done) {
        const expectedStatusCode = 400;
        const expectedStatusMessage = "Invalid recordID";
        this.timeout(5000);
        assert.doesNotThrow(function () {
            const client = createDefaultB2ShareClient();
            const testRecordIDToUpdate = undefined;
            client.submitDraftRecordForPublication(testRecordIDToUpdate, function (err, body) {
                assert.equal(body.statusCode, expectedStatusCode);
                assert.equal(body.statusMessage, expectedStatusMessage);
                done();
            }, done);
        });
    });

    //recordIDToUpdate IS A BOOLEAN
    it("should give an error if recordIDToUpdate is a boolean", function (done) {
        const expectedStatusCode = 400;
        const expectedStatusMessage = "Invalid recordID";
        this.timeout(5000);
        assert.doesNotThrow(function () {
            const client = createDefaultB2ShareClient();
            const testRecordIDToUpdate = true;
            client.submitDraftRecordForPublication(testRecordIDToUpdate, function (err, body) {
                assert.equal(body.statusCode, expectedStatusCode);
                assert.equal(body.statusMessage, expectedStatusMessage);
                done();
            }, done);
        });
    });

    //recordIDToUpdate IS A NUMBER
    it("should give an error if recordIDToUpdate is a number", function (done) {
        const expectedStatusCode = 400;
        const expectedStatusMessage = "Invalid recordID";
        this.timeout(5000);
        assert.doesNotThrow(function () {
            const client = createDefaultB2ShareClient();
            const testRecordIDToUpdate = 1;
            client.submitDraftRecordForPublication(testRecordIDToUpdate, function (err, body) {
                assert.equal(body.statusCode, expectedStatusCode);
                assert.equal(body.statusMessage, expectedStatusMessage);
                done();
            }, done);
        });
    });

    //recordIDToUpdate IS A STRING WITH LENGTH LESS THEN 1
    it("should give an error if recordIDToUpdate IS A STRING WITH LENGTH LESS THEN 1", function (done) {
        const expectedStatusCode = 400;
        const expectedStatusMessage = "Invalid recordID";
        this.timeout(5000);
        assert.doesNotThrow(function () {
            const client = createDefaultB2ShareClient();
            const testRecordIDToUpdate = "";
            client.submitDraftRecordForPublication(testRecordIDToUpdate, function (err, body) {
                assert.equal(body.statusCode, expectedStatusCode);
                assert.equal(body.statusMessage, expectedStatusMessage);
                done();
            }, done);
        });
    });

});

describe("submitDraftRecordForPublication with success", function () {
    //recordIDToUpdate is valid
    it("should submitDraftRecordForPublication if the B2Share client is properly created and recordIDToUpdate is valid", function (done) {
        const expectedStatusCode = 200;
        const expectedStatusMessage = "OK";
        this.timeout(5000);
        assert.doesNotThrow(function () {
            const client = createDefaultB2ShareClient();
            uploadFileIntoDefaultB2shareDraft(function (err, info) {
                expect(err).to.equal(null);
                expect(recordIDToUpdate).to.not.equal(null);
                client.submitDraftRecordForPublication(recordIDToUpdate, function (err, body) {
                    assert.equal(body.statusCode, expectedStatusCode);
                    assert.equal(body.statusMessage, expectedStatusMessage);
                    expect(body.data).to.be.an("object");
                    done();
                }, done);
            });
        });
    });
});

/*
describe("#B2ShareClient functions with success", function () {
    let client;
    let recordIDToUpdate;
    let bucketUrlToListFiles;
    let fileBucketID;
    before(function () {
        const host = "trng-b2share.eudat.eu";
        const accessTokens = "MmGKBzjpdlT382lag38zxhsKttZDw9e7u6zZmzucVFUu1aYM5i55WpeUSgFE";
        client = new B2ShareClient(host, accessTokens);
    });
    it("listCommunities with success", function (done) {
        const expectedStatusCode = 200;
        this.timeout(5000);
        assert.doesNotThrow(function () {
            client.listCommunities(function (err, body) {
                assert.equal(body.statusCode, expectedStatusCode);
                done();
            }, done);
        });
    });

    it("getCommunitySchema with success", function (done) {
        const expectedStatusCode = 200;
        this.timeout(5000);

        assert.doesNotThrow(function () {
            const communityID = "0afede87-2bf2-4d89-867e-d2ee57251c62";
            client.getCommunitySchema(communityID, function (err, body) {
                assert.equal(body.statusCode, expectedStatusCode);
                done();
            }, done);
        });
    });

    it("listAllRecords with success", function (done) {
        const expectedStatusCode = 200;
        this.timeout(5000);

        assert.doesNotThrow(function () {
            client.listAllRecords(function (err, body) {
                assert.equal(body.statusCode, expectedStatusCode);
                done();
            }, done);
        });
    });

    it("listRecordsPerCommunity with success", function (done) {
        const expectedStatusCode = 200;
        this.timeout(5000);
        assert.doesNotThrow(function () {
            const communityID = "0afede87-2bf2-4d89-867e-d2ee57251c62";
            client.listRecordsPerCommunity(communityID,function (err, body) {
                assert.equal(body.statusCode, expectedStatusCode);
                done();
            }, done);
        });
    });

    it("searchRecords with success", function (done) {
        const expectedStatusCode = 200;
        this.timeout(5000);
        assert.doesNotThrow(function () {
            const queryString = "0afede87-2bf2-4d89-867e-d2ee57251c62";
            client.searchRecords(queryString,function (err, body) {
                assert.equal(body.statusCode, expectedStatusCode);
                done();
            }, done);
        });
    });

    it("searchDrafts with success", function (done) {
        const expectedStatusCode = 200;
        this.timeout(5000);
        assert.doesNotThrow(function () {
            client.searchDrafts(function (err, body) {
                assert.equal(body.statusCode, expectedStatusCode);
                done();
            }, done);
        });
    });

    it("getSpecificRecord with success", function (done) {
        const expectedStatusCode = 200;
        this.timeout(5000);
        assert.doesNotThrow(function () {
            const recordID = "a1c2ef96a1e446fa9bd7a2a46d2242d4";
            client.getSpecificRecord(recordID, function (err, body) {
                assert.equal(body.statusCode, expectedStatusCode);
                done();
            }, done);
        });
    });

    it("createADraftRecord with success", function (done) {
        const expectedStatusCode = 201;
        this.timeout(5000);
        assert.doesNotThrow(function () {
            const data = {"titles":[{"title":"NEWTESTFIXE"}], "community":"e9b9792e-79fb-4b07-b6b4-b9c2bd06d095", "open_access":true, "community_specific": {}};
            client.createADraftRecord(data, function (err, body) {
                recordIDToUpdate = body.data.id;
                bucketUrlToListFiles = body.data.links.files;
                assert.equal(body.statusCode, expectedStatusCode);
                done();
            }, done);
        });
    });

    it("uploadFileIntoDraftRecord with success", function (done) {
        this.timeout(5000);
        const expectedStatusCode = 200;
        fileBucketID = bucketUrlToListFiles.split("/").pop();
        assert.doesNotThrow(function () {
            const info = {"fileBucketID":fileBucketID, "absFilePath": testFileAbsLocation};
            client.uploadFileIntoDraftRecord(info, function (err, body) {
                assert.equal(body.statusCode, expectedStatusCode);
                done();
            }, done);
        });
    });

    it("listUploadedFilesInRecord with success", function (done) {
        const expectedStatusCode = 200;
        this.timeout(5000);
        assert.doesNotThrow(function () {
            client.listUploadedFilesInRecord(fileBucketID, function (err, body) {
                assert.equal(body.statusCode, expectedStatusCode);
                done();
            }, done);
        });
    });


    it("updateDraftRecordMetadata with success", function (done) {
        const expectedStatusCode = 200;
        this.timeout(5000);
        const jsonPatchFormatData = [
            { "op": "replace", "path": "/titles/0/title", "value": "TESTEBONITO2" }
        ];
        assert.doesNotThrow(function () {
            client.updateDraftRecordMetadata(recordIDToUpdate, jsonPatchFormatData, function (err, body) {
                recordIDToUpdate = body.data.id;
                assert.equal(body.statusCode, expectedStatusCode);
                done();
            }, done);
        });
    });

    it("submitDraftRecordForPublication with success", function (done) {
        const expectedStatusCode = 200;
        this.timeout(5000);
        assert.doesNotThrow(function () {
            client.submitDraftRecordForPublication(recordIDToUpdate, function (err, body) {
                recordIDToUpdate = body.data.id;
                bucketUrlToListFiles = body.data.links.files;
                assert.equal(body.statusCode, expectedStatusCode);
                done();
            }, done);
        });
    });
});
*/


describe("#B2ShareClient with an invalid host", function () {
    let client;
    let recordIDToUpdate;
    let bucketUrlToListFiles;
    let fileBucketID;
    before(function () {
        const host = "Errortrng-b2share.eudat.eu";
        const accessTokens = "MmGKBzjpdlT382lag38zxhsKttZDw9e7u6zZmzucVFUu1aYM5i55WpeUSgFE";
        client = new B2ShareClient(host, accessTokens);
    });
    it("listCommunities Error", function (done) {
        const expectedStatusCode = 500;
        this.timeout(5000);

        assert.doesNotThrow(function () {
            client.listCommunities(function (err, body) {
                assert.equal(body.statusCode, expectedStatusCode);
                done();
            }, done);
        });

    });

    it("getCommunitySchema Error", function (done) {
        const expectedStatusCode = 500;
        this.timeout(5000);

        assert.doesNotThrow(function () {
            const communityID = "0afede87-2bf2-4d89-867e-d2ee57251c62";
            client.getCommunitySchema(communityID, function (err, body) {
                assert.equal(body.statusCode, expectedStatusCode);
                done();
            }, done);
        });

    });

    it("listAllRecords Error", function (done) {
        const expectedStatusCode = 500;
        this.timeout(5000);

        assert.doesNotThrow(function () {
            client.listAllRecords(function (err, body) {
                assert.equal(body.statusCode, expectedStatusCode);
                done();
            }, done);
        });

    });

    it("listRecordsPerCommunity Error", function (done) {
        const expectedStatusCode = 500;
        this.timeout(5000);

        assert.doesNotThrow(function () {
            const communityID = "0afede87-2bf2-4d89-867e-d2ee57251c62";
            client.listRecordsPerCommunity(communityID,function (err, body) {
                assert.equal(body.statusCode, expectedStatusCode);
                done();
            }, done);
        });

    });

    it("searchRecords Error", function (done) {
        const expectedStatusCode = 500;
        this.timeout(5000);

        assert.doesNotThrow(function () {
            const queryString = "0afede87-2bf2-4d89-867e-d2ee57251c62";
            client.searchRecords(queryString,function (err, body) {
                assert.equal(body.statusCode, expectedStatusCode);
                done();
            }, done);
        });

    });

    it("searchDrafts Error", function (done) {
        const expectedStatusCode = 500;
        this.timeout(5000);

        assert.doesNotThrow(function () {
            client.searchDrafts(function (err, body) {
                assert.equal(body.statusCode, expectedStatusCode);
                done();
            }, done);
        });

    });

    it("getSpecificRecord Error", function (done) {
        const expectedStatusCode = 500;
        this.timeout(5000);

        assert.doesNotThrow(function () {
            const recordID = "a1c2ef96a1e446fa9bd7a2a46d2242d4";
            client.getSpecificRecord(recordID, function (err, body) {
                assert.equal(body.statusCode, expectedStatusCode);
                done();
            }, done);
        });

    });

    it("createADraftRecord Error", function (done) {
        const expectedStatusCode = 500;
        this.timeout(5000);

        assert.doesNotThrow(function () {
            const data = {"titles":[{"title":"NEWTESTFIXE"}], "community":"e9b9792e-79fb-4b07-b6b4-b9c2bd06d095", "open_access":true, "community_specific": {}};
            client.createADraftRecord(data, function (err, body) {
                recordIDToUpdate = "12345";
                bucketUrlToListFiles = "thisIsForTestPurposes/123456";
                assert.equal(body.statusCode, expectedStatusCode);
                done();
            }, done);
        });

    });

    it("uploadFileIntoDraftRecord Error", function (done) {
        this.timeout(5000);
        const expectedStatusCode = 500;
        fileBucketID = bucketUrlToListFiles.split("/").pop();
        assert.doesNotThrow(function () {
            const info = {"fileBucketID":fileBucketID, "absFilePath": testFileAbsLocation};
            client.uploadFileIntoDraftRecord(info, function (err, body) {
                assert.equal(body.statusCode, expectedStatusCode);
                done();
            }, done);
        });
    });

    it("listUploadedFilesInRecord Error", function (done) {
        const expectedStatusCode = 500;
        this.timeout(5000);
        assert.doesNotThrow(function () {
            client.listUploadedFilesInRecord(fileBucketID, function (err, body) {
                assert.equal(body.statusCode, expectedStatusCode);
                done();
            }, done);
        });

    });


    it("updateDraftRecordMetadata Error", function (done) {
        const expectedStatusCode = 500;
        this.timeout(5000);
        const jsonPatchFormatData = [
            { "op": "replace", "path": "/titles/0/title", "value": "TESTEBONITO2" }
        ];

        assert.doesNotThrow(function () {
            client.updateDraftRecordMetadata(recordIDToUpdate, jsonPatchFormatData, function (err, body) {
                recordIDToUpdate = "12345";
                assert.equal(body.statusCode, expectedStatusCode);
                done();
            }, done);
        });

    });

    it("submitDraftRecordForPublication Error", function (done) {
        const expectedStatusCode = 500;
        this.timeout(5000);
        assert.doesNotThrow(function () {
            client.submitDraftRecordForPublication(recordIDToUpdate, function (err, body) {
                recordIDToUpdate = "12345";
                bucketUrlToListFiles = "thisIsForTestPurposes/12345";
                assert.equal(body.statusCode, expectedStatusCode);
                done();
            }, done);
        });

    });
});