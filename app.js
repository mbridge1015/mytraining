/*------------------------------------------
モジュール読み込み
------------------------------------------*/
//標準モジュール
var express = require('express'),
app = express();
//プロジェクトローカルモジュール読み込み
var conf = require(__dirname + '/conf');
var LcTop = require(__dirname + '/router/top');
var LcGit = require(__dirname + '/router/git');
//サードパーティモジュール読み込み
var logger = require('morgan');                     //ログを使うため（express4以降）事前にnpm install morgan
var bodyParser = require('body-parser');            //postを使うため（express4以降）事前にnpm install body-parser
var methodOverride = require('method-override');    //method-overrideを使うため（express4以降）　事前にnpm install method-override
var cookieParser   = require('cookie-parser');      //npm install cookie-parser//express Version4以降
var expressSession = require('express-session');    //npm install express-session//express Version4以降
var csrf           = require('csurf');              //npm install csurf //express Version4以降
/*------------------------------------------
ビュー設定
------------------------------------------*/
//ビューフォルダ
app.set('views',__dirname + '/views');
//ビューテンプレート
app.set('view engine','ejs');//ejsを利用する場合は、npm install ejs
/*------------------------------------------
ミドルウェア(順次適用)
------------------------------------------*/
//postを使う    
app.use(bodyParser.json());                         //express Version4以降
app.use(bodyParser.urlencoded({extended: true}));   //express Version4以降
app.use(cookieParser());
app.use(expressSession({secret: 'secret_key'}));
app.use(csrf());
app.use(function(req, res, next) {
  var token = req.csrfToken();
  res.locals.csrftoken = token;
  next();
});
//put・deleteを使う
app.use(methodOverride('_method'));                 //express Version4以降
//ログを使う
app.use(logger('dev')); //express Version4以降
//静的ファイルを使う
app.use('/public', express.static('public'));
/*------------------------------------------
ルーティング
//以下のテストコードで、起動を確認する
app.get('/', function(req,res){
    res.send(__dirname);
    }
);
------------------------------------------*/
app.get('/', LcTop.top);
app.get('/git', LcGit.index);                 //一覧画面遷移
app.get('/gitNew', LcGit.new);                //登録画面遷移
app.post('/gitNew/create', LcGit.newCreate);  //登録画面・登録処理

/*sample
app.get('/', post.index);
app.get('/posts/:id([0-9]+)', post.show);
app.get('/posts/new', post.new);
app.post('/posts/create', post.create);
app.get('/posts/:id/edit', post.edit);
//put・getを使用する場合は、view側の制御も必要
app.put('/posts/:id', post.update);
app.delete('/posts/:id', post.destroy);
*/
/*------------------------------------------
エラー処理
-------------------------------------------*/
app.use(function(err,req,res,next){
res.send(err.message);
});
/*------------------------------------------
リスナー
------------------------------------------*/
app.listen(conf.port);
console.log('server starting.....');