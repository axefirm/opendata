let MongoClient = require("mongodb").MongoClient;
let ObjectID    = require("mongodb").ObjectID;
let jwt         = require("jsonwebtoken");
let async       = require('async');
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
  db.collection("user").findOne({_id: ObjectID(res.locals._id)}, function(err, foundOne){
    let data = [];
    if(!foundOne.next){
      async.each(foundOne.classes, function(item, callback){
        db.collection("classes").findOne({Хичээлийн_индекс: item.Хичээлийн_индекс}, function(err, foundItem){
          // console.log(foundItem)
          if(err) callback(err)
          else {
            if(foundItem) data.push(foundItem)
            callback();
          }
        })
      }, function(err){
        if(err) res.json({success: false})
        else{
          console.log(data.length)
          let children = [];
          async.each(data, async function(itembig, callback1){
            await async.forEachOf(itembig.child, function(childdd, key, callback2){
              let b = false
              children.push(childdd);
            }, function(err){
              console.log("S")
              callback1();
            })
          }, function(err){
            res.json({success: true, data: children})
          })
        }
      })
    } else res.json({success: true, data: next})
  })
}

// module.exports.getmajordata = function(req, res){
//   db.collection("user").findOne({_id: ObjectID(res.locals._id), next: { $exists: true }}, function(err, foundOne){
//     if(err) res.json({success: false})
//     else {
//       if(!foundOne){
//         db.collection("user").findOne({_id: ObjectID(res.locals._id)}, function(err, foundUser){
//           if(err) res.json({success: false})
//           if(!foundUser) res.json({success: false})
//           else {
//             let mySet = [];
//             foundUser.classes.forEach(function(item){
//               db.collection("classes").findOne({Хичээлийн_индекс: item.Хичээлийн_индекс}, function(err, foundClass){
//                 foundClass.child.forEach(function(smt){
//                   let b = false;
//                   mySet.forEach(function(setitem){
//                     if(setitem.Хичээлийн_индекс == smt) b = true
//                   })
//                   if(b == false) mySet.push(foundClass);
//                 })
//               })
//             })
//           }
//         })
//       } else {
//         res.json({success: true, data: foundOne.next})
//       }
//     }
//   })
// }

module.exports.getMajors = function(req, res){
  console.log("HHE")
  db.collection("classes").findOne({Хичээлийн_индекс: req.params.id}, function(err, foundOne){
    db.collection("hutulbur").find({Харьяалах_нэгжийн_нэр: foundOne.Харьяалах_тэнхим}, {projection: {classes: 0}}).toArray(function(err, foundMany){
      if(err) res.json({success: false})
      else res.json({success: true, data: foundMany})
    })
  })
}

module.exports.getClass = function(req, res){
  db.collection("classes").findOne({Хичээлийн_индекс: req.params.name}, function(err, mainclass){
    if(err) res.json(err);
    else res.json(mainclass);
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
  db.collection("hutulbursurhoslol").distinct("Хөтөлбөрийн_нэр", {Cургуулийн_нэр: { $in: data }, Төлөв: "Идэвхтэй сурч байгаа"}, function(err, foundMany){
    console.log(foundMany)
    db.collection("hutulbur").find({Хөтөлбөрийн_монгол_нэр: {$in: foundMany}}, {projection: {classes: 0}}).toArray(function(err, foundManyMany){
      if(err) res.json({success: false})
      else res.json({success: true, data: foundManyMany})
    })
  })
}

module.exports.profile = function(req, res){
  // console.log(req.headers)
  res.json({name: "Mergen", age: 19});
}
