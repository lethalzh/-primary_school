var express = require('express');
let multer=require('multer')
var path = require('path');
//let fs=require('fs');
var logger = require('morgan');
var querystring = require('querystring')
var body=require('body-parser');
var ejs = require('ejs');
var cookieParser =require("cookie-parser")
var moment = require('moment');
var fs = require('fs'); // this engine requires the fs module
const { send } = require('process');
const { table } = require('console');
const { Server } = require('http');
const { Buffer } = require('buffer');
const { url } = require('inspector');




var date= moment().format().substring(0,19)

var app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));
app.use('/public/', express.static('./public/'))
app.engine('ejs', require('ejs').__express);
app.set('views', './views')
app.set('view engine', 'ejs')

/*

app.get('/comment/:a',async (req,res)=>{
	let tab='spc_comment'
	let sqli='';
	mydata=[];
 	if(req.params.a=='2')
		 tab='spc_content';
	sqli = `select * from ${tab}`;
	await con.query(sqli, (err, result) => {
		if (err) {
			console.log(err);
		} else {
				for (let em of result) {
					let record=[];
					if(req.params.a == '1')
						record = [em['id'], em['title'], em['content'], em['ctime'], em['uname'], em['cid']];
					else if(req.params.a == '2')
						record = [em['cid'], em['tpye'], em['content'], em['laiyuan'], em['pic'], em['ctime']];
					mydata.push(record);
				}
				//res.render("tables",{mydata:mydata});
				res.send(mydata);
		}
	});
})

app.post('/insertcomment',(req,res)=>{
	let tab='spc_comment';
	console.log(req.body)
	let title=req.body['title'];
	let uname=req.body['uname'];
//	let date= moment().format('YYYY-MM-d h:mm:ss');
	let content=req.body['content'];
	let cid=req.body['cid'];

	//console.log(title+uname+content+date+cid)
	let sqli = `insert into ${tab} (title,uname,ctime,content,cid) values('${title}','${uname}','${date}','${content}','${parseInt(cid)}')`;
	console.log(sqli);

	con.query(sqli, (err, result) => {
		if(!err){
			res.send({msg:200});
		}
	
		else 
		console.log(err);
	})
	
})

*/
var newsDatas=require("./data/news");
var actDatas=require("./data/activity")
var noticeDatas=require("./data/notice")

app.get('/', (req, res)=> {
	//console.log(newtit.length,newdate)
	res.render('index',{newdata:newsDatas,actdatas:actDatas})
})
app.get('/news-list/:id', function (req, res) {
	    	let info={}
	    	for(item of newsDatas){
	    		if(item.newid==req.params.id){
					info=item
					break;
				}
			}
			res.render('news',{newsinfo:info})
})
app.get('/news-list', function (req, res) {
	res.render('news-list',{newdata:newsDatas,actdata:actDatas})
})
app.get('/activity-list/:id', function (req, res) {
	let info={}
	for(item of actDatas){
		if(item.id==req.params.id){
			info=item
			break;
		}
	}
	res.render('activity',{actsinfo:info})
})
app.get('/activity-list', function (req, res) {
	res.render('activity-list',{newdata:newsDatas,actdata:actDatas})
})
app.get('/images-list', function (req, res) {
	res.render('images-list',{notice:noticeDatas})
})
app.get('/contact', function (req, res) {
		res.render('contact',{msg:"bbb"})
})
app.get('/enroll', function (req, res) {
	res.render('enroll',{})
})

app.get('/about', function (req, res) {
	res.render('about',{msg:"bbb"})
})




//app.use("/list",listRouter)

const port = 1111











app.listen(port, () => console.log(`Example app listening on port ${port}!`))



module.exports = app;
