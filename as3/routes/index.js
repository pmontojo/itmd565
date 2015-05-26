var express = require('express');
var router = express.Router();
var users = [];
var discon = [];
var u = "";
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Welcome to TEEN CHAT',subtitle:'A platform for teenagers to communicate' });
});

router.get('/logout', function(req, res, next) {
	var url = require('url');
var url_parts = url.parse(req.url, true);
var query = url_parts.query;
var es = url_parts.search;
var ar = es.split("=");

var fin = ar[1];

  var byName = fin;
  us = byName;
  var mypos = users.indexOf(us);
  discon.push(users[mypos]);
  users.splice(mypos,1);
  res.render('index', { title: 'Welcome to TEEN CHAT',subtitle:'A platform for teenagers to communicate' });
});

router.get('/#', function(req, res, next) {
  res.render('index', { title: 'Welcome to TEEN CHAT',subtitle:'A platform for teenagers to communicate' });
});

router.get('/chat', function(req, res, next) {
	var url = require('url');
	var url_parts = url.parse(req.url, true);
	var query = url_parts.query;
	var es = url_parts.search;
	var ar = es.split("=");
	var fin = ar[1];
    var byName = fin;
    us = byName;
  res.render('index2', { title: 'Welcome to TEEN CHAT',username: byName });
});

router.get('/users', function(req, res, next) {
	var url = require('url');
	var url_parts = url.parse(req.url, true);
	var query = url_parts.query;
	var es = url_parts.search;
	var ar = es.split("=");
	var fin = ar[1];
    var byName = fin;
  	us = byName;
  	res.render('index3', { title: 'TEEN CHAT',users:users, actual:us ,discons:discon});
});

router.post('/chat', function(req, res, next) {
  if(req.body.user == ""){
    res.render('index', { title: 'Sorry, the username introduced is invalid',subtitle: "Please,try again" });
  }
  else if(users.indexOf(req.body.user)== -1){
  	u = req.body.user;
  users.push(req.body.user);
    res.render('index2', { title: 'Express',username: req.body.user });
}
else{
	res.render('index', {title: "There's already an user with this name", subtitle:"Please, choose another one"});
}
});


module.exports = router;
