Youtube.Controller = function(){
    var tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        done = false;
        window.player;


    onYouTubeIframeAPIReady =function() {
      window.player = new YT.Player('player', {
        height: '100%',
        width: '100%',
        videoId: "#{@next_video}",
        playerVars:
        {
          controls: 1,
          showinfo: 0,
          autoplay: 1
        },
        events: {
          'onReady': onReady,
          'onStateChange': onStateChange
        }
      });    
    }

    onReady =function() {
        window.player.addEventListener('onStateChange', function(e) {
          var firstVideo = true;
          if ( e.data == 0) {
            console.log('song has ended')
            window.player.destroy();
            $.ajax({
              url: window.location.pathname+ '/nextvideo',
              type: 'post'
            }).done(function(response){
              playNextVideo(response.video);
            })
          }
        });
      }

        onStateChange =function(newState) {
          if ( newState == 0 ) {
        }
      }

      playNextVideo =function(video) {
        console.log('play next video')
        console.log(video)

        window.player = new YT.Player('player', {
          height: '100%',
          width: '100%',
          videoId: video,
          playerVars:
            {
              controls: 1,
              showinfo:0,
              autoplay: 1
            },
          events: {
            'onReady': onReady,
            'onStateChange': onStateChange
          }
        });    
      }

  }