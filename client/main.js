import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Session } from 'meteor/session'

import './main.html';

Working  = new Mongo.Collection('data');

Template.body.helpers({
  array : function() {
    if(Session.get('hideFinished')) {
      return Working.find({checked: {$ne: true}});
    } else {
      return Working.find();
    }
  }
});

Template.body.events ({
  "submit .addTask" : function(event){
    var task = event.target.task.value;
    Working.insert({
        title : task,
        created : new Date()
    });
    event.target.task.value = "";
    return false;
  },
  "change .hide-finished" : function(event) {
    Session.set('hideFinished', event.target.checked);
  }
});

Template.listofwords.events({
  "click .delete" : function(){
    Working.remove(this._id);
  },
  "click .togglecheck" : function(){
    Working.update(this._id, {$set : {checked : !this.checked}});
  }
});
