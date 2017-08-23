var MongoClient = require('mongodb').MongoClient,
conf = require('../conf');

exports.show = function(req,res){
    res.render('./new');
};
exports.create = function(req,res){
    /*
    現在の MongoDB の初期設定では
    「{ [MongoError: connect ECONNREFUSED] name: 'MongoError', message: 'connect ECONNREFUSED' }」
    というエラーが出て接続に失敗してしまいます。
    */
    //MongoClient.connect("mongodb://"+settings.host+"/"+settings.db,function(err,db){
    MongoClient.connect("mongodb://localhost/"+conf.mdbname,function(err,db){
        if(err){return console.dir(err);}
        console.log("connected to db for inserting");
        db.collection("users",function(err,collection){
            //データを挿入する
            var docs={
                title:req.body.title,
                body:req.body.body
            };
            collection.insert(docs,function(err,result){
                console.dir(result);
            });
        });
    });
    res.redirect('/index');
};