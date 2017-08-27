var MongoClient = require('mongodb').MongoClient,
conf = require('../conf');

exports.onload = function(req,res){
    res.render('./jseOnload');
};
exports.evenyHandler= function(req,res){
    res.render('./jseEvenyHandler');
};