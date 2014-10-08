$(document).ready(function(){
  ytplayer = new Youtube.Controller;
  ytplayer.bindListeners();
})

Youtube.Controller = function(){
  var self = this

  this.bindListeners = function(){
    // this.selectSongListener();
    this.searchFirstSongListener();
    this.searchNextSongListener();
  }

  this.createPlayer = function(videoId){
    var params = { allowScriptAccess: "always" };
      atts = { id: "myytplayer" };
      settings = "?enablejsapi=1&playerapiid=ytplayer&version=3"
      video_id = videoId
      and = "&"
      autoplay = "autoplay=1"
      controls = "controls=0"
      info = "showinfo=0"

    swfobject.embedSWF("http://www.youtube.com/v/"+video_id+settings+and+autoplay+and+controls+and+info,
                    "ytapiplayer", "100%", "356", "8", null, null, params, atts);
  }

  this.searchFirstSongListener = function(){
    $('#search_first_song').on('submit', function(e){
      e.preventDefault();
      self.searchFirstSong($(this));
    })
  }

  this.searchNextSongListener = function(){
    $('#search-song').on('submit', function(e){
      e.preventDefault();
      console.log('should prevent default')
      self.searchNextSong($(this));
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
    })
  }

  this.searchNextSong = function(form){
    var url = form.attr('action')
        searchQuery = form.find('input').first().val()
    $.ajax({
      url: url,
      type: "POST",
      data: {nextSearch: searchQuery}
    }).done(function(response){
      $('#search-results').remove()
      $('#search-song').append(response)
      self.clickSongListener();
      $('#search-song').find('input').first().val("")
    })
  }

  this.clickSongListener = function(){
    $('.video-container').on('click', function(e){
      e.preventDefault();
      self.clickSong($(this));
    })
  }

  this.clickSong = function(container){
    var parameters = container.parent().attr('href').split('?')
        room = parameters[0]
        videoId = parameters[1].split('=')[1]
    $.ajax({
      url: room + "/tracks",
      type: "POST",
      data: {addVideo: videoId}
    }).done(function(response){
      $('#search-results').remove()
      $('#search-song').append(response)
    })

  }


  // this.selectSongListener = function(){
  //   $('.video-container').on('click',function(e){
  //     e.preventDefault();
  //     self.selectSong($(this));
  //   })
  // }

  // this.selectSong = function(video){
  //   videoId= $.trim(video.find('#video-id').html())
  //   url = video.parent().attr('href')
  //   $.ajax({
  //     url: url,
  //     type: "GET",
  //     data: {video_id: videoId}
  //   })
  // }


}

