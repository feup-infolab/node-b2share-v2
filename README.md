# node-b2share-v2

(Under construction)

# What is this?

This is a JavaScript wrapper for the EUDAT B2Share V2 API.

Developed in the context of the (https://eudat.eu/communities/eudat-as-a-long-term-repository-for-the-university-of-porto)[DataPublicatio@UPorto data pilot], it supports the (B2Share V2 API) [https://trng-b2share.eudat.eu/help/api].

# Usage

## Install

```bash
npm install node-b2share-v2
```

## Use in your project (FIXME)

```javascript
var B2ShareClient = require(’node-b2share-v2’);

var client = new B2ShareClient(url, access_token…) 

//API calls
client.get_communities(function(err, communities)…
client.get_community_schema(community, function(err, schema)…```




