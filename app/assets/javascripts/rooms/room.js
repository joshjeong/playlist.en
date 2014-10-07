$(document).ready(function(){
  roomController = new Room.Controller;
  roomController.bindListeners();
})


Room.Controller = function(){
  var self = this

  this.bindListeners = function(){
    this.preventSubmitRoom();
  }

  this.preventSubmitRoom = function(){
    $('#new_room').submit(function(e){
        // e.preventDefault();
        self.submitFirstSearch();
    });
  }

  this.submitFirstSearch = function(){
    var searchVideo = $.param($('#new_room'));
  }


  // this.joinRoom = function(){
  //   $.ajax({
  //     url: "/rooms/",
  //     type: 
  //   })
  // }



}