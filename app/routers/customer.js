var express = require('express');
var router = express.Router();
var CustomerModel = require('../models/customer');
var JWT = require('../lib/jwtservice');
var md5 = require('../lib/hashservice');
var ottoman = require('../../db').ottoman;

router.get('/', function(req, res, next){
    var option = {
        limit: req.query.limit,
        skip: req.query.skip,
        consistency: ottoman.Consistency.LOCAL
    };
    CustomerModel.find({}, function(error, vendors){
        if(error){
            console.log("An error happened -&gt; " + JSON.stringify(error));
            return res.json({r:false, m:error})
        } 

        res.json({r:true, m: "Success", d: vendors})
    });
});

router.post('/authenticate', function(req, res, next){
    CustomerModel.find({email: req.body.email, password: req.body.password}, function(error, customers){
        if(error){
            console.log("An error happened -&gt; " + JSON.stringify(error));
            return res.json({r:false, m:error})
        }
        if (customers.length == 0){
            return res.json({r:false, m:"User or Password not found"});
        }

        var i = customers[0].name;
        var s = customers[0].email;
        var a = 'http://localhost:8002';

        var option = {
            issuer: i,
            subject: s, 
            audience: a,
        }
        delete customers[0].password;
        var data = customers[0];
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
    var Customer = new CustomerModel({
        name : req.body.name,
        phone : req.body.phone,
        email : req.body.email,
        contact_person: req.body.contact_person,
        // password : md5.HashMD5(req.body.password),
        password : req.body.password,
        token: ""
    });
    console.log(Customer);
    Customer.save(function(err){
        if (err) return res.json({r:false, m: err})

        res.json({r:true, m: "Success", d: Customer});
    });
})

module.exports = router;