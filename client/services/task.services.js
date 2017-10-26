(function () {
    /*Data service for pulling data from the API*/
    dataService.$inject = ['$http'];

    function dataService($http) {
      var getAllTodos = function () {
        return $http.get('/api/v1/todos');
        };

        var deleteTodo = function (taskid) {
          
          return $http.delete('/api/v1/todo/' + taskid);
        };

        var saveTodo = function (newTask) {
          return $http.post('/api/v1/todo', newTask);
        };
      
      var updateTodo = function(updatedTask){
        return $http.put('/api/v1/todo/' + updatedTask._id, updatedTask);
      };
        
        return {
          getAllTodos: getAllTodos,
          deleteTodo: deleteTodo,
          saveTodo: saveTodo,
          updateTodo: updateTodo
        };
      };


      angular
        .module('todoApp')
        .service('dataService', dataService);

    })();