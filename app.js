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
var LcWeb = require(__dirname + '/router/web');
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
app.get('/', LcTop.top);                        //初回画面
//WebBase
app.get('/webbase', LcWeb.index);                   //WEBサンプル画面
app.get('/webbase/get', LcWeb.get);                 //Formアクション(get)
app.post('/webbase/post', LcWeb.post);              //Formアクション(post)
app.put('/webbase/put', LcWeb.put);                 //Formアクション(get)
app.delete('/webbase/delete', LcWeb.delete);        //Formアクション(post)
//Git
app.get('/git', LcGit.index);                   //一覧画面遷移
app.get('/gitNew', LcGit.new);                  //登録画面遷移
app.post('/gitNew/create', LcGit.newCreate);    //登録画面・登録処理
app.get('/gitEdit/:id', LcGit.edit);            //更新画面に遷移
app.put('/gitEdit/update/:id', LcGit.update);   //変更処理
app.delete('/git/delete/:id', LcGit.delete);    //削除処理
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