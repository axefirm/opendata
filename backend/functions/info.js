let MongoClient = require("mongodb").MongoClient;
let ObjectID    = require("mongodb").ObjectID;
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

module.exports.getmajordata = function(req, res){
  db.collection("user").findOne({_id: ObjectID(res.locals._id), next: { $exists: true }}, function(err, foundOne){
    if(err) res.json({success: false})
    else {
      if(!found){
        db.collection("user").findOne({_id: ObjectID(res.locals._id)}, function(err, foundUser){
          if(err) res.json({success: false})
          if(!foundUser) res.json({success: false})
          else {
            let mySet = new Set();
            foundUser.classes.forEach(function(item){
              db.collection("classes").findOne({Хичээлийн_индекс: item.Хичээлийн_индекс}, function(err, foundClass){
                foundClass.child.forEach(function(smt){
                  mySet.add(foundClass);
                })
              })
            })
          }
        })
      } else {
        res.json({success: true, data: foundOne.next})
      }
    }
  })
}

module.exports.getMajors = function(req, res){
  console.log("HHE")
  db.collection("classes").findOne({Хичээлийн_индекс: req.params.id}, function(err, foundOne){
    db.collection("hutulbur").find({Харьяалах_нэгжийн_нэр: foundOne.Харьяалах_тэнхим}).toArray(function(err, foundMany){
      if(err) res.json({success: false})
      else res.json({success: true, data: foundMany})
    })
  })
}

module.exports.getClasses = function(req, res){
  db.collection("classes").find({}, {projection: {Монгол_нэр: 1, Хичээлийн_индекс: 1, Багц_цаг: 1}}).toArray(function(err, foundMany){
    if(err) res.json({success: false})
    else res.json({success: true, data: foundMany})
  })
}

module.exports.getSchoolMajors = function(req, res){
  let data = req.params.names.split(",");
  console.log(data)
  for(i = 0; i < data.length; i++){
    if(data[i] == 'БС') data[i] = "Бизнесийн сургууль";
    if(data[i] == 'ШУС') data[i] = "Шинжлэх ухааны сургууль";
    if(data[i] == 'ХШУИС') data[i] = "Хэрэглээний шинжлэх ухаан, инженерчлэлийн сургууль";
    if(data[i] == 'ОУХНУС') data[i] = "Олон улсын харилцаа, нийтийн удирдлагын сургууль";
    if(data[i] == 'ХЗС') data[i] = "Хууль зүйн сургууль";
  }
  db.collection("hutulbursurhoslol").find({Cургуулийн_нэр: { $in: data }, Төлөв: "Идэвхтэй сурч байгаа"}).toArray(function(err, foundMany){
    console.log(foundMany)
    if(err) res.json({success: false})
    else res.json({success: true, data: foundMany})
  })
}

module.exports.profile = function(req, res){
  // console.log(req.headers)
  res.json({name: "Mergen", age: 19});
}
