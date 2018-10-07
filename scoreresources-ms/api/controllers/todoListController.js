'use strict';

var mongoose = require('mongoose'),
  Task = mongoose.model('Tasks');



exports.list_all_tasks = function(req, res) {
  
  Task.find({}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};
exports.search_tasks = function(req, res) {
  //console.log(req.body.service)
  Task.find({'service':req.body.service,'service_id':req.body.service_id}, function(err, task) {
    if (err)
      res.send(err);
    //res.json(task);
    var Objeto = {};
    Objeto["excelente"]= task.filter(function(item){return (item.score==5)}).length;
    Objeto["bueno"]= task.filter(function(item){return (item.score==4)}).length;
    Objeto["medio"]= task.filter(function(item){return (item.score==3)}).length;
    Objeto["regular"]= task.filter(function(item){return (item.score==2)}).length;
    Objeto["malo"]= task.filter(function(item){return (item.score==1)}).length;
    res.json(Objeto);
    //console.log(task.filter(function(item){return (item.score==5)}).length)
    //console.log(task.filter(function(item){return (item.score==4)}).length)
    //console.log(task.filter(function(item){return (item.score==3)}).length)
    //console.log(task.filter(function(item){return (item.score==2)}).length)
    //console.log(task.filter(function(item){return (item.score==1)}).length)
  });
};


exports.create_a_task = function(req, res) {
  var new_task = new Task(req.body);
  new_task.save(function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};

exports.read_a_task = function(req, res) {
  Task.findById(req.params.taskId, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};

exports.update_a_task = function(req, res) {
  Task.findOneAndUpdate({_id:req.params.taskId}, req.body, {new: true}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};
// Task.remove({}).exec(function(){});
exports.delete_a_task = function(req, res) {

  Task.remove({
    _id: req.params.taskId
  }, function(err, task) {
    if (err)
      res.send(err);
    res.json({ message: 'Task successfully deleted' });
  });
};
