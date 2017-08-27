var MongoClient = require('mongodb').MongoClient,
conf = require('../conf');
var rdata;

exports.index = function(req,res){
    console.log(res);
    res.render('./webbase',{rdata:rdata});
};
exports.get = function(req,res){
    console.log(req);
    var numExistChk;
    //チェックボックスがノーチェックであった場合、そのプロパティは送信されない
    if (undefined ===  req.query.gCheckBox) {
        console.log('gCheckBox is undefinend')
    }else{
        console.log('gCheckBox.length:' + req.query.gCheckBox.length);        
    };
    //テキストは送信されるよう
    console.log('pText.length:' + req.query.gText.length);
    rdata = JSON.stringify(req.query);//getした場合、bodyはないので、queryでとる。他はbody
    res.render('./webbase',{rdata:rdata});
};
exports.post = function(req,res){
    console.log(req.body);
    var numExistChk;
    //チェックボックスがノーチェックであった場合、そのプロパティは送信されない
    if (undefined ===  req.body.pCheckBox) {
        console.log('pCheckBox is undefinend')
    }else{
        console.log('pCheckBox.length:' + req.body.pCheckBox.length);        
    };
    //テキストは送信されるよう
    console.log('pText.length:' + req.body.pText.length);
    rdata = JSON.stringify(req.body);
    //res.redirect('/web');
    res.render('./webbase',{rdata:rdata});
};
exports.put = function(req,res){
    console.log(req);
    var numExistChk;
    //チェックボックスがノーチェックであった場合、そのプロパティは送信されない
    if (undefined ===  req.body.uCheckBox) {
        console.log('gCheckBox is undefinend')
    }else{
        console.log('gCheckBox.length:' + req.body.uCheckBox.length);        
    };
    //テキストは送信されるよう
    console.log('uText.length:' + req.body.uText.length);
    rdata = JSON.stringify(req.body);
    res.render('./webbase',{rdata:rdata});
};
exports.delete = function(req,res){
    console.log(req.body);
    var numExistChk;
    //チェックボックスがノーチェックであった場合、そのプロパティは送信されない
    if (undefined ===  req.body.dCheckBox) {
        console.log('dCheckBox is undefinend')
    }else{
        console.log('dCheckBox.length:' + req.body.dCheckBox.length);        
    };
    //テキストは送信されるよう
    console.log('dText.length:' + req.body.dText.length);
    rdata = JSON.stringify(req.body);
    res.redirect('/webbase');
};