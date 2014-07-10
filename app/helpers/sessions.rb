helpers do 	

 	def current_room
		if session[:playlist_id]
			@current_room ||= Room.where('playlist_id = ?', session[:playlist_id])
		end
	end

	def get_client
		@client ||= YouTubeIt::Client.new(:username => "d3vjosh", :password =>  "coding32", :dev_key => "AIzaSyDpK5Dqk24H6fHDu0arvzw6WK3GJRt4Qr4")
	end

end