Theatre.Controller = function(searchView) {
  this.sView = searchView
}

Theatre.Controller.prototype = {
  bindListeners: function(){
    this.playlistBtnListener();
    this.searchBtnListener();
  },

  playlistBtnListener: function(){
    var self = this;
    $('#playlist-btn').on('click', function(e){
      self.playlistBtn($(this));
    })
  },

  searchBtnListener: function(){
    var self = this;
    $('#search-btn').on('click', function(e){
      self.searchBtn($(this));
    })
  },  

  playlistBtn: function(button){
    var url = window.location.pathname + '/playlist'
    $.ajax({
      url: url,
      type: "GET"
    }).done(function(response){
    })
  },

  searchBtn: function(button){
    this.sView.showSearch();
  }
}

