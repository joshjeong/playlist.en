$(document).ready(function(){
  ytplayer = new Youtube.Controller;
  ytplayer.bindListeners();
})

Youtube.Controller = function(){
  var self = this

  this.bindListeners = function(){
    this.selectSongListener();
    this.searchSongListener();
  }

  this.createPlayer = function(){
    var params = { allowScriptAccess: "always" };
      atts = { id: "myytplayer" };
      settings = "?enablejsapi=1&playerapiid=ytplayer&version=3"
      video_id = "0s0Iyd1xqoI"
      and = "&"
      autoplay = "autoplay=1"
      controls = "controls=0"
      info = "showinfo=0"
    
    swfobject.embedSWF("http://www.youtube.com/v/"+video_id+settings+and+autoplay+and+controls+and+info,
                    "ytapiplayer", "425", "356", "8", null, null, params, atts);
  }

  this.searchSongListener = function(){
    $('#search_first_song').on('submit', function(e){
      e.preventDefault();
      self.searchSong($(this));
    })
    
  }

  this.searchSong = function(form){
    var url = form.attr("action")
        searchQuery = form.find('input').first().val()
    $.ajax({
      url: url,
      type: "POST",
      data: {search: searchQuery}
    }).done(function(response){
      $('#search_first_song').append(response)
      $('#search_first_song').find('input').first().val("")
    })
  }


  this.selectSongListener = function(){
    $('.video-container').on('click',function(e){
      // e.preventDefault();
      self.selectSong($(this));
    })
  }

  this.selectSong = function(button){
  }


}

