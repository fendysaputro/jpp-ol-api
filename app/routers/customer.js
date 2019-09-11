var express = require('express');
var router = express.Router();
var CustomerModel = require('../models/customer');
var jwt = require('../lib/jwtservice');
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
    })
})