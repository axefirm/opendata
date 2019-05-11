let MongoClient = require("mongodb").MongoClient;
let ObjectID    = require("mongodb").OjectID;
let jwt         = require("jsonwebtoken");

let db;

MongoClient.connect("mongodb://localhost:27017", {useNewUrlParser: true}, function(err, client){
  db = client.db("simpleblog");
})
//
// module.exports.getClasses = function(req, res){
//   db.collection("class").find().toArray(function(err, foundMany){
//
//   })
// }

module.exports.getMajors = function(req, res){
  db.collection("major").find({}, {}).toArray(function(err, foundMany){
    if(err) res.json({success: false});
    res.json({success: true, data: foundMany})
  })
}

module.exports.getClasses = function(req, res){
  db.collection("classes").find({}, {projection: {Монгол_нэр: 1, Хичээлийн_индекс: 1}}).toArray(function(err, foundMany){
    if(err) res.json({success: false})
    else res.json({success: true, data: foundMany})
  })
}
module.exports.profile = function(req, res){
  // console.log(req.headers)
  res.json({name: "Mergen", age: 19});
}
