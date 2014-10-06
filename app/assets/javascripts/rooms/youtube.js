
var Youtube.Controller = {}

Youtube.Controller = function(){

 var params = { allowScriptAccess: "always" };
    var atts = { id: "myytplayer" };
    swfobject.embedSWF("http://www.youtube.com/v/lK4red5MqBI?enablejsapi=1&playerapiid=ytplayer&version=3",
                       "ytapiplayer", "425", "356", "8", null, null, params, atts);
  
}

