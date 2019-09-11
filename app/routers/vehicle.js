var express = require('express');
var router = express.Router();
var ottoman = require('../../db').ottoman;
var VehicleModel = require('../models/vehicle');

router.get('/', function(req, res, next){
    var options = {
        limit: req.body.limit,
        skip: req.body.skip,
        consistency: ottoman.Consistency.LOCAL
    };
    VehicleModel.find({}, options, function(error, vehicles){
        if(error){
            console.log("An error happened -&gt; " + JSON.stringify(error));
            return res.json({r:false, m: error})
        }

        res.json({r:true, m: "Success", d: vehicles})
    });
});

module.exports = router;