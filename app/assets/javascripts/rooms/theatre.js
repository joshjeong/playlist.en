Theatre.Controller = function(searchView, theatreView) {
  this.sView = new searchView;
  this.tView = new theatreView;
}

Theatre.Controller.prototype = {
  bindListeners: function(){
    this.playlistBtnListener();
    this.searchBtnListener();
    this.showCloseBtnListener();
    this.closeListListener();
  },

  playlistBtnListener: function(){
    var self = this;
    $('#playlist-btn').on('click', function(e){
      self.tView.showPlaylist();
    })
  },

  searchBtnListener: function(){
    var self = this;
    $('#search-btn').on('click', function(e){
      self.searchBtn($(this));
    })
  },  

  showCloseBtnListener: function(){
    var self = this;
    $('#playlist-btn').on('click', function(){
      self.tView.showCloseBtn();
    })
  },

  closeListListener: function(){
    var self = this;
    $('#close-list-btn').on('click', function(){
      self.tView.hidePlaylist();
    })
  },

  getPlaylist: function(){
    var url = window.location.pathname
        self = this
    $.ajax({
      url: url + "/get_playlist",
      type: "GET"
    }).done(function(response){
      $('#playlist-container').append(response)
    })
  },

  searchBtn: function(button){
    this.sView.showSearch();
  }
}

Theatre.View = function(){}

Theatre.View.prototype = {
  showCloseBtn: function(){
    $('#close-list-btn').css('visibility', 'visible')
  },
  
  showPlaylist: function(){
    $('#playlist-container').css('visibility', 'visible')
  },

  hidePlaylist: function(){
    $('#close-list-btn').css('visibility', 'hidden')
    $('#playlist-container').css('visibility', 'hidden')
  }


}

