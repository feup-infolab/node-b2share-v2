var should = require('chai').should(),
    B2ShareClient = require('../node-b2share-v2');


describe('#B2ShareClient', function () {
    var client;
    before(function () {
        var host = 'trng-b2share.eudat.eu';
        var accessTokens = 'YeuejKbcfPIxIQ6czD04j3wUS8HErWX5ilXgMpOlga8ONtDz57Rf6WlzHyPO';
        client = new B2ShareClient(host, accessTokens);
    });
    it('listCommunities', function () {

        var expectedResult = {
            "hits": {
                "hits": [
                    {
                        "created": "Tue, 20 Dec 2016 16:29:12 GMT",
                        "description": "Aalto University",
                        "id": "c4234f93-da96-4d2f-a2c8-fa83d0775212",
                        "links": {
                            "self": "https://trng-b2share.eudat.eu/api/communities/c4234f93-da96-4d2f-a2c8-fa83d0775212"
                        },
                        "logo": "/img/communities/aalto.jpg",
                        "name": "Aalto",
                        "publication_workflow": "direct_publish",
                        "restricted_submission": true,
                        "updated": "Tue, 20 Dec 2016 16:29:12 GMT"
                    },
                    {
                        "created": "Tue, 20 Dec 2016 16:29:12 GMT",
                        "description": "Biomedical Research.",
                        "id": "99916f6f-9a2c-4feb-a342-6552ac7f1529",
                        "links": {
                            "self": "https://trng-b2share.eudat.eu/api/communities/99916f6f-9a2c-4feb-a342-6552ac7f1529"
                        },
                        "logo": "/img/communities/bbmri.png",
                        "name": "BBMRI",
                        "publication_workflow": "direct_publish",
                        "restricted_submission": false,
                        "updated": "Tue, 20 Dec 2016 16:29:12 GMT"
                    },
                    {
                        "created": "Tue, 20 Dec 2016 16:29:12 GMT",
                        "description": "Linguistic data",
                        "id": "0afede87-2bf2-4d89-867e-d2ee57251c62",
                        "links": {
                            "self": "https://trng-b2share.eudat.eu/api/communities/0afede87-2bf2-4d89-867e-d2ee57251c62"
                        },
                        "logo": "/img/communities/clarin.png",
                        "name": "CLARIN",
                        "publication_workflow": "direct_publish",
                        "restricted_submission": false,
                        "updated": "Tue, 20 Dec 2016 16:29:12 GMT"
                    },
                    {
                        "created": "Tue, 20 Dec 2016 16:29:12 GMT",
                        "description": "Meteorology and climate data.",
                        "id": "94a9567e-2fba-4677-8fde-a8b68bdb63e8",
                        "links": {
                            "self": "https://trng-b2share.eudat.eu/api/communities/94a9567e-2fba-4677-8fde-a8b68bdb63e8"
                        },
                        "logo": "/img/communities/drihm.png",
                        "name": "DRIHM",
                        "publication_workflow": "direct_publish",
                        "restricted_submission": false,
                        "updated": "Tue, 20 Dec 2016 16:29:12 GMT"
                    },
                    {
                        "created": "Tue, 20 Dec 2016 16:29:12 GMT",
                        "description": "Incoherent scatter radar data",
                        "id": "b344f92a-cd0e-4e4c-aa09-28b5f95f7e41",
                        "links": {
                            "self": "https://trng-b2share.eudat.eu/api/communities/b344f92a-cd0e-4e4c-aa09-28b5f95f7e41"
                        },
                        "logo": "/img/communities/eiscat.png",
                        "name": "EISCAT",
                        "publication_workflow": "direct_publish",
                        "restricted_submission": true,
                        "updated": "Tue, 20 Dec 2016 16:29:12 GMT"
                    },
                    {
                        "created": "Tue, 20 Dec 2016 16:29:12 GMT",
                        "description": "The big Eudat community. Use this community if no other is suited for you",
                        "id": "e9b9792e-79fb-4b07-b6b4-b9c2bd06d095",
                        "links": {
                            "self": "https://trng-b2share.eudat.eu/api/communities/e9b9792e-79fb-4b07-b6b4-b9c2bd06d095"
                        },
                        "logo": "/img/communities/eudat.png",
                        "name": "EUDAT",
                        "publication_workflow": "direct_publish",
                        "restricted_submission": false,
                        "updated": "Tue, 20 Dec 2016 16:29:12 GMT"
                    },
                    {
                        "created": "Tue, 20 Dec 2016 16:29:12 GMT",
                        "description": "Ontological data.",
                        "id": "893fad89-dc4a-4f1b-a9ba-4240aa18e12b",
                        "links": {
                            "self": "https://trng-b2share.eudat.eu/api/communities/893fad89-dc4a-4f1b-a9ba-4240aa18e12b"
                        },
                        "logo": "/img/communities/euon.png",
                        "name": "EUON",
                        "publication_workflow": "direct_publish",
                        "restricted_submission": false,
                        "updated": "Tue, 20 Dec 2016 16:29:12 GMT"
                    },
                    {
                        "created": "Tue, 20 Dec 2016 16:29:12 GMT",
                        "description": "Biodiversity data.",
                        "id": "867c4e67-9227-4b6f-8595-c97d37e9de61",
                        "links": {
                            "self": "https://trng-b2share.eudat.eu/api/communities/867c4e67-9227-4b6f-8595-c97d37e9de61"
                        },
                        "logo": "/img/communities/gbif.png",
                        "name": "GBIF",
                        "publication_workflow": "direct_publish",
                        "restricted_submission": false,
                        "updated": "Tue, 20 Dec 2016 16:29:12 GMT"
                    },
                    {
                        "created": "Tue, 20 Dec 2016 16:29:12 GMT",
                        "description": "Long-Term Ecosystem Research in Europe",
                        "id": "d952913c-451e-4b5c-817e-d578dc8a4469",
                        "links": {
                            "self": "https://trng-b2share.eudat.eu/api/communities/d952913c-451e-4b5c-817e-d578dc8a4469"
                        },
                        "logo": "/img/communities/lter.jpg",
                        "name": "LTER",
                        "publication_workflow": "direct_publish",
                        "restricted_submission": false,
                        "updated": "Tue, 20 Dec 2016 16:29:12 GMT"
                    },
                    {
                        "created": "Tue, 20 Dec 2016 16:29:12 GMT",
                        "description": "Herbarium data.",
                        "id": "4ba7c0fd-1435-4313-9c13-4d888d60321a",
                        "links": {
                            "self": "https://trng-b2share.eudat.eu/api/communities/4ba7c0fd-1435-4313-9c13-4d888d60321a"
                        },
                        "logo": "/img/communities/nrm.png",
                        "name": "NRM",
                        "publication_workflow": "direct_publish",
                        "restricted_submission": false,
                        "updated": "Tue, 20 Dec 2016 16:29:12 GMT"
                    },
                    {
                        "created": "Tue, 20 Dec 2016 16:29:12 GMT",
                        "description": "Research Data Alliance",
                        "id": "8d963a29-5e19-492b-8cfe-97da4f54fad2",
                        "links": {
                            "self": "https://trng-b2share.eudat.eu/api/communities/8d963a29-5e19-492b-8cfe-97da4f54fad2"
                        },
                        "logo": "/img/communities/rda.png",
                        "name": "RDA",
                        "publication_workflow": "direct_publish",
                        "restricted_submission": true,
                        "updated": "Tue, 20 Dec 2016 16:29:12 GMT"
                    }
                ],
                "total": 11
            },
            "links": {
                "self": "https://trng-b2share.eudat.eu/api/communities/"
            }
        };


        client.listCommunities().should.equal(expectedResult);

    });
});