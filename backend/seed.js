const fs = require('fs');
let MongoClient = require("mongodb").MongoClient;
let ObjectID    = require("mongodb").OjectID;
let jwt         = require("jsonwebtoken");

let db;
let express     = require("express");
let bodyParser  = require("body-parser");
let cors        = require("cors");
let app         = express();

let rawdata = fs.readFileSync('./data/hutulbursurhoslol.json');
let student = JSON.parse(rawdata);
console.log(student);

MongoClient.connect("mongodb://localhost:27017", {useNewUrlParser: true}, function(err, client){
  db = client.db("simpleblog");
  db.collection("hutulbursurhoslol").insertMany(student, function(err, inserted){
    if(err) console.log("gg")
    else console.log("hha")
  })
  // db.collection("dun").find({}).toArray(function(err, many){
  //   let len = many.length;
  //   let i = 0;
  //   console.log("justFOund")
  //   many.forEach(function(item){
  //     setTimeout(function(){
  //       if(item.Үсгэн_дүн == 'A'){
  //         db.collection("classes").findOneAndUpdate({'Монгол_нэр': item.Хичээлийн_нэр, aa: { $exists: false }}, {$set: {aa: item.Үсгэн_дүн_тоо}}, function(err, foundOne){
  //           console.log('Hell:' + item._id)
  //           if(err) res.send("fuckedup")
  //           if(i+1 == len) res.send("duusaa")
  //           db.collection("dun").deleteOne({Хичээлийн_нэр: item.Хичээлийн_нэр}, function(err, deletedOne){
  //             if(err) res.send("fuckeduppp")
  //           })
  //         })
  //       }
  //       if(item.Үсгэн_дүн == 'A-'){
  //         db.collection("classes").findOneAndUpdate({'Монгол_нэр': item.Хичээлийн_нэр, a: { $exists: false }}, {$set: {a: item.Үсгэн_дүн_тоо}}, function(err, foundOne){
  //           console.log('Hell:' + item._id)
  //           if(err) res.send("fuckedup")
  //           if(i+1 == len) res.send("duusaa")
  //           db.collection("dun").deleteOne({Хичээлийн_нэр: item.Хичээлийн_нэр}, function(err, deletedOne){
  //             if(err) res.send("fuckeduppp")
  //           })
  //         })
  //       }
  //       if(item.Үсгэн_дүн == 'B'){
  //         db.collection("classes").findOneAndUpdate({'Монгол_нэр': item.Хичээлийн_нэр, bb: { $exists: false }}, {$set: {bb: item.Үсгэн_дүн_тоо}}, function(err, foundOne){
  //           console.log('Hell:' + item._id)
  //           if(err) res.send("fuckedup")
  //           if(i+1 == len) res.send("duusaa")
  //           db.collection("dun").deleteOne({Хичээлийн_нэр: item.Хичээлийн_нэр}, function(err, deletedOne){
  //             if(err) res.send("fuckeduppp")
  //           })
  //         })
  //       }
  //       if(item.Үсгэн_дүн == 'B-'){
  //         db.collection("classes").findOneAndUpdate({'Монгол_нэр': item.Хичээлийн_нэр, b: { $exists: false }}, {$set: {b: item.Үсгэн_дүн_тоо}}, function(err, foundOne){
  //           console.log('Hell:' + item._id)
  //           if(err) res.send("fuckedup")
  //           if(i+1 == len) res.send("duusaa")
  //           db.collection("dun").deleteOne({Хичээлийн_нэр: item.Хичээлийн_нэр}, function(err, deletedOne){
  //             if(err) res.send("fuckeduppp")
  //           })
  //         })
  //       }
  //       if(item.Үсгэн_дүн == 'C'){
  //         db.collection("classes").findOneAndUpdate({'Монгол_нэр': item.Хичээлийн_нэр, cc: { $exists: false }}, {$set: {cc: item.Үсгэн_дүн_тоо}}, function(err, foundOne){
  //           console.log('Hell:' + item._id)
  //           if(err) res.send("fuckedup")
  //           if(i+1 == len) res.send("duusaa")
  //           db.collection("dun").deleteOne({Хичээлийн_нэр: item.Хичээлийн_нэр}, function(err, deletedOne){
  //             if(err) res.send("fuckeduppp")
  //           })
  //         })
  //       }
  //       if(item.Үсгэн_дүн == 'C-'){
  //         db.collection("classes").findOneAndUpdate({'Монгол_нэр': item.Хичээлийн_нэр, c: { $exists: false }}, {$set: {c: item.Үсгэн_дүн_тоо}}, function(err, foundOne){
  //           console.log('Hell:' + item._id)
  //           if(err) res.send("fuckedup")
  //           if(i+1 == len) res.send("duusaa")
  //           db.collection("dun").deleteOne({Хичээлийн_нэр: item.Хичээлийн_нэр}, function(err, deletedOne){
  //             if(err) res.send("fuckeduppp")
  //           })
  //         })
  //       }
  //       if(item.Үсгэн_дүн == 'D'){
  //         db.collection("classes").findOneAndUpdate({'Монгол_нэр': item.Хичээлийн_нэр, dd: { $exists: false }}, {$set: {dd: item.Үсгэн_дүн_тоо}}, function(err, foundOne){
  //           console.log('Hell:' + item._id)
  //           if(err) res.send("fuckedup")
  //           if(i+1 == len) res.send("duusaa")
  //           db.collection("dun").deleteOne({Хичээлийн_нэр: item.Хичээлийн_нэр}, function(err, deletedOne){
  //             if(err) res.send("fuckeduppp")
  //           })
  //         })
  //       }
  //       if(item.Үсгэн_дүн == 'D-'){
  //         db.collection("classes").findOneAndUpdate({'Монгол_нэр': item.Хичээлийн_нэр, d: { $exists: false }}, {$set: {d: item.Үсгэн_дүн_тоо}}, function(err, foundOne){
  //           console.log('Hell:' + item._id)
  //           if(err) res.send("fuckedup")
  //           if(i+1 == len) res.send("duusaa")
  //           db.collection("dun").deleteOne({Хичээлийн_нэр: item.Хичээлийн_нэр}, function(err, deletedOne){
  //             if(err) res.send("fuckeduppp")
  //           })
  //         })
  //       }
  //       else {
  //         db.collection("classes").findOneAndUpdate({'Монгол_нэр': item.Хичээлийн_нэр, f: { $exists: false }}, {$set: {f: item.Үсгэн_дүн_тоо}}, function(err, foundOne){
  //           console.log('Hell:' + item._id)
  //           if(err) res.send("fuckedup")
  //           if(i+1 == len) res.send("duusaa")
  //           db.collection("dun").deleteOne({Хичээлийн_нэр: item.Хичээлийн_нэр}, function(err, deletedOne){
  //             if(err) res.send("fuckeduppp")
  //           })
  //         })
  //       }
  //     }, i * 1000)});
  // })
})
// app.get("/hha", function(req, res){
//
// })
app.listen(8081);
