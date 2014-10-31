$(document).ready(function(){
  var sController = new Search.Controller(Search.View);
  sController.bindListeners();
})


Search.Controller = function(sView){
  this.view = new sView;
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
    this.view.cancelSearch();
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
      self.view.removeSearchResults();
      self.view.hideSearchResults();
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
        self = this

    $.ajax({
      url: url+ "/guestsearch",
      type: "POST",
      data: {video_id: videoId}
    }).done(function(response){
      self.view.hideSearchResults();
      setTimeout($('#search-container').append(response), 1000);
      $('#added_message').fadeOut(3000)
    })
  },

  clickSongListener: function(){
    var self = this;
    $('.video-container').on('click', function(e){
      e.preventDefault();
      self.clickSong($(this));
      self.addToPlaylist($(this));
    })
  },

  clickFirstSong: function(container){
    var parameters = container.parent().attr('href').split('?')
        url = parameters[0]
        room = url.split('/')[2]
        videoId = parameters[1].split('=')[1]
        self = this

    $.ajax({
      url: url+ "/theatre",
      type: "POST",
      data: {video_id: videoId}
    }).done(function(response){
      self.view.removeSearchContainer();
      self.view.hideSearchResults();
      self.view.removeSearchForm();
      $('body').prepend(response);
      self.sView.hideSearchContainer();
    })
  },

  clickSong: function(container){
    var parameters = container.parent().attr('href').split('?')
        url = parameters.shift()
        videoId = parameters.shift().split('=')[1]
        self = this
    $.ajax({
      url: url+ '/theatre',
      type: "POST",
      data: {video_id: videoId, not_first_song: true}
    }).done(function(response){
      self.view.hideSearchResults();
      setTimeout(function(){
        $('#player').append(response)
        self.view.removeSearchContainer();
      }, 1500);
      // $('#added_message').fadeOut(3000)
    })
  },

  addToPlaylist: function(container){
    var parameters = container.parent().attr('href').split('?')
        url = parameters.shift()
        videoId = parameters.shift().split('=')[1]
        self = this
    $.ajax({
      url: url+ '/add_to_queue',
      type: "GET",
      data: {video_id: videoId}
    }).done(function(response){
      $('#playlist-container ul').append(response)
    })

  }
}

Search.View = function(){}

Search.View.prototype = {
  showSearch: function(){
    $('#search-container').fadeIn(1000);
    $('#cancel-btn').fadeIn(1000);
  },

  cancelSearch: function(){
    $('#search-container').fadeOut(1000);
  },

  removeSearchResults: function(){
    $('#search-results').remove();
  },

  hideSearchResults: function(){
    $('#search-results').slideUp(1000)
  },

  removeSearchContainer: function(){
    $('#search-container').remove()
  },

  removeSearchForm: function(){
    $('#search_first_song').remove();
  },

  hideSearchContainer: function(){
    $('#search-container').css('display', 'none')
  }
}


