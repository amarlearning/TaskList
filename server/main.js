import { Meteor } from 'meteor/meteor';

Working  = new Mongo.Collection('data');

Meteor.methods({
  addTask:function(task){
    Working.insert({
        title : task,
        created : new Date()
    });
  },
  removeTask : function(id){
    Working.remove(id);
  },
  updateTask : function(id, checked) {
    Working.update(id, {$set : {checked : checked}});
  }
});
Meteor.startup(() => {

});
