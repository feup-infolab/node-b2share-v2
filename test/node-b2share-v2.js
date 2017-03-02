var should = require('chai').should(),
    assert = require('chai').assert,
    fs = require('fs'),
    toArray = require('stream-to-array'),
    Stream = require('stream'),
    B2ShareClient = require('../node-b2share-v2');


describe('#B2ShareClient', function () {
    var client;
    var recordIDToUpdate;
    var bucketUrlToListFiles;
    var fileBucketID;
    before(function () {
        var host = 'trng-b2share.eudat.eu';
        var accessTokens = 'MmGKBzjpdlT382lag38zxhsKttZDw9e7u6zZmzucVFUu1aYM5i55WpeUSgFE';
        client = new B2ShareClient(host, accessTokens);
    });
    it('listCommunities with success', function (done) {
        var expectedStatusCode = '200';
        this.timeout(2000000);

        assert.doesNotThrow(function () {
            client.listCommunities(function (err, body) {
                assert.equal(body.statusCode, expectedStatusCode);
                done();
            }, done);
        });

    });

    it('getCommunitySchema with success', function (done) {
        var expectedStatusCode = '200';
        this.timeout(2000000);

        assert.doesNotThrow(function () {
            var communityID = '0afede87-2bf2-4d89-867e-d2ee57251c62';
            client.getCommunitySchema(communityID, function (err, body) {
                assert.equal(body.statusCode, expectedStatusCode);
                done();
            }, done);
        });

    });

    it('listAllRecords with success', function (done) {
        var expectedStatusCode = '200';
        this.timeout(2000000);

        assert.doesNotThrow(function () {
            client.listAllRecords(function (err, body) {
                assert.equal(body.statusCode, expectedStatusCode);
                done();
            }, done);
        });

    });

    it('listRecordsPerCommunity with success', function (done) {
        var expectedStatusCode = '200';
        this.timeout(2000000);

        assert.doesNotThrow(function () {
            var communityID = '0afede87-2bf2-4d89-867e-d2ee57251c62';
            client.listRecordsPerCommunity(communityID,function (err, body) {
                assert.equal(body.statusCode, expectedStatusCode);
                done();
            }, done);
        });

    });

    it('searchRecords with success', function (done) {
        var expectedStatusCode = '200';
        this.timeout(2000000);

        assert.doesNotThrow(function () {
            var queryString = '0afede87-2bf2-4d89-867e-d2ee57251c62';
            client.searchRecords(queryString,function (err, body) {
                assert.equal(body.statusCode, expectedStatusCode);
                done();
            }, done);
        });

    });

    it('searchDrafts with success', function (done) {
        var expectedStatusCode = '200';
        this.timeout(2000000);

        assert.doesNotThrow(function () {
            client.searchDrafts(function (err, body) {
                assert.equal(body.statusCode, expectedStatusCode);
                done();
            }, done);
        });

    });

    it('getSpecificRecord with success', function (done) {
        var expectedStatusCode = '200';
        this.timeout(2000000);

        assert.doesNotThrow(function () {
            var recordID = 'a1c2ef96a1e446fa9bd7a2a46d2242d4';
            client.getSpecificRecord(recordID, function (err, body) {
                assert.equal(body.statusCode, expectedStatusCode);
                done();
            }, done);
        });

    });

    it('createADraftRecord with success', function (done) {
        var expectedStatusCode = '201';
        this.timeout(2000000);

        assert.doesNotThrow(function () {
            //var data = {"titles":[{"title":"newCenas"}], "community":"e9b9792e-79fb-4b07-b6b4-b9c2bd06d095", "open_access":true, "community_specific": {}, "publication_state":"draft"};
            //var data = {"titles":[{"title":"newCenas"}], "open_access":true, "community_specific": {}};
            var data = {"titles":[{"title":"cenasssssNelson"}], "community":"e9b9792e-79fb-4b07-b6b4-b9c2bd06d095", "open_access":true, "community_specific": {}};
            client.createADraftRecord(data, function (err, body) {
                recordIDToUpdate = body.data.id;
                bucketUrlToListFiles = body.data.links.files;
                assert.equal(body.statusCode, expectedStatusCode);
                done();
            }, done);
        });

    });

    it('uploadFileIntoDraftRecord with success', function (done) {
        this.timeout(2000000);
        var expectedStatusCode = '200';
        fileBucketID = bucketUrlToListFiles.split('/').pop();
        fs.readFile(__dirname + '/testFile.txt', function (err, data) {
            if(!err)
            {
                assert.doesNotThrow(function () {
                    //var info = {"bucketID":bucketIDForUploadTest.split('/').pop(), "fileNameWithExt": "testFile.txt"};
                    //var info = {"bucketID":bucketUrlToListFiles.split('/').pop(), "fileNameWithExt": "testFile.txt"};
                    var info = {"bucketID":fileBucketID, "fileNameWithExt": "testFile.txt"};
                    client.uploadFileIntoDraftRecord(info, data, function (err, body) {
                        assert.equal(body.statusCode, expectedStatusCode);
                        done();
                    }, done);
                });
            }
            else
            {
                console.log('there was an error reading the file');
                console.log(err);
                done(err);
            }
        });

    });

    it('listUploadedFilesInRecord with success', function (done) {
        var expectedStatusCode = '200';
        this.timeout(2000000);
        var buffer = [];
        assert.doesNotThrow(function () {
            client.listUploadedFilesInRecord(fileBucketID, function (err, body) {
                assert.equal(body.statusCode, expectedStatusCode);
                done();
            }, done);
        });

    });


    it('updateDraftRecordMetadata with success', function (done) {
        var expectedStatusCode = '200';
        this.timeout(2000000);
        var jsonPatchFormatData = [
            { "op": "replace", "path": "/titles/0/title", "value": "FINAL" }
        ];

        assert.doesNotThrow(function () {
            client.updateDraftRecordMetadata(recordIDToUpdate, jsonPatchFormatData, function (err, body) {
                recordIDToUpdate = body.data.id;
                assert.equal(body.statusCode, expectedStatusCode);
                done();
            }, done);
        });

    });

    it('submitDraftRecordForPublication with success', function (done) {
        var expectedStatusCode = '200';
        this.timeout(2000000);

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