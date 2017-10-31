# node-b2share-v2

[![Build Status](https://travis-ci.org/feup-infolab/node-b2share-v2.svg?branch=master)](https://travis-ci.org/feup-infolab/node-b2share-v2) [![Coverage Status](https://coveralls.io/repos/github/feup-infolab/node-b2share-v2/badge.svg?branch=master)](https://coveralls.io/github/feup-infolab/node-b2share-v2?branch=master) 
[![npm version](https://badge.fury.io/js/node-b2share-v2.svg)](https://badge.fury.io/js/node-b2share-v2)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/6ce98852d8f14e0a9f1b112e51be878b)](https://www.codacy.com/app/silvae86/node-b2share-v2?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=feup-infolab/node-b2share-v2&amp;utm_campaign=Badge_Grade)

**(The build may be in "failing" status due to temporary downtime of the B2Share Training Website at the time of the CI Build. This server is used to simulate the API requests and test the client. Do not worry, as this is normal.)**.

# What is this?

This is a JavaScript wrapper for the EUDAT B2Share V2 API.

Developed in the context of the [DataPublication@UPorto data pilot](https://eudat.eu/communities/eudat-as-a-long-term-repository-for-the-university-of-porto), it supports the [B2Share V2 API](https://trng-b2share.eudat.eu/help/api).

# Usage

## Install

```bash
npm install node-b2share-v2
```

## Use in your project

Warning: Make sure you create the access token for the respective host. For instance if you are interacting with the training url(trng-b2share.eudat.eu), create the access token for this host in https://trng-b2share.eudat.eu/user, if you are using the main url create the token in https://b2share.eudat.eu/user

```javascript
var B2ShareClient = require('node-b2share-v2');

/**
 * Initiates the B2ShareClient
 * @param host the host required to execute the requests(ex: trng-b2share.eudat.eu)
 * @param access_token the user's access token
 * @constructor
 */
var client = new B2ShareClient(url, access_token) 

//API calls
/**
 * Lists the communities, no arguments needed
 * @param callback
 */
client.listCommunities(function(err, communities)

/**
 * Gets a specific community schema
 * @param communityID the community id you want the schema from
 * @param callback
 */
client.getCommunitySchema(communityID, function(err, schema)

/**
 * List all the records, no arguments needed
 * @param callback
 */
client.listAllRecords(function(err,records)

/**
 * List records for a specific community
 * @param communityID the community id you want the records from
 * @param callback
 */
client.listRecordsPerCommunity(communityId, function(err, records)

/**
 * Search records by query string
 * @param queryString the query string
 * @param callback
 */
client.searchRecords(queryString, function(err, records)

/**
 * Search for drafts, no other parameters required
 * @param callback
 */
client.searchDrafts(function(err, drafts)

/**
 * Gets a specific record
 * @param recordID the record id of the record who want the information from
 * @param callback
 */
client.getSpecificRecord(recordID, function(err, record)

/**
 * Creates a draft record
 * @param data json object with basic information about the object, eg: {"titles":[{"title":"TestRest"}], "community":"e9b9792e-79fb-4b07-b6b4-b9c2bd06d095", "open_access":true, "community_specific": {}};
 * @param callback
 */
client.createADraftRecord(data, function(err, draft)

/**
 * Uploads a file into a draft record
 * @param info a json object with info(fileBucketID and the fileName with its extension) about the file eg: {"fileBucketID":'547485748754854875fgf', "fileNameWithExt": "testFile.txt"}
 * @param buffer the buffer with the file contents
 * @param callback
 */
client.uploadFileIntoDraftRecord(info, buffer, function(err, file)

/**
 * Gets the uploaded files in a specific record
 * @param fileBucketID the file bucket id
 * @param callback
 */
client.listUploadedFilesInRecord(fileBucketID, function(err, files)

/**
 * Updates a draft record metadata
 * @param recordID the record id of the draft
 * @param jsonPatchFormatData the content of the update, follows the json patch format ex: { "op": "replace", "path": "/titles/0/title", "value": "FINAL" }
 * @param callback
 */
client.updateDraftRecordMetadata(recordID, jsonPatchFormatData, function(err, draft)

/**
 * Submits a draft for publication
 * @param recordID the record id to submit for publication
 * @param callback
 */
client.submitDraftRecordForPublication(recordID, function(err, record)

```




