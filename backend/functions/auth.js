let MongoClient = require("mongodb").MongoClient;
let ObjectID    = require("mongodb").OjectID;
let jwt         = require("jsonwebtoken");

let db;

MongoClient.connect("mongodb://localhost:27017", {useNewUrlParser: true}, function(err, client){
  db = client.db("simpleblog");
})

module.exports.login = function(req, res){
  db.collection("user").findOne({email: req.body.email}, function(err, foundOne){
    if(err) res.json({success: false, data: {message: "Server error mongodb!!!"}})
    if(!foundOne) res.json({success: false, data: {message: "Username or password is wrong"}})
    if(foundOne.password == req.body.password){
      let token = jwt.sign({
        email: foundOne.email,
        password: foundOne.password,
        _id: foundOne._id
      }, "theSecretKeyToEncryptAndDecrypt")
      res.json({success: true, data: { token: token, _id: foundOne._id}})
    } else res.json({success: false, data: {message: "Username or password is wrong"}})
  })
}
module.exports.signup = function(req, res){
  console.log(req.body)
  let now = new Date();
  req.body.createdAd = now;
  db.collection("user").findOne({email: req.body.email}, function(err, foundOne){
    if(err) res.json({success: false, data: {message: "Server error mongodb!!!"}})
    if(!foundOne){
      db.collection("user").insertOne(req.body, function(err, insertedOne){
        if(err) res.json({success: false, data: {message: "Server error mongodb!!!"}})
        res.json({success: true})
      })
    } else res.json({success: false, data: {message: "Username is already in use!!!"}})
  })
}

module.exports.mjolnir = function(req, res){
  jwt.verify(req.params.token, "theSecretKeyToEncryptAndDecrypt", function(err, decoded){
    if(err) res.json({success: false})
    if(decoded._id == req.params.id){
      console.log("You are worthed")
      res.json({success: true})
    }
    else res.json({success: false})
  })
}

module.exports.checkToken = function(req, res, next){
  jwt.verify(req.headers.authorization, "theSecretKeyToEncryptAndDecrypt", function(err, decoded){
    if(err) res.json({success: false})
    if(decoded){
      res.locals._id = decoded._id;
      next();
    }
    else res.json({success: false})
  })
}
