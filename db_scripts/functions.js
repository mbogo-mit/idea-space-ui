// Seed the DB with test data.

// Requires
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'ideaspace-next';

module.exports.client = new MongoClient(url, { useNewUrlParser: true });

module.exports.insertUser = function (db, callback) {
  const collection = db.collection('users');
  collection.insertOne(
    { 'firstname': 'Ben', 'lastname': 'Silverman', 'email': 'bsilverm@mit.edu', 'as_id': 5, 'as_tenant': 'mit', 'auth_token': 'FakeAuthToken' }
    , function (err, result) {
      assert.equal(err, null);
      console.log("Inserted user");
      callback(result);
    });
}
module.exports.findUser = function (db, callback) {
  const collection = db.collection('users');
  collection.findOne({ 'email': 'bsilverm@mit.edu' },
    function (err, doc) {
      assert.equal(err, null);
      console.log("Found the following user: "+doc.firstname+' '+doc.lastname);
      callback({ data: doc });
    });
}
module.exports.insertOutline = function (db, callback, user) {
  const collection = db.collection('outlines');
  collection.insertOne(
    { 'type': 'outline', 'members': [user._id], 'content': { 'name': 'My First Outline' }, 'testing_purposes':'true' },
    function (err, result) {
      assert.equal(err, null);
      console.log("Created outline, inserted user into outline");
      callback(result);
    }
  );
}

module.exports.insertIdeaSpace = function (db, callback, user) {
  const collection = db.collection('idea_spaces');
  collection.insertOne({'name':'My First Idea Space','members':[user._id],'annotations':[ObjectId.createFromHexString("5bd9f6ca2912e30400bc6dab"), ObjectId.createFromHexString("5bd9f493bf7bbe040070e080"), ObjectId.createFromHexString("5bd9f411bf7bbe040070e07a")]},
    function (err, result) {
      assert.equal(err, null);
      console.log("Created idea space, inserted user and annotations");
      callback(result);
    }
  );
}

module.exports.insertOutlineBlocks = function (db, callback) {
  const collection = db.collection('outline_blocks');
  collection.insertMany([{'type':'section','inner_html':'Section One'},{'type':'section','inner_html':'Section Two'},{'type':'note','inner_html':'Note One'},{'type':'note','inner_html':'Note Two'},{'type':'annotation','inner_html':'Annotation One'}],
    function (err, result) {
      assert.equal(err, null);
      console.log("Created 5 outline blocks");
      callback({data: result});
    }
  );
}

module.exports.putBlocksInOutline = function (db, callback, blocks){
  const collection = db.collection('outlines');
  var blockArray = [];
  for(var key in blocks.insertedIds){
    blockArray.push(blocks.insertedIds[key]);
  }
  collection.findOneAndUpdate({'testing_purposes':'true'},{'$set':{
    'content.block_ids':blockArray
  }},function(err, result){
    assert.equal(err, null);
    console.log("Inserted blocks into outline");
    callback(result);
  });
}

// Use callbacks
/*
client.connect(function (err) {
  assert.equal(null, err);
  console.log("Connected successfully to server");


  const db = client.db(dbName);

  insertUser(db, function () {
    findUser(db, function (foundUser) {
      insertOutline(db, function () {
        insertIdeaSpace(db, function () {
          insertOutlineBlocks(db, function (insertedBlocks) {
            putBlocksInOutline(db, function () {
              client.close();
            },insertedBlocks.data);
          });
        }, foundUser.data);
      }, foundUser.data);
    });
  });


});

*/
