/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//Movie Observer Class
function movieObserver(){
  this.movieObserver = [];
}

//Movie Observer Prototypes
movieObserver.prototype.add = function(observer){
  return this.movieObserver.push(observer);
};

movieObserver.prototype.removeAt = function(index){
  this.movieObserver.splice(index, 1);
};

movieObserver.prototype.count = function(){
  return this.movieObserver.length;
};

movieObserver.prototype.get = function(index){
  if(index > -1 && index < this.movieObserver.length){
    return this.movieObserver[index];
  }
};

movieObserver.prototype.indexOf = function(observer, start){
  var i = start;
  while(i < this.movieObserver.length){
    if(this.movieObserver[i] === observer){
      return i;
    }
    i++;
  }
  return -1;
};


//Movie Refactored as a Module
var movie = (function(){
  var hashmap;
  var title;
  var movieObservers = new movieObserver();
  
  function play(){
    console.log("Playing " + this.title);
  }
  function stop(){
    console.log("Movie stopped");
  }
  function set(attr, value){
    this[attr] = value;
  }
  function get(attr){
    return this[attr];
  }
  function addObserver(observer){
    movieObservers.add(observer);
  }
  function removeObserver(observer){
    movieObservers.removeAt(movieObservers.indexOf(observer, 0));
  }
  function notify(context){
    var observerCount = movieObservers.count();
    for(var i=0; i < observerCount; i++)
    {
      movieObservers.get(i).update(context);
    }
  }
  return{
    play: play,
    stop: stop,
    set: set,
    get: get
  };
})();

//Observer objet
var observer = function(){
  
};

//Observer prototypes
observer.prototype.update = function(context){
  if(context === 'play')
  {
    console.log("Playing");
  }
  else
  {
    console.log("Stopped");
  }
};

var terminator = movie;
terminator.set('title','Terminator');
terminator.play();
terminator.stop();
