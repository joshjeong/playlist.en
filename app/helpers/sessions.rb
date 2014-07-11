helpers do 	

 	def current_room
		if session[:name]
			@current_room ||= Room.where('name = ?', session[:name])
		end
	end

	def get_client
		@client ||= YouTubeIt::Client.new(:username => "d3vjosh", :password =>  "coding32", :dev_key => "AIzaSyDpK5Dqk24H6fHDu0arvzw6WK3GJRt4Qr4")
	end

end