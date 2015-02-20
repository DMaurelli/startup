/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function movie(hashmap, title){
  this.hashmap = hashmap;
  this.title = title;
}

movie.prototype.play = function(){
  
};

movie.prototype.stop = function(){
  
};

movie.prototype.set = function(attr, value){
  this[attr] = value;
};

movie.prototype.get = function(attr){
  return this[attr];
};

var movie1 = new movie("0","Resident Evil");
var movie2 = new movie("1","The Day After Tomorrow");

console.log(movie1.get("title"));