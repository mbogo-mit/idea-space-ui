// Seeds the DB with collections and their validation schemas.

// Requires
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'ideaspace-next';

const client = new MongoClient(url, { useNewUrlParser: true });

client.connect(function (err) {
    assert.equal(null, err);
    console.log("Connected successfully to server");

    const db = client.db(dbName);

    // Users validator
    db.createCollection('users',{
        validator: {
            $jsonSchema: {
                bsonType: "object",
                required: ["firstname", "lastname", "email", "as_id", "as_tenant", "auth_token"],
                properties: {
                    firstname: {
                        bsonType: "string",
                        description: "must be a string and is required"
                    },
                    lastname: {
                        bsonType: "string",
                        description: "must be a string and is required"
                    },
                    email: {
                        bsonType: "string",
                        description: "must be a string and is required"
                    },
                    as_id: {
                        bsonType: "int",
                        description: "must be a 32bit integer and is required"
                    },
                    as_tenant: {
                        enum: ["amherst", "andersen", "app", "barnard", "breck", "bucknell", "demo", "gatech", "grinnell", "harvard", "humboldt", "merchant-of-venice", "mit", "newhaven", "stonybrook", "uma","umb","uw","vassar","washjeff","wellesley","wheatoncollege","wit","wlu"],
                        description: "must be one of these enum elements and is required"
                    },
                    auth_token: {
                        bsonType: "string",
                        description: "must be a string and is required"
                    }
                }
            }
        },
        validationAction: "error"
    }, function (err, results) {

        // Outlines validator
        db.createCollection('outlines',{
            validator: {
                $jsonSchema: {
                    bsonType: "object",
                    required: ["type", "members", "content"],
                    properties: {
                        type: {
                            enum: ["outline", "template"],
                            description: "must be string 'outline' or 'template' and is required"
                        },
                        members: {
                            bsonType: "array",
                            items: {
                                bsonType: "objectId"
                            },
                            description: "must be an array of ObjectIDs (from users collection) and is required"
                        },
                        content: {
                            bsonType: "object",
                            required: ["title"],
                            proprties: {
                                title: {
                                    bsonType: "string",
                                    description: "must be a string and is required"
                                },
                                block_ids: {
                                    bsonType: "array",
                                    items: {
                                        bsonType: "objectId"
                                    },
                                    description: "must be an array of ObjectIDs from outline_blocks collection"
                                }
                            }
                        },
                        date_modified: { // date created can be ascertained from ObjectID(_id).getTimestamp()
                            bsonType: "timestamp",
                            description: "must be a Timestamp"
                        }
                    }
                }
            },
            validationAction: "error"
        }, function (err, result) {


            // Outline_blocks validator
            db.createCollection("outline_blocks",{
                validator: {
                    $jsonSchema: {
                        bsonType: "object",
                        required: ["type", "inner_html"],
                        properties: {
                            type: {
                                enum: ["note", "section", "annotation"],
                                description: "must be string 'note', 'section', or 'annotation' and is required"
                            },
                            inner_html: {
                                bsonType: "string",
                                description: "must be a string and is required"
                            },
                            children: {
                                bsonType: "array",
                                items: {
                                    bsonType: "objectId"
                                },
                                description: "must be an array of ObjectIDs from outline_blocks collection"
                            }
                        }
                    }
                },
                validationAction: "error"
            }, function (err, result) {

                // Template_blocks validator
                db.createCollection('template_blocks',{
                    validator: {
                        $jsonSchema: {
                            bsonType: "object",
                            required: ["type", "inner_html"],
                            properties: {
                                type: {
                                    enum: ["note", "section", "annotation"],
                                    description: "must be string 'note', 'section', or 'annotation' and is required"
                                },
                                inner_html: {
                                    bsonType: "string",
                                    description: "must be a string and is required"
                                },
                                children: {
                                    bsonType: "array",
                                    items: {
                                        bsonType: "objectId"
                                    },
                                    description: "must be an array of ObjectIDs from template_blocks collection"
                                }
                            }
                        }
                    },
                    validationAction: "error"
                }, function (err, result) {

                    // Idea_spaces validator
                    db.createCollection('idea_spaces',{
                        validator: {
                            $jsonSchema: {
                                bsonType: "object",
                                required: ["name", "members"],
                                properties: {
                                    name: {
                                        bsonType: "string",
                                        description: "must be a string and is required"
                                    },
                                    members: {
                                        bsonType: "array",
                                        items: {
                                            bsonType: "objectId"
                                        },
                                        description: "must be an array of ObjectIDs (from users collection) and is required"
                                    },
                                    date_modified: { // date created can be ascertained from ObjectID(_id).getTimestamp()
                                        bsonType: "timestamp",
                                        description: "must be a Timestamp"
                                    },
                                    annotations: {
                                        bsonType: "array",
                                        items: {
                                            bsonType: "objectId"
                                        },
                                        description: "must be an array of ObjectIDs (from annotations.mit.edu)"
                                    }
                                }
                            }
                        },
                        validationAction: "error"
                    }, function () {
                        client.close();
                    });
                });
            });
        });
    });
});
