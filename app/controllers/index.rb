get '/' do
	erb :index
end


post '/room' do
	if Room.where('name = ?', params[:name]).empty?
		# if room does not exist, create a room and playlist, join as admin
		get_client
		@playlist = @client.add_playlist(:title => params[:name], :description => "Music Room")
		@playlist_id = @playlist.playlist_id
		@new_room = Room.create(name: params[:name])
		session[:name] = params[:name]
		p 'in /room'
		p session[:name]
		current_room
		redirect '/first_search'
	else
		@name = Room.where('name = ?', params[:name]).first
		p @name
		host = 'guest'
		redirect "/room/#{@name.name}/#{host}"
	end
				
end


get '/room/:video_id/:host' do
	if params[:host] == 'host'
		current_room
		get_client
		# @client.add_video_to_playlist(session[:playlist_id], session[:video_id] )
		# @playlist_videos = @client.playlist(session[:playlist_id]).videos
		@host = true
		# @playlist_id = params[:playlist_id]
		@video_id = params[:video_id]
		erb :room
	elsif params[:host] == 'guest'
		current_room
		get_client
		# @playlist_videos = @client.playlist(params[:playlist_id]).videos
		@host = false
		erb :room
	end
end

get '/first_search' do
	erb :first_search 
end


post '/first_search/results' do
	get_client
	current_room
	reply1 = @client.videos_by(:query => params[:first_search], :page => 1, :per_page => 5, :most_viewed => true)
	reply2 = @client.videos_by(:query => params[:first_search], :page => 2, :per_page => 5, :most_viewed => true)
	# @playlist_id = session[:playlist_id]
	erb :first_song, locals: {reply1: reply1, reply2: reply2}, layout: false
	# @client.add_video_to_playlist(session[:playlist_id], params[:search])
end

get '/first_search/results/:video_id' do
	get_client
	current_room
	# @playlist_id = session[:playlist_id]
	# @client.add_video_to_playlist(@playlist_id, params[:video_id])	
	p 'before first number of songs'
	@current_room.first.songs.create(video_id: params[:video_id])
	p 'after add number of songs'
	session[:video_id] = params[:video_id]
	@video_id = params[:video_id]
	redirect "/room/#{@video_id}/host"
end


post '/search' do
	get_client
	current_room
	reply1 = @client.videos_by(:query => params[:search], :page => 1, :per_page => 5, :most_viewed => true)
	reply2 = @client.videos_by(:query => params[:search], :page => 2, :per_page => 5, :most_viewed => true)
	erb :search, locals: {reply1: reply1, reply2: reply2}, layout: false
	# @client.add_video_to_playlist(session[:playlist_id], params[:search])
end


post '/add' do
	current_room
	get_client
	# @client.add_video_to_playlist(session[:playlist_id], params[:addVideo])
	@current_room.first.songs.create(video_id: params[:addVideo])
	# @allVideos = @client.playlist(session[:playlist_id])
	video = @client.video_by(params[:addVideo])
	video_id = params[:addVideo]
	erb :new_song, locals: {video: video, video_id: video_id}, layout: false
end

post '/signout' do
	session.clear
	redirect '/'
end

post '/playlist' do
	get_client
	current_room
	if @current_room.first.songs.count > 0
		next_song = @current_room.first.songs.first.destroy
		content_type 'json'
		return {queue: next_song.video_id}.to_json
	else
	  p "nothing in playlist"
	end
end

# post '/new_song' do
# 	get_client
# 	current_room
	# @playlist_id = session[:playlist_id]
	# @client.add_video_to_playlist(@playlist_id, params[:video_id])	
# 	@current_room.first.songs.create(video_id: params[:video_id])
# 	session[:video_id] = params[:video_id]
# end




