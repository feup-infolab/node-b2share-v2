let assert = require("chai").assert,
    B2ShareClient = require("../node-b2share-v2");


describe("#B2ShareClient with success", function () {
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


describe("#B2ShareClient with errors", function () {
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