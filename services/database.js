const MongoClient = require("mongodb").MongoClient;

let mongodb_services = services["compose-for-mongodb"];
let credentials = mongodb_services[0].credentials;

let mongodb;

MongoClient.connect(credentials.uri, options, function (err, db) {
  if (err) {
    console.log(err);
  } else {
    mongodb = db.db("users");
  }
});