/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function(){
  $sectionArticle = $('.section-article');
  $artist = $('#artist');
  $search = $('#search');
  $artist.focus();
  $search.click(function(){
    $.ajax({
    type: 'get',
    url: 'https://api.spotify.com/v1/search',
    dataType: 'json',
    data:{
      q: $artist.val(),
      type: 'album'
    },
    success: function(data){
      $sectionArticle.append("<div class='band'><h2>" + $artist.val() + "'s Albums</h2></div>");
      $.each(data.albums.items, function(index, album){
	$sectionArticle.append("<div class='name'><h3> Album: " + album.name + "</h3></div>"
			      +"<div class='type'> Type: " + album.album_type + "</div>"
			      +"<img src=\"" + album.images[1].url + "\"/><br>"
			      +"<a href=" + album.uri + ">Link to Spotify!</a>"
			      );
      });
    },
    error: function(){

    }
  });
  });
});