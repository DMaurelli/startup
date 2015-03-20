/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var director = require('./director.js');

function Movie(){
  this.attributes = {
    
  };
}

Movie.prototype.play = function(){
  console.log("Playing " + this.get('title'));
};

Movie.prototype.stop = function(){
  console.log("Movie Stopped");
};

Movie.prototype.set = function(attr, value){
  this.attributes[attr] = value;
};

Movie.prototype.get = function(attr){
  return this.attributes[attr];
};

module.exports = Movie;