var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');

var dbURI = 'mongodb://localhost/meantodos';
var databaseType = "LOCAL";
if (process.env.NODE_ENV === 'production') {
  databaseType = "REMOTE";
  dbURI = process.env.CREDENTIALS;
}
var db = mongojs(dbURI);

console.log("App server successfully connected to", databaseType, "Database server!");


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


// Get Single Todo
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




// Save Todo
router.post('/todo', function (req, res, next) {
  var todo = req.body;
  if (!todo.text || !(todo.isCompleted + '')) {
    res.status(400);
    res.json({
      "error": "Invalid Data"
    });
  } else {
    db.todos.save(todo, function (err, result) {
      if (err) {
        res.send(err);
      } else {
        res.json(result);
      }
    });
  }
});


// Update Todo
router.put('/todo/:id', function (req, res, next) {

  if (!req.body) {
    res.status(400);
    res.json({
      "error": "Invalid Data"
    });
  } else {
    var todo = req.body;
    var updObj = {};

    updObj.isCompleted = todo.isCompleted;
    updObj.text = todo.text;

    db.todos.update({
      _id: mongojs.ObjectId(req.params.id)
    }, updObj, {}, function (err, result) {
      if (err) {
        res.send(err);
      } else {
        res.json(result);
      }
    });
  }
});


// Delete Todo
router.delete('/todo/:id', function (req, res, next) {
  db.todos.remove({
    _id: mongojs.ObjectId(req.params.id)
  }, '', function (err, result) {
    if (err) {
      res.send(err);
    } else {
      res.json(result);
    }

  });
});

/*
gracefulShutdown = function (msg, callback) {
  mongojs.connection.close(function () {
    console.log('Mongojs disconnected through ' + msg);
    callback();
  });
};

// For nodemon restarts
process.once('SIGUSR2', function () {
  gracefulShutdown('nodemon restart', function () {
    process.kill(process.pid, 'SIGUSR2');
  });
});
// For app termination
process.on('SIGINT', function () {
  gracefulShutdown('app termination', function () {
    process.exit(0);
  });
});
// For Heroku app termination
process.on('SIGTERM', function () {
  gracefulShutdown('Heroku app shutdown', function () {
    process.exit(0);
  });
});
*/




module.exports = router;