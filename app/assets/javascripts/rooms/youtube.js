$(document).on('ready', function(){
  var ytplayer = new Youtube.Contoller;
  console.log('hi')
})

Youtube.Controller = function(){

  var params = { allowScriptAccess: "always" };
      atts = { id: "myytplayer" };
      video_id = "lK4red5MqBI"

  this.createPlayer = function(){

  swfobject.embedSWF("http://www.youtube.com/v/"+ video_id + "?enablejsapi=1&playerapiid=ytplayer&version=3&autoplay=1&controls=0&rel=0&showinfo=0&autohide=1&color=white&iv_load_policy=3&theme=light",
                    "ytapiplayer", "425", "356", "8", null, null, params, atts);
  }
}

