var express = require('express')
var router = express.Router();
let auth = require("../functions/auth.js");
let info = require("../functions/info.js")
let data = require("../functions/data.js")
router.post("/signup", auth.signup)

router.post("/login", auth.login)

router.get("/mjolnir/:id/:token", auth.mjolnir)

router.get("/info", auth.checkToken, info.profile)

router.get("/getmajors/:id", auth.checkToken, info.getMajors)

router.get("/getclasses", auth.checkToken, info.getClasses)

router.get("/getschoolmajors/:names", auth.checkToken, info.getSchoolMajors)

router.post("/insertClass", auth.checkToken, data.insertClass)

router.get("/getmajordata", auth.checkToken, info.getmajordata)
// router.get("/")
// router.get("/asdfasdf", auth.checkToken, info.asdfasd);
module.exports = router;
