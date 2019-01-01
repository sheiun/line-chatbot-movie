const MongoClient = require("mongodb").MongoClient;

var cfenv = require('cfenv');
let vcapLocal;
try {
  vcapLocal = require('./vcap-local.json');
  console.log("Loaded local VCAP");
} catch (e) {
  console.log(e)
}

const appEnvOpts = vcapLocal ? {
  vcap: vcapLocal
} : {}

const appEnv = cfenv.getAppEnv(appEnvOpts);

let services = appEnv.services;

let mongodb_services = services["compose-for-mongodb"];

let credentials = mongodb_services[0].credentials;

let options = {
  ssl: true,
  sslValidate: true,
  useNewUrlParser: true
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
    console.log('hello chatbot');

  }
});

function createUser(userId) {
  return new Promise((resolve, reject) => {
    mongodb
      .collection("users")
      .insertOne(
        {
          userId: userId,
          context: {}
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      )
  });
}

function addUser(userId, context) {
  return new Promise((resolve, reject) => {
    mongodb
      .collection("users")
      .updateOne(
        {
          userId: userId,
          context: context
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

function getUser(userId) {

}

function getUsers() {
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

function deleteUser(userId) {
  return new Promise((resolve, reject) => {
    mongodb
      .collection("users")
      .find()
      .(err, users) => {
      if (err) {
        reject(err);
      } else {
        resolve(users);
      }
    };
  });
}

module.exports = { createUser, addUser, getUsers, deleteUser }