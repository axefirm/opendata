var express = require('express')
var router = express.Router();
let auth = require("../functions/auth.js");
let info = require("../functions/info.js")
let data = require("../functions/data.js")
router.post("/signup", auth.signup)

router.post("/login", auth.login)

router.get("/mjolnir/:id/:token", auth.mjolnir)

router.get("/info", auth.checkToken, info.profile)

router.get("/getmajors/:id", info.getMajors)

router.get("/getclasses", info.getClasses)

router.get("/getschoolmajors/:names", info.getSchoolMajors)

router.post("/insertClass", auth.checkToken, data.insertClass)

router.get("/getmajordata", auth.checkToken, info.getmajordata)

router.get("/getclass/:name", auth.checkToken, info.getClass)
// router.get("/")
// router.get("/asdfasdf", auth.checkToken, info.asdfasd);
module.exports = router;
