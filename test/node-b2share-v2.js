var should = require('chai').should(),
    assert = require('chai').assert,
    fs = require('fs'),
    toArray = require('stream-to-array'),
    Stream = require('stream'),
    B2ShareClient = require('../node-b2share-v2');


describe('#B2ShareClient', function () {
    var client;
    before(function () {
        var host = 'trng-b2share.eudat.eu';
        var accessTokens = 'YeuejKbcfPIxIQ6czD04j3wUS8HErWX5ilXgMpOlga8ONtDz57Rf6WlzHyPO';
        client = new B2ShareClient(host, accessTokens);
    });
    it('listCommunities with success', function (done) {
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


        assert.doesNotThrow(function () {
            client.listCommunities(function (err, body) {
                assert.equal(JSON.stringify(body), JSON.stringify(expectedResult));
                done();
            }, done);
        });

    });

    it('listCommunities with error', function (done) {
        var expectedResultWithError = {
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
                "self": "https://trng-b2share.eudat.eu/api/communities/cenas"
            }
        };


        assert.doesNotThrow(function () {
            client.listCommunities(function (err, body) {
                assert.notEqual(JSON.stringify(body), JSON.stringify(expectedResultWithError));
                done();
            }, done);
        });

    });

    it('getCommunitySchema with success', function (done) {
        var expectedResult = {
            "community": "0afede87-2bf2-4d89-867e-d2ee57251c62",
            "draft_json_schema": {
                "$ref": "https://trng-b2share.eudat.eu/api/communities/0afede87-2bf2-4d89-867e-d2ee57251c62/schemas/0#/json_schema",
                "$schema": "http://json-schema.org/draft-04/schema#"
            },
            "json_schema": {
                "allOf": [
                    {
                        "$schema": "http://json-schema.org/draft-04/schema#",
                        "additionalProperties": false,
                        "b2share": {
                            "presentation": {
                                "major": [
                                    "community",
                                    "titles",
                                    "descriptions",
                                    "creators",
                                    "open_access",
                                    "embargo_date",
                                    "license",
                                    "disciplines",
                                    "keywords",
                                    "contact_email"
                                ],
                                "minor": [
                                    "contributors",
                                    "resource_types",
                                    "alternate_identifiers",
                                    "version",
                                    "publisher",
                                    "language"
                                ]
                            }
                        },
                        "properties": {
                            "$schema": {
                                "type": "string"
                            },
                            "_deposit": {
                                "type": "object"
                            },
                            "_files": {
                                "type": "array"
                            },
                            "_oai": {
                                "type": "object"
                            },
                            "_pid": {
                                "description": "Array of persistent identifiers pointing to this record.",
                                "title": "Persistent Identifiers"
                            },
                            "alternate_identifiers": {
                                "description": "Any kind of other reference such as a URN, URI or an ISBN number.",
                                "items": {
                                    "additionalProperties": false,
                                    "properties": {
                                        "alternate_identifier": {
                                            "type": "string"
                                        },
                                        "alternate_identifier_type": {
                                            "title": "Type",
                                            "type": "string"
                                        }
                                    },
                                    "required": [
                                        "alternate_identifier",
                                        "alternate_identifier_type"
                                    ],
                                    "type": "object"
                                },
                                "title": "Alternate identifiers",
                                "type": "array",
                                "uniqueItems": true
                            },
                            "community": {
                                "description": "The community to which the record has been submitted.",
                                "title": "Community",
                                "type": "string"
                            },
                            "community_specific": {
                                "type": "object"
                            },
                            "contact_email": {
                                "description": "Contact email information for this record.",
                                "format": "email",
                                "title": "Contact Email",
                                "type": "string"
                            },
                            "contributors": {
                                "description": "The list of all other contributors. Please mention all persons that were relevant in the creation of the resource.",
                                "items": {
                                    "additionalProperties": false,
                                    "properties": {
                                        "contributor_name": {
                                            "title": "Name",
                                            "type": "string"
                                        },
                                        "contributor_type": {
                                            "enum": [
                                                "ContactPerson",
                                                "DataCollector",
                                                "DataCurator",
                                                "DataManager",
                                                "Distributor",
                                                "Editor",
                                                "HostingInstitution",
                                                "Producer",
                                                "ProjectLeader",
                                                "ProjectManager",
                                                "ProjectMember",
                                                "RegistrationAgency",
                                                "RegistrationAuthority",
                                                "RelatedPerson",
                                                "Researcher",
                                                "ResearchGroup",
                                                "RightsHolder",
                                                "Sponsor",
                                                "Supervisor",
                                                "WorkPackageLeader",
                                                "Other"
                                            ],
                                            "title": "Type"
                                        }
                                    },
                                    "required": [
                                        "contributor_name",
                                        "contributor_type"
                                    ],
                                    "type": "object"
                                },
                                "title": "Contributors",
                                "type": "array",
                                "uniqueItems": true
                            },
                            "creators": {
                                "description": "The full name of the creators. The personal name format should be: family, given (e.g.: Smith, John).",
                                "items": {
                                    "additionalProperties": false,
                                    "properties": {
                                        "creator_name": {
                                            "type": "string"
                                        }
                                    },
                                    "required": [
                                        "creator_name"
                                    ],
                                    "type": "object"
                                },
                                "title": "Creators",
                                "type": "array",
                                "uniqueItems": true
                            },
                            "descriptions": {
                                "description": "A more elaborate description of the resource. Focus on a content description that makes it easy for others to find, and to interpret its relevance.",
                                "items": {
                                    "additionalProperties": false,
                                    "properties": {
                                        "description": {
                                            "type": "string"
                                        },
                                        "description_type": {
                                            "enum": [
                                                "Abstract",
                                                "Methods",
                                                "SeriesInformation",
                                                "TableOfContents",
                                                "TechnicalInfo",
                                                "Other"
                                            ],
                                            "title": "Type"
                                        }
                                    },
                                    "required": [
                                        "description",
                                        "description_type"
                                    ],
                                    "type": "object"
                                },
                                "title": "Descriptions",
                                "type": "array",
                                "uniqueItems": true
                            },
                            "disciplines": {
                                "description": "The scientific disciplines linked with the resource.",
                                "items": {
                                    "type": "string"
                                },
                                "title": "Disciplines",
                                "type": "array",
                                "uniqueItems": true
                            },
                            "embargo_date": {
                                "description": "The date marking the end of the embargo period. The record will be marked as open access on the specified date at midnight. Please note that the record metadata is always publicly accessible, and only the data files can have private access.",
                                "format": "date-time",
                                "title": "Embargo Date",
                                "type": "string"
                            },
                            "keywords": {
                                "description": "A list of keywords or key phrases describing the resource.",
                                "items": {
                                    "type": "string"
                                },
                                "title": "Keywords",
                                "type": "array",
                                "uniqueItems": true
                            },
                            "language": {
                                "description": "The primary language of the resource. Please use ISO_639-3 language codes.",
                                "title": "Language",
                                "type": "string"
                            },
                            "license": {
                                "additionalProperties": false,
                                "description": "Specify the license under which this data set is available to the users (e.g. GPL, Apache v2 or Commercial). Please use the License Selector for help and additional information.",
                                "properties": {
                                    "license": {
                                        "type": "string"
                                    },
                                    "license_uri": {
                                        "format": "uri",
                                        "title": "URL",
                                        "type": "string"
                                    }
                                },
                                "required": [
                                    "license"
                                ],
                                "title": "License",
                                "type": "object"
                            },
                            "open_access": {
                                "description": "Indicate whether the record's files are publicly accessible or not. In case of restricted access the uploaded files will only be accessible by the record's owner and the community administrators. Please note that the record's metadata is always publicly accessible. ",
                                "title": "Open Access",
                                "type": "boolean"
                            },
                            "publication_date": {
                                "description": "The date when the data was or will be made publicly available (e.g. 1971-07-13)",
                                "format": "date",
                                "title": "Publication Date",
                                "type": "string"
                            },
                            "publication_state": {
                                "description": "State of the publication workflow.",
                                "enum": [
                                    "draft",
                                    "submitted",
                                    "published"
                                ],
                                "title": "Publication State",
                                "type": "string"
                            },
                            "publisher": {
                                "description": "The entity responsible for making the resource available, either a person, an organization, or a service.",
                                "title": "Publisher",
                                "type": "string"
                            },
                            "resource_types": {
                                "description": "The type(s) of the resource.",
                                "items": {
                                    "additionalProperties": false,
                                    "properties": {
                                        "resource_type": {
                                            "title": "Description",
                                            "type": "string"
                                        },
                                        "resource_type_general": {
                                            "enum": [
                                                "Audiovisual",
                                                "Collection",
                                                "Dataset",
                                                "Event",
                                                "Image",
                                                "InteractiveResource",
                                                "Model",
                                                "PhysicalObject",
                                                "Service",
                                                "Software",
                                                "Sound",
                                                "Text",
                                                "Workflow",
                                                "Other"
                                            ],
                                            "title": "Category"
                                        }
                                    },
                                    "required": [
                                        "resource_type_general"
                                    ],
                                    "type": "object"
                                },
                                "minItems": 1,
                                "title": "Resource Type",
                                "type": "array",
                                "uniqueItems": true
                            },
                            "titles": {
                                "description": "The title(s) of the uploaded resource, or a name by which the resource is known.",
                                "items": {
                                    "additionalProperties": false,
                                    "properties": {
                                        "title": {
                                            "type": "string"
                                        }
                                    },
                                    "required": [
                                        "title"
                                    ],
                                    "type": "object"
                                },
                                "minItems": 1,
                                "title": "Titles",
                                "type": "array",
                                "uniqueItems": true
                            },
                            "version": {
                                "description": "Denote the version of the resource.",
                                "title": "Version",
                                "type": "string"
                            }
                        },
                        "required": [
                            "community",
                            "titles",
                            "open_access",
                            "publication_state",
                            "community_specific"
                        ],
                        "type": "object"
                    },
                    {
                        "properties": {
                            "community_specific": {
                                "$schema": "http://json-schema.org/draft-04/schema#",
                                "additionalProperties": false,
                                "properties": {
                                    "2a01ee91-36fe-4edb-9734-73d22ac78821": {
                                        "$ref": "https://trng-b2share.eudat.eu/api/schemas/2a01ee91-36fe-4edb-9734-73d22ac78821/versions/0#/json_schema"
                                    }
                                },
                                "required": [
                                    "2a01ee91-36fe-4edb-9734-73d22ac78821"
                                ],
                                "type": "object"
                            }
                        },
                        "type": "object"
                    }
                ]
            },
            "links": {
                "self": "https://trng-b2share.eudat.eu/api/communities/0afede87-2bf2-4d89-867e-d2ee57251c62/schemas/0"
            },
            "version": 0
        };


        assert.doesNotThrow(function () {
            var communityID = '0afede87-2bf2-4d89-867e-d2ee57251c62';
            client.getCommunitySchema(communityID, function (err, body) {
                assert.equal(JSON.stringify(body), JSON.stringify(expectedResult));
                done();
            }, done);
        });

    });

    it('listAllRecords with success', function (done) {
        var expectedResult = {
            "aggregations": {
                "type": {
                    "buckets": [],
                    "doc_count_error_upper_bound": 0,
                    "sum_other_doc_count": 0
                }
            },
            "hits": {
                "hits": [
                    {
                        "created": "2016-12-20T16:29:13.780432+00:00",
                        "files": [
                            {
                                "bucket": "48eb8716-4ddd-4794-9a6f-1d143b6d7f2d",
                                "checksum": "md5:c8afdb36c52cf4727836669019e69222",
                                "key": "myfile",
                                "size": 9,
                                "version_id": "1f67c84a-9d44-4d8a-a896-395ba17c7429"
                            }
                        ],
                        "id": "a1c2ef96a1e446fa9bd7a2a46d2242d4",
                        "links": {
                            "files": "https://trng-b2share.eudat.eu/api/files/48eb8716-4ddd-4794-9a6f-1d143b6d7f2d",
                            "self": "https://trng-b2share.eudat.eu/api/records/a1c2ef96a1e446fa9bd7a2a46d2242d4"
                        },
                        "metadata": {
                            "$schema": "https://trng-b2share.eudat.eu/api/communities/99916f6f-9a2c-4feb-a342-6552ac7f1529/schemas/0#/json_schema",
                            "community": "99916f6f-9a2c-4feb-a342-6552ac7f1529",
                            "community_specific": {
                                "362e6f81-68fb-4d71-9496-34ca00e59769": {
                                    "categories_of_data_collected": [
                                        "Biological samples"
                                    ],
                                    "disease": "C61",
                                    "material_type": [
                                        "Other"
                                    ],
                                    "principal_investigator": "Amilcar Flores",
                                    "sex": [
                                        "Male"
                                    ],
                                    "study_description": "REST mediates androgen receptor actions on gene repression and predicts early recurrence of prostate cancer",
                                    "study_design": [
                                        "Other"
                                    ],
                                    "study_id": "REST",
                                    "study_name": "REST"
                                }
                            },
                            "contact_email": "x@example.com",
                            "descriptions": [
                                {
                                    "description": "REST mediates androgen receptor actions on gene repression and predicts early recurrence of prostate cancer",
                                    "description_type": "Abstract"
                                }
                            ],
                            "keywords": [
                                "prostate cancer",
                                "REST",
                                "TFBS",
                                "ChiP-seq"
                            ],
                            "open_access": true,
                            "owners": [
                                1
                            ],
                            "publication_state": "published",
                            "resource_types": [
                                {
                                    "resource_type_general": "Text"
                                }
                            ],
                            "titles": [
                                {
                                    "title": "REST paper 2014"
                                }
                            ]
                        },
                        "updated": "2016-12-20T16:29:13.780441+00:00"
                    },
                    {
                        "created": "2016-12-20T16:29:14.334092+00:00",
                        "files": [
                            {
                                "bucket": "d0615e6f-1a14-4140-83ac-d23d68e5e264",
                                "checksum": "md5:c8afdb36c52cf4727836669019e69222",
                                "key": "myfile",
                                "size": 9,
                                "version_id": "3a9adff7-aeff-4c40-882a-d46768255c51"
                            }
                        ],
                        "id": "1033083fedf4408fb5611f23527a926d",
                        "links": {
                            "files": "https://trng-b2share.eudat.eu/api/files/d0615e6f-1a14-4140-83ac-d23d68e5e264",
                            "self": "https://trng-b2share.eudat.eu/api/records/1033083fedf4408fb5611f23527a926d"
                        },
                        "metadata": {
                            "$schema": "https://trng-b2share.eudat.eu/api/communities/0afede87-2bf2-4d89-867e-d2ee57251c62/schemas/0#/json_schema",
                            "community": "0afede87-2bf2-4d89-867e-d2ee57251c62",
                            "community_specific": {
                                "2a01ee91-36fe-4edb-9734-73d22ac78821": {
                                    "language_code": "eng",
                                    "ling_resource_type": [
                                        "Text"
                                    ]
                                }
                            },
                            "contact_email": "x@example.com",
                            "creators": [
                                {
                                    "creator_name": "Daniel Zeman"
                                }
                            ],
                            "descriptions": [
                                {
                                    "description": "Description of verbal paradigms in Bengali. The description is written in Czech.",
                                    "description_type": "Abstract"
                                }
                            ],
                            "open_access": true,
                            "owners": [
                                1
                            ],
                            "publication_state": "published",
                            "resource_types": [
                                {
                                    "resource_type_general": "Text"
                                }
                            ],
                            "titles": [
                                {
                                    "title": "Časování sloves v bengálštině"
                                }
                            ]
                        },
                        "updated": "2016-12-20T16:29:14.334102+00:00"
                    },
                    {
                        "created": "2016-12-20T16:29:14.819406+00:00",
                        "files": [
                            {
                                "bucket": "b423fa31-d1b7-4258-b9ee-e93acbceb2f3",
                                "checksum": "md5:c8afdb36c52cf4727836669019e69222",
                                "key": "myfile",
                                "size": 9,
                                "version_id": "56a4b198-a334-42a9-bbfd-d83346e8dfd6"
                            }
                        ],
                        "id": "47077e3c4b9f4852a40709e338ad4620",
                        "links": {
                            "files": "https://trng-b2share.eudat.eu/api/files/b423fa31-d1b7-4258-b9ee-e93acbceb2f3",
                            "self": "https://trng-b2share.eudat.eu/api/records/47077e3c4b9f4852a40709e338ad4620"
                        },
                        "metadata": {
                            "$schema": "https://trng-b2share.eudat.eu/api/communities/8d963a29-5e19-492b-8cfe-97da4f54fad2/schemas/0#/json_schema",
                            "alternate_identifiers": [
                                {
                                    "alternate_identifier": "10.15497/A675341C-F705-4136-B7C3-B9C14B556186",
                                    "alternate_identifier_type": "DOI"
                                }
                            ],
                            "community": "8d963a29-5e19-492b-8cfe-97da4f54fad2",
                            "community_specific": {
                                "668b996d-9e0e-4fff-be58-53d33316c5c6": {
                                    "coverage": "Official Document",
                                    "format": "Text"
                                }
                            },
                            "contact_email": "x@rd-alliance.org",
                            "creators": [
                                {
                                    "creator_name": "Research Data Alliance Council"
                                },
                                {
                                    "creator_name": "RDA2"
                                }
                            ],
                            "descriptions": [
                                {
                                    "description": "A document describing the high-level structures of the Research Data Alliance Foundation. This document is separate from the regular governance document, which describes procedures and processes.",
                                    "description_type": "Abstract"
                                }
                            ],
                            "keywords": [
                                "Research Data Alliance",
                                "RDA",
                                "Governance",
                                "Foundation",
                                "RDA Policy"
                            ],
                            "license": {
                                "license": "Creative Commons Attribution (CC-BY)",
                                "license_uri": "http://creativecommons.org/licenses/by/4.0/"
                            },
                            "open_access": true,
                            "owners": [
                                1
                            ],
                            "publication_state": "published",
                            "resource_types": [
                                {
                                    "resource_type_general": "Text"
                                }
                            ],
                            "titles": [
                                {
                                    "title": "RDA Foundation Governance Document"
                                }
                            ]
                        },
                        "updated": "2016-12-20T16:29:14.819415+00:00"
                    },
                    {
                        "created": "2017-01-25T14:09:19.555957+00:00",
                        "files": [
                            {
                                "bucket": "cc8a88b7-41ac-4cfe-9c52-7de156c0a322",
                                "checksum": "md5:d81da37d75c4800413cd49d56ca1a8bf",
                                "key": "helium berilium test phrase.txt",
                                "size": 52,
                                "version_id": "c876f7d1-45f9-4f91-86b2-d14fc2e4fb77"
                            }
                        ],
                        "id": "a54598106d5d4b7ea0967d6188fe3bd4",
                        "links": {
                            "files": "https://trng-b2share.eudat.eu/api/files/cc8a88b7-41ac-4cfe-9c52-7de156c0a322",
                            "self": "https://trng-b2share.eudat.eu/api/records/a54598106d5d4b7ea0967d6188fe3bd4"
                        },
                        "metadata": {
                            "$schema": "https://trng-b2share.eudat.eu/api/communities/e9b9792e-79fb-4b07-b6b4-b9c2bd06d095/schemas/0#/json_schema",
                            "community": "e9b9792e-79fb-4b07-b6b4-b9c2bd06d095",
                            "community_specific": {},
                            "open_access": true,
                            "owners": [
                                2
                            ],
                            "publication_state": "published",
                            "titles": [
                                {
                                    "title": "test1"
                                }
                            ]
                        },
                        "updated": "2017-01-25T14:09:19.555965+00:00"
                    },
                    {
                        "created": "2017-01-26T12:20:44.776348+00:00",
                        "files": [
                            {
                                "bucket": "0f2955ca-59d1-4790-a3ea-dd500643c343",
                                "checksum": "md5:6d4427a4c3fcad516bc17ed40bb0c861",
                                "key": "test.txt",
                                "size": 205,
                                "version_id": "becb0323-369e-427c-a0f9-ec176daa440e"
                            }
                        ],
                        "id": "ebb01b0baf1a4c4aaf0ea7661e30d9e5",
                        "links": {
                            "files": "https://trng-b2share.eudat.eu/api/files/0f2955ca-59d1-4790-a3ea-dd500643c343",
                            "self": "https://trng-b2share.eudat.eu/api/records/ebb01b0baf1a4c4aaf0ea7661e30d9e5"
                        },
                        "metadata": {
                            "$schema": "https://trng-b2share.eudat.eu/api/communities/e9b9792e-79fb-4b07-b6b4-b9c2bd06d095/schemas/0#/json_schema",
                            "community": "e9b9792e-79fb-4b07-b6b4-b9c2bd06d095",
                            "community_specific": {},
                            "open_access": true,
                            "owners": [
                                5
                            ],
                            "publication_state": "published",
                            "titles": [
                                {
                                    "title": "`fsd`f"
                                }
                            ]
                        },
                        "updated": "2017-01-26T12:20:44.776356+00:00"
                    },
                    {
                        "created": "2017-01-26T12:22:16.836159+00:00",
                        "files": [
                            {
                                "bucket": "0fd2a4df-153a-4b03-a2be-28d7396a0b84",
                                "checksum": "md5:bf0540f4184c9ebca3a4c41f5a648632",
                                "key": "test_0.txt",
                                "size": 207,
                                "version_id": "c3970440-4efb-45ab-bb69-b44f86130a52"
                            }
                        ],
                        "id": "0e24f21a12f34209856bde48a9050d57",
                        "links": {
                            "files": "https://trng-b2share.eudat.eu/api/files/0fd2a4df-153a-4b03-a2be-28d7396a0b84",
                            "self": "https://trng-b2share.eudat.eu/api/records/0e24f21a12f34209856bde48a9050d57"
                        },
                        "metadata": {
                            "$schema": "https://trng-b2share.eudat.eu/api/communities/e9b9792e-79fb-4b07-b6b4-b9c2bd06d095/schemas/0#/json_schema",
                            "community": "e9b9792e-79fb-4b07-b6b4-b9c2bd06d095",
                            "community_specific": {},
                            "open_access": true,
                            "owners": [
                                5
                            ],
                            "publication_state": "published",
                            "titles": [
                                {
                                    "title": "we"
                                }
                            ]
                        },
                        "updated": "2017-01-26T12:22:16.836166+00:00"
                    },
                    {
                        "created": "2017-01-26T13:09:31.753163+00:00",
                        "files": [
                            {
                                "bucket": "317965a1-bf5f-406d-98c7-8d60ec9d5ef5",
                                "checksum": "md5:32412a26d6c043290d4f44add9329463",
                                "key": "yhdistetty_apila2.jpg",
                                "size": 1038301,
                                "version_id": "0df26fc9-76a4-4b4d-a2db-fca2864a8ca1"
                            }
                        ],
                        "id": "eaf0a509508c4def85f42582de00f6f8",
                        "links": {
                            "files": "https://trng-b2share.eudat.eu/api/files/317965a1-bf5f-406d-98c7-8d60ec9d5ef5",
                            "self": "https://trng-b2share.eudat.eu/api/records/eaf0a509508c4def85f42582de00f6f8"
                        },
                        "metadata": {
                            "$schema": "https://trng-b2share.eudat.eu/api/communities/867c4e67-9227-4b6f-8595-c97d37e9de61/schemas/0#/json_schema",
                            "community": "867c4e67-9227-4b6f-8595-c97d37e9de61",
                            "community_specific": {
                                "e06cafbc-0598-4dd8-9029-9bf1f74d8b2e": {
                                    "country": "Finland",
                                    "gbif_id": "http://id.luomus.fi/EA3.1ll",
                                    "status": "None",
                                    "version_number": "1"
                                }
                            },
                            "open_access": true,
                            "owners": [
                                7
                            ],
                            "publication_state": "published",
                            "titles": [
                                {
                                    "title": "Herbarium image annotation by Hannu"
                                }
                            ]
                        },
                        "updated": "2017-01-26T13:09:31.753170+00:00"
                    },
                    {
                        "created": "2017-01-30T12:35:07.219610+00:00",
                        "files": [
                            {
                                "bucket": "3958dc28-9302-4f18-8741-04e3d3297ab3",
                                "checksum": "md5:d09a540d96533d37ae56721ba122cfe0",
                                "key": "upload_test_2.txt",
                                "size": 227,
                                "version_id": "d3cf62e8-0b67-4337-b553-75d789e861b7"
                            }
                        ],
                        "id": "0fbe7396843d405d9c3c0f791b7747d0",
                        "links": {
                            "files": "https://trng-b2share.eudat.eu/api/files/3958dc28-9302-4f18-8741-04e3d3297ab3",
                            "self": "https://trng-b2share.eudat.eu/api/records/0fbe7396843d405d9c3c0f791b7747d0"
                        },
                        "metadata": {
                            "$schema": "https://trng-b2share.eudat.eu/api/communities/e9b9792e-79fb-4b07-b6b4-b9c2bd06d095/schemas/0#/json_schema",
                            "community": "e9b9792e-79fb-4b07-b6b4-b9c2bd06d095",
                            "community_specific": {},
                            "open_access": true,
                            "owners": [
                                5
                            ],
                            "publication_state": "published",
                            "titles": [
                                {
                                    "title": "fsfs"
                                }
                            ]
                        },
                        "updated": "2017-01-30T12:35:07.219618+00:00"
                    },
                    {
                        "created": "2017-01-30T12:37:03.505346+00:00",
                        "files": [
                            {
                                "bucket": "cc780879-cd89-4115-8a5c-dfa36473b63b",
                                "checksum": "md5:edcbb70dbe336eee62e63a23b76f3589",
                                "key": "upload_test_3.txt",
                                "size": 227,
                                "version_id": "ae9e9458-3508-41d0-8cc3-26b2a80ddd92"
                            }
                        ],
                        "id": "b5c4c99b8fd14f8199d43189f63ce84b",
                        "links": {
                            "files": "https://trng-b2share.eudat.eu/api/files/cc780879-cd89-4115-8a5c-dfa36473b63b",
                            "self": "https://trng-b2share.eudat.eu/api/records/b5c4c99b8fd14f8199d43189f63ce84b"
                        },
                        "metadata": {
                            "$schema": "https://trng-b2share.eudat.eu/api/communities/e9b9792e-79fb-4b07-b6b4-b9c2bd06d095/schemas/0#/json_schema",
                            "community": "e9b9792e-79fb-4b07-b6b4-b9c2bd06d095",
                            "community_specific": {},
                            "open_access": true,
                            "owners": [
                                5
                            ],
                            "publication_state": "published",
                            "titles": [
                                {
                                    "title": "fsdfsd"
                                }
                            ]
                        },
                        "updated": "2017-01-30T12:37:03.505354+00:00"
                    },
                    {
                        "created": "2017-01-30T12:38:14.634446+00:00",
                        "files": [
                            {
                                "bucket": "2f08873f-ce5d-4e04-af19-8d583351bc8d",
                                "checksum": "md5:d9afdfdcb59822747b5ec71c71738a08",
                                "key": "upload_test_3.txt",
                                "size": 227,
                                "version_id": "1cf2276a-14f2-40fe-9a47-9b7bcb2f27c6"
                            }
                        ],
                        "id": "048edde045364628839a20560792c3c9",
                        "links": {
                            "files": "https://trng-b2share.eudat.eu/api/files/2f08873f-ce5d-4e04-af19-8d583351bc8d",
                            "self": "https://trng-b2share.eudat.eu/api/records/048edde045364628839a20560792c3c9"
                        },
                        "metadata": {
                            "$schema": "https://trng-b2share.eudat.eu/api/communities/e9b9792e-79fb-4b07-b6b4-b9c2bd06d095/schemas/0#/json_schema",
                            "community": "e9b9792e-79fb-4b07-b6b4-b9c2bd06d095",
                            "community_specific": {},
                            "open_access": true,
                            "owners": [
                                5
                            ],
                            "publication_state": "published",
                            "titles": [
                                {
                                    "title": "fsdfsd"
                                }
                            ]
                        },
                        "updated": "2017-01-30T12:38:14.634454+00:00"
                    }
                ],
                "total": 106
            },
            "links": {
                "next": "https://trng-b2share.eudat.eu/api/records/?sort=mostrecent&q=&size=10&page=2",
                "self": "https://trng-b2share.eudat.eu/api/records/?sort=mostrecent&q=&size=10&page=1"
            }
        };


        assert.doesNotThrow(function () {
            client.listAllRecords(function (err, body) {
                assert.equal(JSON.stringify(body), JSON.stringify(expectedResult));
                done();
            }, done);
        });

    });

    it('listRecordsPerCommunity with success', function (done) {
        var expectedResult = {
            "aggregations": {
                "type": {
                    "buckets": [],
                    "doc_count_error_upper_bound": 0,
                    "sum_other_doc_count": 0
                }
            },
            "hits": {
                "hits": [
                    {
                        "created": "2016-12-20T16:29:14.334092+00:00",
                        "files": [
                            {
                                "bucket": "d0615e6f-1a14-4140-83ac-d23d68e5e264",
                                "checksum": "md5:c8afdb36c52cf4727836669019e69222",
                                "key": "myfile",
                                "size": 9,
                                "version_id": "3a9adff7-aeff-4c40-882a-d46768255c51"
                            }
                        ],
                        "id": "1033083fedf4408fb5611f23527a926d",
                        "links": {
                            "files": "https://trng-b2share.eudat.eu/api/files/d0615e6f-1a14-4140-83ac-d23d68e5e264",
                            "self": "https://trng-b2share.eudat.eu/api/records/1033083fedf4408fb5611f23527a926d"
                        },
                        "metadata": {
                            "$schema": "https://trng-b2share.eudat.eu/api/communities/0afede87-2bf2-4d89-867e-d2ee57251c62/schemas/0#/json_schema",
                            "community": "0afede87-2bf2-4d89-867e-d2ee57251c62",
                            "community_specific": {
                                "2a01ee91-36fe-4edb-9734-73d22ac78821": {
                                    "language_code": "eng",
                                    "ling_resource_type": [
                                        "Text"
                                    ]
                                }
                            },
                            "contact_email": "x@example.com",
                            "creators": [
                                {
                                    "creator_name": "Daniel Zeman"
                                }
                            ],
                            "descriptions": [
                                {
                                    "description": "Description of verbal paradigms in Bengali. The description is written in Czech.",
                                    "description_type": "Abstract"
                                }
                            ],
                            "open_access": true,
                            "owners": [
                                1
                            ],
                            "publication_state": "published",
                            "resource_types": [
                                {
                                    "resource_type_general": "Text"
                                }
                            ],
                            "titles": [
                                {
                                    "title": "Časování sloves v bengálštině"
                                }
                            ]
                        },
                        "updated": "2016-12-20T16:29:14.334102+00:00"
                    }
                ],
                "total": 1
            },
            "links": {
                "self": "https://trng-b2share.eudat.eu/api/records/?sort=bestmatch&q=community%3A0afede87-2bf2-4d89-867e-d2ee57251c62%3Faccess_token%3DYeuejKbcfPIxIQ6czD04j3wUS8HErWX5ilXgMpOlga8ONtDz57Rf6WlzHyPO&size=10&page=1"
            }
        };

        assert.doesNotThrow(function () {
            var communityID = '0afede87-2bf2-4d89-867e-d2ee57251c62';
            client.listRecordsPerCommunity(communityID,function (err, body) {
                assert.equal(JSON.stringify(body), JSON.stringify(expectedResult));
                done();
            }, done);
        });

    });

    //TODO check this test better
    /*
    it('searchRecords with success', function (done) {
        var expectedResult = {
            "aggregations": {
                "type": {
                    "buckets": [],
                    "doc_count_error_upper_bound": 0,
                    "sum_other_doc_count": 0
                }
            },
            "hits": {
                "hits": [
                    {
                        "created": "2016-12-20T16:29:14.334092+00:00",
                        "files": [
                            {
                                "bucket": "d0615e6f-1a14-4140-83ac-d23d68e5e264",
                                "checksum": "md5:c8afdb36c52cf4727836669019e69222",
                                "key": "myfile",
                                "size": 9,
                                "version_id": "3a9adff7-aeff-4c40-882a-d46768255c51"
                            }
                        ],
                        "id": "1033083fedf4408fb5611f23527a926d",
                        "links": {
                            "files": "https://trng-b2share.eudat.eu/api/files/d0615e6f-1a14-4140-83ac-d23d68e5e264",
                            "self": "https://trng-b2share.eudat.eu/api/records/1033083fedf4408fb5611f23527a926d"
                        },
                        "metadata": {
                            "$schema": "https://trng-b2share.eudat.eu/api/communities/0afede87-2bf2-4d89-867e-d2ee57251c62/schemas/0#/json_schema",
                            "community": "0afede87-2bf2-4d89-867e-d2ee57251c62",
                            "community_specific": {
                                "2a01ee91-36fe-4edb-9734-73d22ac78821": {
                                    "language_code": "eng",
                                    "ling_resource_type": [
                                        "Text"
                                    ]
                                }
                            },
                            "contact_email": "x@example.com",
                            "creators": [
                                {
                                    "creator_name": "Daniel Zeman"
                                }
                            ],
                            "descriptions": [
                                {
                                    "description": "Description of verbal paradigms in Bengali. The description is written in Czech.",
                                    "description_type": "Abstract"
                                }
                            ],
                            "open_access": true,
                            "owners": [
                                1
                            ],
                            "publication_state": "published",
                            "resource_types": [
                                {
                                    "resource_type_general": "Text"
                                }
                            ],
                            "titles": [
                                {
                                    "title": "Časování sloves v bengálštině"
                                }
                            ]
                        },
                        "updated": "2016-12-20T16:29:14.334102+00:00"
                    }
                ],
                "total": 1
            },
            "links": {
                "self": "https://trng-b2share.eudat.eu/api/records/?sort=bestmatch&q=community%3A0afede87-2bf2-4d89-867e-d2ee57251c62%3Faccess_token%3DYeuejKbcfPIxIQ6czD04j3wUS8HErWX5ilXgMpOlga8ONtDz57Rf6WlzHyPO&size=10&page=1"
            }
        };

        assert.doesNotThrow(function () {
            var queryString = '0afede87-2bf2-4d89-867e-d2ee57251c62';
            client.searchRecords(queryString,function (err, body) {
                assert.equal(JSON.stringify(body), JSON.stringify(expectedResult));
                done();
            }, done);
        });

    });*/

    it('searchDrafts with success', function (done) {
        var expectedResult = {
            "aggregations": {
                "type": {
                    "buckets": [],
                    "doc_count_error_upper_bound": 0,
                    "sum_other_doc_count": 0
                }
            },
            "hits": {
                "hits": [
                    {
                        "created": "2016-12-20T16:29:13.780432+00:00",
                        "files": [
                            {
                                "bucket": "48eb8716-4ddd-4794-9a6f-1d143b6d7f2d",
                                "checksum": "md5:c8afdb36c52cf4727836669019e69222",
                                "key": "myfile",
                                "size": 9,
                                "version_id": "1f67c84a-9d44-4d8a-a896-395ba17c7429"
                            }
                        ],
                        "id": "a1c2ef96a1e446fa9bd7a2a46d2242d4",
                        "links": {
                            "files": "https://trng-b2share.eudat.eu/api/files/48eb8716-4ddd-4794-9a6f-1d143b6d7f2d",
                            "self": "https://trng-b2share.eudat.eu/api/records/a1c2ef96a1e446fa9bd7a2a46d2242d4"
                        },
                        "metadata": {
                            "$schema": "https://trng-b2share.eudat.eu/api/communities/99916f6f-9a2c-4feb-a342-6552ac7f1529/schemas/0#/json_schema",
                            "community": "99916f6f-9a2c-4feb-a342-6552ac7f1529",
                            "community_specific": {
                                "362e6f81-68fb-4d71-9496-34ca00e59769": {
                                    "categories_of_data_collected": [
                                        "Biological samples"
                                    ],
                                    "disease": "C61",
                                    "material_type": [
                                        "Other"
                                    ],
                                    "principal_investigator": "Amilcar Flores",
                                    "sex": [
                                        "Male"
                                    ],
                                    "study_description": "REST mediates androgen receptor actions on gene repression and predicts early recurrence of prostate cancer",
                                    "study_design": [
                                        "Other"
                                    ],
                                    "study_id": "REST",
                                    "study_name": "REST"
                                }
                            },
                            "contact_email": "x@example.com",
                            "descriptions": [
                                {
                                    "description": "REST mediates androgen receptor actions on gene repression and predicts early recurrence of prostate cancer",
                                    "description_type": "Abstract"
                                }
                            ],
                            "keywords": [
                                "prostate cancer",
                                "REST",
                                "TFBS",
                                "ChiP-seq"
                            ],
                            "open_access": true,
                            "owners": [
                                1
                            ],
                            "publication_state": "published",
                            "resource_types": [
                                {
                                    "resource_type_general": "Text"
                                }
                            ],
                            "titles": [
                                {
                                    "title": "REST paper 2014"
                                }
                            ]
                        },
                        "updated": "2016-12-20T16:29:13.780441+00:00"
                    },
                    {
                        "created": "2016-12-20T16:29:14.334092+00:00",
                        "files": [
                            {
                                "bucket": "d0615e6f-1a14-4140-83ac-d23d68e5e264",
                                "checksum": "md5:c8afdb36c52cf4727836669019e69222",
                                "key": "myfile",
                                "size": 9,
                                "version_id": "3a9adff7-aeff-4c40-882a-d46768255c51"
                            }
                        ],
                        "id": "1033083fedf4408fb5611f23527a926d",
                        "links": {
                            "files": "https://trng-b2share.eudat.eu/api/files/d0615e6f-1a14-4140-83ac-d23d68e5e264",
                            "self": "https://trng-b2share.eudat.eu/api/records/1033083fedf4408fb5611f23527a926d"
                        },
                        "metadata": {
                            "$schema": "https://trng-b2share.eudat.eu/api/communities/0afede87-2bf2-4d89-867e-d2ee57251c62/schemas/0#/json_schema",
                            "community": "0afede87-2bf2-4d89-867e-d2ee57251c62",
                            "community_specific": {
                                "2a01ee91-36fe-4edb-9734-73d22ac78821": {
                                    "language_code": "eng",
                                    "ling_resource_type": [
                                        "Text"
                                    ]
                                }
                            },
                            "contact_email": "x@example.com",
                            "creators": [
                                {
                                    "creator_name": "Daniel Zeman"
                                }
                            ],
                            "descriptions": [
                                {
                                    "description": "Description of verbal paradigms in Bengali. The description is written in Czech.",
                                    "description_type": "Abstract"
                                }
                            ],
                            "open_access": true,
                            "owners": [
                                1
                            ],
                            "publication_state": "published",
                            "resource_types": [
                                {
                                    "resource_type_general": "Text"
                                }
                            ],
                            "titles": [
                                {
                                    "title": "Časování sloves v bengálštině"
                                }
                            ]
                        },
                        "updated": "2016-12-20T16:29:14.334102+00:00"
                    },
                    {
                        "created": "2016-12-20T16:29:14.819406+00:00",
                        "files": [
                            {
                                "bucket": "b423fa31-d1b7-4258-b9ee-e93acbceb2f3",
                                "checksum": "md5:c8afdb36c52cf4727836669019e69222",
                                "key": "myfile",
                                "size": 9,
                                "version_id": "56a4b198-a334-42a9-bbfd-d83346e8dfd6"
                            }
                        ],
                        "id": "47077e3c4b9f4852a40709e338ad4620",
                        "links": {
                            "files": "https://trng-b2share.eudat.eu/api/files/b423fa31-d1b7-4258-b9ee-e93acbceb2f3",
                            "self": "https://trng-b2share.eudat.eu/api/records/47077e3c4b9f4852a40709e338ad4620"
                        },
                        "metadata": {
                            "$schema": "https://trng-b2share.eudat.eu/api/communities/8d963a29-5e19-492b-8cfe-97da4f54fad2/schemas/0#/json_schema",
                            "alternate_identifiers": [
                                {
                                    "alternate_identifier": "10.15497/A675341C-F705-4136-B7C3-B9C14B556186",
                                    "alternate_identifier_type": "DOI"
                                }
                            ],
                            "community": "8d963a29-5e19-492b-8cfe-97da4f54fad2",
                            "community_specific": {
                                "668b996d-9e0e-4fff-be58-53d33316c5c6": {
                                    "coverage": "Official Document",
                                    "format": "Text"
                                }
                            },
                            "contact_email": "x@rd-alliance.org",
                            "creators": [
                                {
                                    "creator_name": "Research Data Alliance Council"
                                },
                                {
                                    "creator_name": "RDA2"
                                }
                            ],
                            "descriptions": [
                                {
                                    "description": "A document describing the high-level structures of the Research Data Alliance Foundation. This document is separate from the regular governance document, which describes procedures and processes.",
                                    "description_type": "Abstract"
                                }
                            ],
                            "keywords": [
                                "Research Data Alliance",
                                "RDA",
                                "Governance",
                                "Foundation",
                                "RDA Policy"
                            ],
                            "license": {
                                "license": "Creative Commons Attribution (CC-BY)",
                                "license_uri": "http://creativecommons.org/licenses/by/4.0/"
                            },
                            "open_access": true,
                            "owners": [
                                1
                            ],
                            "publication_state": "published",
                            "resource_types": [
                                {
                                    "resource_type_general": "Text"
                                }
                            ],
                            "titles": [
                                {
                                    "title": "RDA Foundation Governance Document"
                                }
                            ]
                        },
                        "updated": "2016-12-20T16:29:14.819415+00:00"
                    },
                    {
                        "created": "2017-01-25T14:09:19.555957+00:00",
                        "files": [
                            {
                                "bucket": "cc8a88b7-41ac-4cfe-9c52-7de156c0a322",
                                "checksum": "md5:d81da37d75c4800413cd49d56ca1a8bf",
                                "key": "helium berilium test phrase.txt",
                                "size": 52,
                                "version_id": "c876f7d1-45f9-4f91-86b2-d14fc2e4fb77"
                            }
                        ],
                        "id": "a54598106d5d4b7ea0967d6188fe3bd4",
                        "links": {
                            "files": "https://trng-b2share.eudat.eu/api/files/cc8a88b7-41ac-4cfe-9c52-7de156c0a322",
                            "self": "https://trng-b2share.eudat.eu/api/records/a54598106d5d4b7ea0967d6188fe3bd4"
                        },
                        "metadata": {
                            "$schema": "https://trng-b2share.eudat.eu/api/communities/e9b9792e-79fb-4b07-b6b4-b9c2bd06d095/schemas/0#/json_schema",
                            "community": "e9b9792e-79fb-4b07-b6b4-b9c2bd06d095",
                            "community_specific": {},
                            "open_access": true,
                            "owners": [
                                2
                            ],
                            "publication_state": "published",
                            "titles": [
                                {
                                    "title": "test1"
                                }
                            ]
                        },
                        "updated": "2017-01-25T14:09:19.555965+00:00"
                    },
                    {
                        "created": "2017-01-26T12:20:44.776348+00:00",
                        "files": [
                            {
                                "bucket": "0f2955ca-59d1-4790-a3ea-dd500643c343",
                                "checksum": "md5:6d4427a4c3fcad516bc17ed40bb0c861",
                                "key": "test.txt",
                                "size": 205,
                                "version_id": "becb0323-369e-427c-a0f9-ec176daa440e"
                            }
                        ],
                        "id": "ebb01b0baf1a4c4aaf0ea7661e30d9e5",
                        "links": {
                            "files": "https://trng-b2share.eudat.eu/api/files/0f2955ca-59d1-4790-a3ea-dd500643c343",
                            "self": "https://trng-b2share.eudat.eu/api/records/ebb01b0baf1a4c4aaf0ea7661e30d9e5"
                        },
                        "metadata": {
                            "$schema": "https://trng-b2share.eudat.eu/api/communities/e9b9792e-79fb-4b07-b6b4-b9c2bd06d095/schemas/0#/json_schema",
                            "community": "e9b9792e-79fb-4b07-b6b4-b9c2bd06d095",
                            "community_specific": {},
                            "open_access": true,
                            "owners": [
                                5
                            ],
                            "publication_state": "published",
                            "titles": [
                                {
                                    "title": "`fsd`f"
                                }
                            ]
                        },
                        "updated": "2017-01-26T12:20:44.776356+00:00"
                    },
                    {
                        "created": "2017-01-26T12:22:16.836159+00:00",
                        "files": [
                            {
                                "bucket": "0fd2a4df-153a-4b03-a2be-28d7396a0b84",
                                "checksum": "md5:bf0540f4184c9ebca3a4c41f5a648632",
                                "key": "test_0.txt",
                                "size": 207,
                                "version_id": "c3970440-4efb-45ab-bb69-b44f86130a52"
                            }
                        ],
                        "id": "0e24f21a12f34209856bde48a9050d57",
                        "links": {
                            "files": "https://trng-b2share.eudat.eu/api/files/0fd2a4df-153a-4b03-a2be-28d7396a0b84",
                            "self": "https://trng-b2share.eudat.eu/api/records/0e24f21a12f34209856bde48a9050d57"
                        },
                        "metadata": {
                            "$schema": "https://trng-b2share.eudat.eu/api/communities/e9b9792e-79fb-4b07-b6b4-b9c2bd06d095/schemas/0#/json_schema",
                            "community": "e9b9792e-79fb-4b07-b6b4-b9c2bd06d095",
                            "community_specific": {},
                            "open_access": true,
                            "owners": [
                                5
                            ],
                            "publication_state": "published",
                            "titles": [
                                {
                                    "title": "we"
                                }
                            ]
                        },
                        "updated": "2017-01-26T12:22:16.836166+00:00"
                    },
                    {
                        "created": "2017-01-26T13:09:31.753163+00:00",
                        "files": [
                            {
                                "bucket": "317965a1-bf5f-406d-98c7-8d60ec9d5ef5",
                                "checksum": "md5:32412a26d6c043290d4f44add9329463",
                                "key": "yhdistetty_apila2.jpg",
                                "size": 1038301,
                                "version_id": "0df26fc9-76a4-4b4d-a2db-fca2864a8ca1"
                            }
                        ],
                        "id": "eaf0a509508c4def85f42582de00f6f8",
                        "links": {
                            "files": "https://trng-b2share.eudat.eu/api/files/317965a1-bf5f-406d-98c7-8d60ec9d5ef5",
                            "self": "https://trng-b2share.eudat.eu/api/records/eaf0a509508c4def85f42582de00f6f8"
                        },
                        "metadata": {
                            "$schema": "https://trng-b2share.eudat.eu/api/communities/867c4e67-9227-4b6f-8595-c97d37e9de61/schemas/0#/json_schema",
                            "community": "867c4e67-9227-4b6f-8595-c97d37e9de61",
                            "community_specific": {
                                "e06cafbc-0598-4dd8-9029-9bf1f74d8b2e": {
                                    "country": "Finland",
                                    "gbif_id": "http://id.luomus.fi/EA3.1ll",
                                    "status": "None",
                                    "version_number": "1"
                                }
                            },
                            "open_access": true,
                            "owners": [
                                7
                            ],
                            "publication_state": "published",
                            "titles": [
                                {
                                    "title": "Herbarium image annotation by Hannu"
                                }
                            ]
                        },
                        "updated": "2017-01-26T13:09:31.753170+00:00"
                    },
                    {
                        "created": "2017-01-30T12:35:07.219610+00:00",
                        "files": [
                            {
                                "bucket": "3958dc28-9302-4f18-8741-04e3d3297ab3",
                                "checksum": "md5:d09a540d96533d37ae56721ba122cfe0",
                                "key": "upload_test_2.txt",
                                "size": 227,
                                "version_id": "d3cf62e8-0b67-4337-b553-75d789e861b7"
                            }
                        ],
                        "id": "0fbe7396843d405d9c3c0f791b7747d0",
                        "links": {
                            "files": "https://trng-b2share.eudat.eu/api/files/3958dc28-9302-4f18-8741-04e3d3297ab3",
                            "self": "https://trng-b2share.eudat.eu/api/records/0fbe7396843d405d9c3c0f791b7747d0"
                        },
                        "metadata": {
                            "$schema": "https://trng-b2share.eudat.eu/api/communities/e9b9792e-79fb-4b07-b6b4-b9c2bd06d095/schemas/0#/json_schema",
                            "community": "e9b9792e-79fb-4b07-b6b4-b9c2bd06d095",
                            "community_specific": {},
                            "open_access": true,
                            "owners": [
                                5
                            ],
                            "publication_state": "published",
                            "titles": [
                                {
                                    "title": "fsfs"
                                }
                            ]
                        },
                        "updated": "2017-01-30T12:35:07.219618+00:00"
                    },
                    {
                        "created": "2017-01-30T12:37:03.505346+00:00",
                        "files": [
                            {
                                "bucket": "cc780879-cd89-4115-8a5c-dfa36473b63b",
                                "checksum": "md5:edcbb70dbe336eee62e63a23b76f3589",
                                "key": "upload_test_3.txt",
                                "size": 227,
                                "version_id": "ae9e9458-3508-41d0-8cc3-26b2a80ddd92"
                            }
                        ],
                        "id": "b5c4c99b8fd14f8199d43189f63ce84b",
                        "links": {
                            "files": "https://trng-b2share.eudat.eu/api/files/cc780879-cd89-4115-8a5c-dfa36473b63b",
                            "self": "https://trng-b2share.eudat.eu/api/records/b5c4c99b8fd14f8199d43189f63ce84b"
                        },
                        "metadata": {
                            "$schema": "https://trng-b2share.eudat.eu/api/communities/e9b9792e-79fb-4b07-b6b4-b9c2bd06d095/schemas/0#/json_schema",
                            "community": "e9b9792e-79fb-4b07-b6b4-b9c2bd06d095",
                            "community_specific": {},
                            "open_access": true,
                            "owners": [
                                5
                            ],
                            "publication_state": "published",
                            "titles": [
                                {
                                    "title": "fsdfsd"
                                }
                            ]
                        },
                        "updated": "2017-01-30T12:37:03.505354+00:00"
                    },
                    {
                        "created": "2017-01-30T12:38:14.634446+00:00",
                        "files": [
                            {
                                "bucket": "2f08873f-ce5d-4e04-af19-8d583351bc8d",
                                "checksum": "md5:d9afdfdcb59822747b5ec71c71738a08",
                                "key": "upload_test_3.txt",
                                "size": 227,
                                "version_id": "1cf2276a-14f2-40fe-9a47-9b7bcb2f27c6"
                            }
                        ],
                        "id": "048edde045364628839a20560792c3c9",
                        "links": {
                            "files": "https://trng-b2share.eudat.eu/api/files/2f08873f-ce5d-4e04-af19-8d583351bc8d",
                            "self": "https://trng-b2share.eudat.eu/api/records/048edde045364628839a20560792c3c9"
                        },
                        "metadata": {
                            "$schema": "https://trng-b2share.eudat.eu/api/communities/e9b9792e-79fb-4b07-b6b4-b9c2bd06d095/schemas/0#/json_schema",
                            "community": "e9b9792e-79fb-4b07-b6b4-b9c2bd06d095",
                            "community_specific": {},
                            "open_access": true,
                            "owners": [
                                5
                            ],
                            "publication_state": "published",
                            "titles": [
                                {
                                    "title": "fsdfsd"
                                }
                            ]
                        },
                        "updated": "2017-01-30T12:38:14.634454+00:00"
                    }
                ],
                "total": 106
            },
            "links": {
                "next": "https://trng-b2share.eudat.eu/api/records/?sort=mostrecent&q=&size=10&page=2",
                "self": "https://trng-b2share.eudat.eu/api/records/?sort=mostrecent&q=&size=10&page=1"
            }
        };

        assert.doesNotThrow(function () {
            client.searchDrafts(function (err, body) {
                assert.equal(JSON.stringify(body), JSON.stringify(expectedResult));
                done();
            }, done);
        });

    });

    it('getSpecificRecord with success', function (done) {
        var expectedResult = {
            "created": "2016-12-20T16:29:13.780432+00:00",
            "files": [
                {
                    "bucket": "48eb8716-4ddd-4794-9a6f-1d143b6d7f2d",
                    "checksum": "md5:c8afdb36c52cf4727836669019e69222",
                    "key": "myfile",
                    "size": 9,
                    "version_id": "1f67c84a-9d44-4d8a-a896-395ba17c7429"
                }
            ],
            "id": "a1c2ef96a1e446fa9bd7a2a46d2242d4",
            "links": {
                "files": "https://trng-b2share.eudat.eu/api/files/48eb8716-4ddd-4794-9a6f-1d143b6d7f2d",
                "self": "https://trng-b2share.eudat.eu/api/records/a1c2ef96a1e446fa9bd7a2a46d2242d4"
            },
            "metadata": {
                "$schema": "https://trng-b2share.eudat.eu/api/communities/99916f6f-9a2c-4feb-a342-6552ac7f1529/schemas/0#/json_schema",
                "community": "99916f6f-9a2c-4feb-a342-6552ac7f1529",
                "community_specific": {
                    "362e6f81-68fb-4d71-9496-34ca00e59769": {
                        "categories_of_data_collected": [
                            "Biological samples"
                        ],
                        "disease": "C61",
                        "material_type": [
                            "Other"
                        ],
                        "principal_investigator": "Amilcar Flores",
                        "sex": [
                            "Male"
                        ],
                        "study_description": "REST mediates androgen receptor actions on gene repression and predicts early recurrence of prostate cancer",
                        "study_design": [
                            "Other"
                        ],
                        "study_id": "REST",
                        "study_name": "REST"
                    }
                },
                "contact_email": "x@example.com",
                "descriptions": [
                    {
                        "description": "REST mediates androgen receptor actions on gene repression and predicts early recurrence of prostate cancer",
                        "description_type": "Abstract"
                    }
                ],
                "keywords": [
                    "prostate cancer",
                    "REST",
                    "TFBS",
                    "ChiP-seq"
                ],
                "open_access": true,
                "owners": [
                    1
                ],
                "publication_state": "published",
                "resource_types": [
                    {
                        "resource_type_general": "Text"
                    }
                ],
                "titles": [
                    {
                        "title": "REST paper 2014"
                    }
                ]
            },
            "updated": "2016-12-20T16:29:13.780441+00:00"
        };

        assert.doesNotThrow(function () {
            var recordID = 'a1c2ef96a1e446fa9bd7a2a46d2242d4';
            client.getSpecificRecord(recordID, function (err, body) {
                assert.equal(JSON.stringify(body), JSON.stringify(expectedResult));
                done();
            }, done);
        });

    });

    it('createADraftRecord with success', function (done) {
        var expectedStatusCode = '201';
        assert.doesNotThrow(function () {
            var data = {"titles":[{"title":"TestRest"}], "community":"e9b9792e-79fb-4b07-b6b4-b9c2bd06d095", "open_access":true, "community_specific": {}};
            client.createADraftRecord(data, function (err, body) {
                assert.equal(body.statusCode, expectedStatusCode);
                done();
            }, done);
        });

    });

    /*
    it('uploadFileIntoDraftRecord with success', function (done) {
        var expectedStatusCode = '201';
        var buffer = [];
        //var stream = new Stream.Writable();
        var stream = fs.createReadStream('test/testFile.txt');
        assert.doesNotThrow(function () {
            toArray(stream, function (err, arr) {
                var info = {"bucketID":"https://trng-b2share.eudat.eu/api/files/48eb8716-4ddd-4794-9a6f-1d143b6d7f2d", "fileName": "testFile.txt"};
                client.uploadFileIntoDraftRecord(info, arr, function (err, body) {
                    assert.equal(body.statusCode, expectedStatusCode);
                    done();
                }, done);
            },done);
        });

    });
    */

    it('listUploadedFilesInRecord with success', function (done) {
        var expectedStatusCode = '200';
        var buffer = [];
        assert.doesNotThrow(function () {
            var fileBucketID = '48eb8716-4ddd-4794-9a6f-1d143b6d7f2d';
            client.listUploadedFilesInRecord(fileBucketID, function (err, body) {
                assert.equal(body.statusCode, expectedStatusCode);
                done();
            }, done);
        });

    });

    it('updateDraftRecordMetadata with success', function (done) {
        var expectedStatusCode = '200';
        var recordID = '3e9b616937034495aa9ff220650714f4';
        var jsonPatchFormatData = [
            { "op": "replace", "path": "/titles/0/title", "value": "THIS is the changed title" }
        ];

        assert.doesNotThrow(function () {
            client.updateDraftRecordMetadata(recordID, jsonPatchFormatData, function (err, body) {
                assert.equal(body.statusCode, expectedStatusCode);
                done();
            }, done);
        });

    });

    it('submitDraftRecordForPublication with success', function (done) {
        var expectedStatusCode = '200';
        var recordID = '3e9b616937034495aa9ff220650714f4';

        assert.doesNotThrow(function () {
            client.submitDraftRecordForPublication(recordID, function (err, body) {
                assert.equal(body.statusCode, expectedStatusCode);
                done();
            }, done);
        });

    });
});