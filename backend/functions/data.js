let MongoClient = require("mongodb").MongoClient;
let ObjectID    = require("mongodb").ObjectID;
let jwt         = require("jsonwebtoken");

let db;

MongoClient.connect("mongodb://localhost:27017", {useNewUrlParser: true}, function(err, client){
  db = client.db("simpleblog");
})

// fundamental data
module.exports.insertClass = function(req, res){
  console.log(req.body)
  db.collection("classes").findOneAndUpdate({_id: ObjectID(req.body._id)}, {$set: {parent: req.body.parent, child: req.body.child}, $addToSet: {majors: {$each: req.body.majors}}}, function(err, updatedOne){
    console.log(req.body._id)
    if(err) res.json({success: false})
    else{
      req.body.majors.forEach(function(item){
        db.collection("hutulbur").findOneAndUpdate({_id: ObjectID(item._id)}, { $addToSet: {classes: {name: req.body.Монгол_нэр, index: req.body.Хичээлийн_индекс, importancy: item.importancy}}}, function(err, updated){
          if(err) res.json({success: false, error: err})
          if(item._id == req.body.majors[req.body.majors.length - 1]._id) res.json({success: true})
        })
      })
    }
  })
  // db.collection("classes").findOneAndUpdate({_id: ObjectID(req.body._id)}, {$set: {parents: req.body.parents, child: req.body.child}, $addToSet: {majors: {$each: req.body.majors}}}, function(err, updatedOne){
  //   if(err) res.json({success: false})
  //   let len = req.body.majors.length;
  //   let i = 0;
  //   for(; i < len;){
  //     db.collection("major").findOne({name: req.body.majors[i].name}, function(err, foundOne){
  //       if(err) res.json({success: false})
  //       else {
  //         if(!foundOne) db.collection("major").insertOne({name: req.body.majors[i].name, classes: [{name: req.body.name, id: req.body.id, credits: req.body.credits, importancy: req.body.majors[i].importancy}]}, function(err, createdOne){
  //           if(err) res.json({success: false})
  //           console.log(req.body.majors[i].name + " " + req.body.name);
  //           if(i + 1 == len) res.json({success: true})
  //         })
  //         else {
  //           foundOne.classes.push({name: req.body.name, id: req.body.id, credits: req.body.credits, importancy: req.body.majors[i].importancy})
  //           db.collection("major").updateOne({name: req.body.majors[i].name}, {$set: foundOne}, function(err, updatedOne){
  //             if(err) res.json({success: false})
  //             if(i + 1 == len) res.json({success: true})
  //           })
  //         }
  //         i++;
  //       }
  //     })
  //   }
  //   // else res.json({success: true})
  // })
}

// client data

module.exports.major = function(req, res){
  db.collection("user").findOne({_id: res.locals._id}, function(err, foundOne){
    foundOne.major = req.body.major;
    db.collection("user").updateOne({_id: res.locals._id}, {$set: foundOne}, function(err, updatedOne){
      if(err) res.json({success: false})
      else res.json({success: true})
    })
  })
}

module.exports.classes = function(req, res){
  db.collection("user").findOne({_id: res.locals._id}, function(err, foundOne){
    foundOne.classes = req.body.classes;
    db.collection("user").updateOne({_id: res.locals._id}, { $set: foundOne}, function(err, updatedOne){
      if(err) res.json({success: false})
      else res.json({success: true})
    })
  })
}
