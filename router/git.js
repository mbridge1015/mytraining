var MongoClient = require('mongodb').MongoClient,
conf = require('../conf');

exports.index = function(req,res){
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
    MongoClient.connect(conf.mdbname,function(err,db){
        if(err){return console.dir(err);}
        console.log("connected to db for inserting");
        db.collection("mygit",function(err,collection){
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
exports.edit = function(req,res){
    console.log(req.params.id);
    MongoClient.connect(conf.mdbname,function(err,db){
        if(err){return console.dir(err);}
        console.log("connected to db for find_edit");
        db.collection("mygit",function(err,collection){
            //req.params.idにStringをかまさないと検索できなかった。
            collection.find({title: String(req.params.id)}).toArray(function(err,items){
            //本来はIdで検索したい
            //collection.find({_id:ObjectId(String(req.params.id))}).toArray(function(err,items){
                console.dir(items);
                res.render('./gitEdit',{mdata:items});   
            });
        });
    });
};
exports.update = function(req,res){
    MongoClient.connect(conf.mdbname,function(err,db){
        if(err){return console.dir(err);}
        console.log("connected to db for update");
        db.collection("mygit",function(err,collection){
            collection.update(
                {_id:req.params.id},
                {$set:{title:req.body.title}}, {body:req.body.body},
                function(err,result){
                console.dir(result);
            });
        });
    });
    res.redirect('/git');
};