var MongoClient = require('mongodb').MongoClient,
conf = require('../conf');

exports.top = function(req,res){
    res.render('./top');
};