(function () {
  angular
    .module('todoApp')
    .controller('homeCtrl', homeCtrl);

  function homeCtrl(dataService) {
    var vm = this;
    dataService.getAllTodos()
      .success(function (data) {
        console.log(data);
        vm.tasks = data;
      })
      .error(function (err) {
        console.log(err);
      });

    //Add task
    vm.addTask = function () {
       if (vm.input === undefined || vm.input === null ) {
        window.alert("Please type a task first and then press Add!");
        return;
      }
      var newTask = {
        text: vm.input,
        isCompleted: false
      };


      vm.tasks.push(newTask);
      vm.input = null;
      dataService.saveTodo(newTask)
        .success(function (data, status) {
          console.log("New Task Added: \n", data);
        })
        .error(function (err) {
          console.log("Task wasn't saved because:\n", err);
        });
    };


    //Delete task
    vm.deleteTask = function (task) {
      for (var i = 0; i < vm.tasks.length; i++) {
        if (vm.tasks[i]._id === task._id) {
          vm.tasks.splice(i, 1);
        }
      }

      dataService.deleteTodo(task._id)
        .success(function (data) {
          console.log("Task successfully deleted!");
        })
        .error(function (err) {
          console.log("Task was not deleted because:\n", err);
        });
    };
    
    
    //Update task
    vm.updateTask = function(task){
     
      var updatedTask = {
        _id: task._id,
        text: task.text,
        isCompleted: !task.isCompleted 
      };
      
      dataService.updateTodo(updatedTask)
        .success(function(data, result){
        console.log("Task successfully updated!\n", result);
      })
      .error(function(err){
        console.log("Task was not updated because:\n", err);
      });
    };

  };
    
    
    
    

})();