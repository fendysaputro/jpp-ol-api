var express = require('express');
var router = express.Router();
var UserModel = require('../models/user');
var JWT = require('../lib/jwtservice');
var md5 = require('../lib/hashservice');

router.get('/', function(req, res, next){

    UserModel.find({}, function(error, users){
        if (error){
            console.log("An error happened -&gt; " + JSON.stringify(error));
            return res.json({r:false, m: error})
        }
        res.json({r:true, m: "Success", d: users})
    });
});

router.get('/activate/:id', function(req, res, next){

});

router.post('/authenticate', function(req, res, next) {
    UserModel.find({email: req.body.email, passwd: md5.HashMD5(req.body.password)}, function(error, users){
        if(error){
            console.log("An error happened -&gt; " + JSON.stringify(error));
            return res.json({r:false, m: error})
        }
        console.log('find users:', users);
        if (users.length == 0){
            return res.json({r:false, m: "User or Password not found"});
        }

        var i = users[0].name;
        var s = users[0].email;
        var a = 'http://localhost:8002';

        var option = {
            issuer: i,
            subject: s,
            audience: a,
        }
        delete users[0].passwd;
        var data = users[0];
        var payload = {

        }
        var token = JWT.sign(payload, option);
            data['token'] = token;
        var verify = JWT.verify(token, option);
        verify['now'] = new Date();
        console.log(verify);
        res.json({r:true, m: "Success", d: data})
    });

});

router.post('/register', function(req, res, next){
    var User = new UserModel({
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        passwd: md5.HashMD5(req.body.password),
        token: ""
    });
    console.log(User);
    User.save(function(err){
        if (err) return res.json({r:false, m: err})

        res.json({r:true, m: "Success", d: User});
    });
})

module.exports = router;