Youtube.Controller = function(){

  this.bindListeners = function(){
    this.firstSearchListener();
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


}

