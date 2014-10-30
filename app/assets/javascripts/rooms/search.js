$(document).ready(function(){
  var sView = new Search.View
    , sController = new Search.Controller(sView);
  sController.bindListeners();
})


Search.Controller = function(sView){
  this.view = sView;
}

Search.Controller.prototype = {
  bindListeners: function(){
    this.searchFirstSongListener();
    this.cancelBtnListener();
  },

  searchFirstSongListener: function(){
    var self = this;
    $('#search_first_song').on('submit', function(e){
      e.preventDefault();
      self.searchFirstSong($(this));
    })
  },

  cancelBtnListener: function(){
    var self = this;
    $('#cancel-btn').on('click', function(e){
      self.cancelBtn();
    });
  },

  cancelBtn: function(){
    this.view.hideSearch();
  },

  searchFirstSong: function(form){
    var self = this
      , url = form.attr("action")
      , searchQuery = form.find('input').first().val();
    $.ajax({
      url: url,
      type: "POST",
      data: {search: searchQuery}
    }).done(function(response){
      $('#search-results').remove() 
      $('#search-container').append(response)
      $('#search_first_song').find('input').first().val("")
      if($('#player').length==1){
        self.clickSongListener();
      }
      else{
        self.clickFirstSongListener();
      }
    })
  },

  clickFirstSongListener: function(){
    var self = this;
    $('.video-container').on('click', function(e){
      e.preventDefault();
      if(window.location.pathname.split('/')[3]=='guest'){
        self.guestClick($(this));
      }
      else{
        self.clickFirstSong($(this));
      }
    })
  },

  guestClick: function(container){
    var parameters = container.parent().attr('href').split('?')
        url = parameters[0]
        room = url.split('/')[2]
        videoId = parameters[1].split('=')[1]

    $.ajax({
      url: url+ "/guestsearch",
      type: "POST",
      data: {video_id: videoId}
    }).done(function(response){
      $('#search-results').remove()
      $('#search-container').append(response)
      $('#added_message').fadeOut(3000)
    })
  },

  clickSongListener: function(){
    var self = this;
    $('.video-container').on('click', function(e){
      e.preventDefault();
      self.clickSong($(this));
    })
  },

  clickFirstSong: function(container){
    var parameters = container.parent().attr('href').split('?')
        url = parameters[0]
        room = url.split('/')[2]
        videoId = parameters[1].split('=')[1]
    $.ajax({
      url: url+ "/theatre",
      type: "POST",
      data: {video_id: videoId}
    }).done(function(response){
      $('#search-container').remove();
      $('#search-results').remove();
      $('#search_first_song').remove();
      $('body').prepend(response);
      $('#search-container').css('display', 'none')
    })
  },

  clickSong: function(container){
    var parameters = container.parent().attr('href').split('?')
        url = parameters[0]
        videoId = parameters[1].split('=')[1]
    $.ajax({
      url: url+ '/theatre',
      type: "POST",
      data: {video_id: videoId, not_first_song: true}
    }).done(function(response){
      $('#search-results').remove()
      $('#player').append(response)
      $('#added_message').fadeOut(3000)
    })
  }
}

Search.View = function(){}

Search.View.prototype = {
  showSearch: function(){
    $('#search-container').fadeIn(2000);
    $('#cancel-btn').fadeIn(2000);
  },

  hideSearch: function(){
    $('#search-container').fadeOut(2000);
  }
}


