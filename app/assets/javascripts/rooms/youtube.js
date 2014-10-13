$(document).ready(function(){
  ytplayer = new Youtube.Controller;
  ytplayer.bindListeners();
})


Youtube.Controller = function(){
  var self = this
      done = false;
      

  this.bindListeners = function(){
    this.searchFirstSongListener();
  }

  function onStateChange(newState) {
          if ( newState == 0 ) {
        }
      }
  



  // this.createPlayer = function(videoId){
  //   var params = { allowScriptAccess: "always" };
  //     atts = { id: "myytplayer" };
  //     settings = "?enablejsapi=1&playerapiid=ytplayer&version=3"
  //     video_id = videoId
  //     and = "&"
  //     autoplay = "autoplay=0"
  //     controls = "controls=1"
  //     info = "showinfo=0"

  //     swfobject.embedSWF("http://www.youtube.com/v/"+video_id+
  //                     settings+and+autoplay+and+controls+and+info,
  //                     "ytapiplayer", "100%", "356", "8", 
  //                     null, null, params, atts);
  // }

  // this.nextVideo = function(){


  // }



  this.searchFirstSongListener = function(){
    $('#search_first_song').on('submit', function(e){
      e.preventDefault();
      self.searchFirstSong($(this));
    })
  }


  this.searchFirstSong = function(form){
    var url = form.attr("action")
        searchQuery = form.find('input').first().val()
    $.ajax({
      url: url,
      type: "POST",
      data: {search: searchQuery}
    }).done(function(response){
      $('#search-results').remove() 
      $('#search_first_song').append(response)
      $('#search_first_song').find('input').first().val("")
      self.clickFirstSongListener();
      if($('#player').length==1){
        self.clickSongListener();
      }

    })
  }

  this.clickFirstSongListener = function(){
    $('.video-container').on('click', function(e){
      e.preventDefault();
      self.clickFirstSong($(this));
    })
  }

  this.clickSongListener = function(){
    $('.video-container').on('click', function(e){
      e.preventDefault();
      self.clickSong($(this));
    })
  }

  this.clickFirstSong = function(container){
    var parameters = container.parent().attr('href').split('?')
        url = parameters[0]
        room = url.split('/')[2]
        videoId = parameters[1].split('=')[1]
    $.ajax({
      url: url+ "/theatre",
      type: "POST",
      data: {video_id: videoId}
    }).done(function(response){
      $('#search-results').remove()
      $('#search_first_song').prepend(response)
    })

  }

  this.clickSong = function(container){
    var parameters = container.parent().attr('href').split('?')
        url = parameters[0]
        videoId = parameters[1].split('=')[1]
    $.ajax({
      url: url+ '/theatre',
      type: "POST",
      data: {video_id: videoId, not_first_song: true}
    }).done(function(response){
      $('#search-results').remove()
      $('#search_first_song').append(response)
      $('#added_message').fadeOut(3000)
    })

  }

}



