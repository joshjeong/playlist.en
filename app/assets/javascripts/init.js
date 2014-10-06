$(document).ready(function(){
  var rView = new Room.View();
  var rController = new Room.Controller(rView);
  var ytplayer = new Youtube_player();
  rController.init();  

})