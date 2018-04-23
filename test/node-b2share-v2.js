let chai = require("chai");
let assert = chai.assert,
    expect = chai.expect,
    B2ShareClient = require("../node-b2share-v2");


const createDefaultB2ShareClient = function () {
    const host = "trng-b2share.eudat.eu";
    const accessTokens = "MmGKBzjpdlT382lag38zxhsKttZDw9e7u6zZmzucVFUu1aYM5i55WpeUSgFE";
    return new B2ShareClient(host, accessTokens);
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

    //data IS A POSSIBLE JSON BUT AN EXCEPTION IS CAUGHT VIA JSON.parse
    //TODO HERE
    /*
    it("should give an error if data is a possible JSON but an exception is caught via JSON.parse", function (done) {
        const expectedStatusCode = 400;
        const expectedStatusMessage = "Invalid 'data' JSON object";
        this.timeout(5000);
        assert.doesNotThrow(function () {
            const data = {};
            const client = createDefaultB2ShareClient();
            client.createADraftRecord(data, function (err, body) {
                assert.equal(body.statusCode, expectedStatusCode);
                assert.equal(body.statusMessage, expectedStatusMessage);
                done();
            }, done);
        });
    });
    */
});

describe("createADraftRecord with success", function () {
    //data is a valid JSON with the required fields for B2SHARE
});

describe("uploadFileIntoDraftRecord with error", function () {
    //info IS NULL
    //info IS UNDEFINED
    //info IS A BOOLEAN
    //info IS A NUMBER
    //info IS A STRING
    //info IS A POSSIBLE JSON BUT AN EXCEPTION IS CAUGHT VIA JSON.parse
    //info IS A JSON but fileBucketID and absFilePath are null
    //info IS A JSON but fileBucketID and absFilePath are UNDEFINED
    //info IS A JSON but fileBucketID and absFilePath are BOOLEAN
    //info IS A JSON but fileBucketID and absFilePath are NUMBER
    //info IS A JSON but fileBucketID and absFilePath are STRINGS BUT WITH LENGTH INFERIOR TO 1

    //info IS A JSON but fileBucketID IS null
    //info IS A JSON but fileBucketID IS UNDEFINED
    //info IS A JSON but fileBucketID IS A BOOLEAN
    //info IS A JSON but fileBucketID IS A NUMBER
    //info IS A JSON but fileBucketID IS A STRING BUT WITH LENGTH INFERIOR TO 1

    //info IS A JSON but absFilePath IS null
    //info IS A JSON but absFilePath IS UNDEFINED
    //info IS A JSON but absFilePath IS A BOOLEAN
    //info IS A JSON but absFilePath IS A NUMBER
    //info IS A JSON but absFilePath IS A STRING BUT WITH LENGTH INFERIOR TO 1
});

describe("uploadFileIntoDraftRecord with success", function () {
    //info IS A VALID JSON with properties fileBucketID(a string of min length of 1) and absFilePath(a string of min length of 1)
});

describe("listUploadedFilesInRecord with error", function () {
    //fileBucketID IS NULL
    //fileBucketID IS UNDEFINED
    //fileBucketID IS A BOOLEAN
    //fileBucketID IS A NUMBER
    //fileBucketID IS A STRING OF LENGTH INFERIOR TO 1
});

describe("listUploadedFilesInRecord with success", function () {
    //fileBucketID IS A STRING OF LENGTH SUPERIOR TO 0
});

describe("updateDraftRecordMetadata with error", function () {
    //jsonPatchFormatData IS NULL
    //jsonPatchFormatData IS UNDEFINED
    //jsonPatchFormatData IS A BOOLEAN
    //jsonPatchFormatData IS A NUMBER
    //jsonPatchFormatData IS A STRING
});

describe("updateDraftRecordMetadata with success", function () {
    //jsonPatchFormatData IS A VALID jsonPatchFormatData
});

describe("submitDraftRecordForPublication with error", function () {
    //recordIDToUpdate IS NULL
    //recordIDToUpdate IS UNDEFINED
    //recordIDToUpdate IS A BOOLEAN
    //recordIDToUpdate IS A NUMBER
    //recordIDToUpdate IS A STRING WITH LENGTH LESS THEN 1
});

describe("submitDraftRecordForPublication with success", function () {
    //recordIDToUpdate IS A STRING WITH LENGTH SUPERIOR TO 0
});

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
            const info = {"fileBucketID":fileBucketID, "absFilePath": __dirname + "/testFile.txt"};
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
            const info = {"fileBucketID":fileBucketID, "absFilePath": __dirname + "/testFile.txt"};
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