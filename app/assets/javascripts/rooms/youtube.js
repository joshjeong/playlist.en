
var Youtube_player = {}

Youtube_player = function(){

 var params = { allowScriptAccess: "always" };
    var atts = { id: "myytplayer" };
    swfobject.embedSWF("http://www.youtube.com/v/VIDEO_ID?enablejsapi=1&playerapiid=ytplayer&version=3",
                       "ytapiplayer", "425", "356", "8", null, null, params, atts);
  
}

