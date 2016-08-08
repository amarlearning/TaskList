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
    Meteor.call("addTask", task, function(error, result){
      if(error){
        console.log("error", error);
      }
      if(result){
      }
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
    Meteor.call("removeTask", this._id, function(error, result){
      if(error){
        console.log("error", error);
      }
      if(result){

      }
    });
  },
  "click .togglecheck" : function(){
    Meteor.call("updateTask", this._id, !this.checked, function(error, result){ 
      if(error){
        console.log("error", error);
      }
      if(result){

      }
    });
  }
});
