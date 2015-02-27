/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function Director(name){
  this.attributes = {
    name: name,
    quotes: []
  };
}

Director.prototype.set = function(attr,value){
  this.attributes[attr] = value;
};

Director.prototype.speak = function(){
  console.log(this.attributes.name + "says: " + this.attributes.quotes);
};

module.exports = Director;