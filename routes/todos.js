var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var password = require('../password');//<username>:<password>
var db = mongojs('mongodb://' + password.value  + '@ds127375.mlab.com:27375/meantodos', ['todos']);

// Get Todos
router.get('/todos', function (req, res, next) {
  db.todos.find(function (err, todos) {
    if (err) {
      res.send(err);
    } else {
      res.json(todos);
    }
  });
});


//Get Todo
router.get('/todo/:id', function (req, res, next) {
  db.todos.findOne({
    _id: mongojs.ObjectId(req.params.id)
  }, function (err, todo) {
    if (err) {
      res.send(err);
    } else {
      res.json(todo);
    }
  });
});

module.exports = router;