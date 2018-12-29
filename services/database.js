const MongoClient = require("mongodb").MongoClient;

var cfenv = require('cfenv');

const appEnv = cfenv.getAppEnv(appEnvOpts);

let services = appEnv.services;

let mongodb_services = services["mongodb-chatbot-final"];


let credentials = mongodb_services[0].credentials;

let options = {
  ssl: true,
  sslValidate: true
};

if (credentials.hasOwnProperty("ca_certificate_base64")) {
  let ca = [new Buffer(credentials.ca_certificate_base64, 'base64')];
  options.sslCA = ca;
}


let mongodb;

MongoClient.connect(credentials.uri, options, (err, db) => {
  if (err) {
    console.log(err);
  } else {
    mongodb = db.db("chatbot");
  }
});

export function addUser(user, conversation) {
  return new Promise((resolve, reject) => {
    mongodb.collection("users").insertOne({
      user: user,
      conversation: conversation
    },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
  });
}

export function getUsers() {
  return new Promise((resolve, reject) => {
    mongodb
      .collection("users")
      .find()
      .toArray((err, users) => {
        if (err) {
          reject(err);
        } else {
          resolve(users);
        }
      });
  });
}