var MongoClient = require('mongodb').MongoClient,
conf = require('../conf');

exports.index = function(req,res){
    /*
    現在の MongoDB の初期設定では
    「{ [MongoError: connect ECONNREFUSED] name: 'MongoError', message: 'connect ECONNREFUSED' }」
    というエラーが出て接続に失敗してしまいます。
    */
    //MongoClient.connect("mongodb://"+settings.host+"/"+settings.db,function(err,db){
    MongoClient.connect("mongodb://localhost/"+conf.mdbname,function(err,db){
        if(err){return console.dir(err);}
        console.log("connected to db for find");
        db.collection("users",function(err,collection){
            collection.find().toArray(function(err,items){
                console.dir(items);
                res.render('./index',{mdata:items});   
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
/*WEB API検討中*/
exports.indexStream = function(req,res){
    /*
    現在の MongoDB の初期設定では
    「{ [MongoError: connect ECONNREFUSED] name: 'MongoError', message: 'connect ECONNREFUSED' }」
    というエラーが出て接続に失敗してしまいます。
    */
    //MongoClient.connect("mongodb://"+settings.host+"/"+settings.db,function(err,db){
    MongoClient.connect("mongodb://localhost/"+conf.mdbname,function(err,db){
        if(err){return console.dir(err);}
        console.log("connected to db for find");
        db.collection("users",function(err,collection){
            //stream
            var mdata = [];
            var stream = collection.find().stream();
            stream.on("data",function(item){
                console.log(item);
                res.redirect('/index');  
                //res.send(item);
            });
            stream.on("end",function(){
                console.log("finished.");
            });
        });
    });
}