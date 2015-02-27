/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var Movie = require('./movie.js');
var Director = require('./director.js');
var $ = require('./jquery-2.1.3.js');


var alien = new Movie();
var ridleyScott = new Director('Ridley Scott');
ridleyScott.set('quotes', ['Cast is everything.','Do what ...']);
alien.set('director', ridleyScott);

$(document).ready(function(){
  $sectionArticle = $('.section-article');
  var quotes = [];
  quotes.push(alien.get('director').speak());
  $sectionArticle.html(quotes.join());
});