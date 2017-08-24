var MongoClient = require('mongodb').MongoClient,
conf = require('../conf');

exports.index = function(req,res){
    /*
    現在の MongoDB の初期設定では
    「{ [MongoError: connect ECONNREFUSED] name: 'MongoError', message: 'connect ECONNREFUSED' }」
    というエラーが出て接続に失敗してしまいます。
    */
    //MongoClient.connect("mongodb://"+settings.host+"/"+settings.db,function(err,db){
    MongoClient.connect(conf.mdbname,function(err,db){
        if(err){return console.dir(err);}
        console.log("connected to db for find");
        db.collection("mygit",function(err,collection){
            collection.find().toArray(function(err,items){
                console.dir(items);
                res.render('./git',{mdata:items});   
            });
            /*streamの画面表示については、別途
            var stream = collection.find().stream();
            stream.on("data",function(item){
                console.log(item);
            });
            stream.on("end",function(){
                console.log("finished.");
            });
            */
        });
    });
}

exports.new = function(req,res){
    res.render('./gitNew');
};
exports.newCreate = function(req,res){
    /*
    現在の MongoDB の初期設定では
    「{ [MongoError: connect ECONNREFUSED] name: 'MongoError', message: 'connect ECONNREFUSED' }」
    というエラーが出て接続に失敗してしまいます。
    */
    //MongoClient.connect("mongodb://"+settings.host+"/"+settings.db,function(err,db){
    MongoClient.connect(conf.mdbname,function(err,db){
        if(err){return console.dir(err);}
        console.log("connected to db for inserting");
        db.collection("mygit",function(err,collection){
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
    res.redirect('/git');
};