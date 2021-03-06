require('dotenv').load();
var express = require('express');
var path = require('path');
var bodyparser = require('body-parser');

var index = require('./routes/index');
var todos = require('./routes/todos');

var app = express();



app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'client')));
app.set('views', path.join(__dirname, 'client', 'index.html'));
app.use('/api/v1/', todos);

module.exports = app;

//app.listen(3000, function(){
//  console.log('Server started on port 3000...');
//});