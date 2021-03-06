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

//Movie Class
function movie(hashmap, title){
  this.hashmap = hashmap;
  this.title = title;
  this.movieObservers = new movieObserver();
  this.actors = [];
}

//Movie Prototypes
movie.prototype.play = function(){
  console.log("Playing " + this.get('title'));
  this.notify('play');
};

movie.prototype.stop = function(){
  console.log("Movie stopped");
  this.notify('stop');
};

movie.prototype.set = function(attr, value){
  this[attr] = value;
};

movie.prototype.get = function(attr){
  return this[attr];
};

movie.prototype.addObserver = function(observer){
  this.movieObservers.add(observer);
};

movie.prototype.removeObserver = function(observer){
  this.movieObservers.removeAt(this.movieObservers.indexOf(observer,0));
};

movie.prototype.notify = function(context){
  var observerCount = this.movieObservers.count();
  for(var i=0; i < observerCount; i++){
    this.movieObservers.get(i).update(context);
  }
};

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

function downloadableMovie(){
  
}

downloadableMovie.prototype = Object.create(movie.prototype);

downloadableMovie.prototype.download = function(){
  console.log("Downloading " + this.get('title') );
};

function extend(reciving, giving){
  for(var i in giving){
    if(giving.hasOwnProperty(i)){
      reciving[i] = giving[i];
    }
  }
  return reciving;
}

extend(downloadableMovie, movie);


//Social Object
var social = function(){
  
};

//Social Prototypes
social.prototype.share = function(friendName){
  console.log("Sharing " + this.get('title') + " with " + friendName);
};

social.prototype.like = function(){
};

//Mixing Function
function augment(reciving, giving){
  if(arguments[2]){
    for(var i = 2, len = arguments.length; i < len; i++){
      reciving.prototype[arguments[i]] = giving.prototype[arguments[i]];
    }
  }
  else{
    for(var method in giving.prototype){
      if(!Object.hasOwnProperty.call(reciving, method)){
	reciving.prototype[method] = giving.prototype[method];
      }
    }
  }
}

augment(movie, social);

//Actor Class
function actor(name, lastName){
  this.name = name;
  this.lastName = lastName;
}

//Actor Objects
var actor1 = new actor('Milla','Jovovich');
var actor2 = new actor('Dennis','Quaid');

//Movie Objects
var movie1 = new movie("0","Resident Evil");
var movie2 = new movie("1","The Day After Tomorrow");

//Observer Object
var obs = new observer();
//MovieObserver Object
var movieObs = new movieObserver();

//Adding an Observer
movieObs.add(obs);

//Creating a new movie
var terminator = new movie();
terminator.set('title','Terminator');
terminator.addObserver(obs);
terminator.play();
terminator.stop();

//Creating a downloadableMovie
var terminator = new downloadableMovie();
terminator.set('title','Terminator');
terminator.download();

//Sharing a movie
var ironman2 = new movie();
ironman2.set('title','Iron Man 2');
ironman2.share('V. Rivas');