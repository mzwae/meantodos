var express = require('express');
var path = require('path');
var bodyparser = require('body-parser');

var index = require('./routes/index');
var todos = require('./routes/todos');

var app = express();

//View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: false}));

app.use('/', index);
app.use('/api/v1/', todos);

app.listen(3000, function(){
  console.log('Server started on port 3000...');
});