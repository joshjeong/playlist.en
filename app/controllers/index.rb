get '/' do
	erb :index
end


post '/room' do
	p params[:name]
	if Room.where('name = ?', params[:name]).empty?
		# if room does not exist, create a room and playlist, join as admin
		get_client
		@playlist = @client.add_playlist(:title => params[:name], :description => "Music Room")
		@playlist_id = @playlist.playlist_id
		@new_room = Room.create(name: params[:name], playlist_id: @playlist_id)
		session[:playlist_id] = @new_room.playlist_id
		current_room
		# redirect "/room/#{@current_room.first.playlist_id}/host"
		redirect '/first_search'
	else
		@playlist_id = Room.where('name = ?', params[:name]).first.playlist_id
		host = 'guest'
		redirect "/room/#{@playlist_id}/#{host}"
	end
				
end


get '/room/:playlist_id/:host' do
	if params[:host] == 'host'
		current_room
		get_client
		# @reply = session[:reply]
		# @playlist_id = @current_room.first.playlist_id
		p session[:video_id]
		@client.add_video_to_playlist(session[:playlist_id], session[:video_id] )
		@playlist_videos = @client.playlist(session[:playlist_id]).videos
		@host = true
		erb :room
	elsif params[:host] == 'guest'
		current_room
		get_client
		@playlist_videos = @client.playlist(params[:playlist_id]).videos
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
	@playlist_id = session[:playlist_id]
	erb :first_song, locals: {reply1: reply1, reply2: reply2, playlist_id: @playlist_id}, layout: false
	# @client.add_video_to_playlist(session[:playlist_id], params[:search])
end

get '/first_search/results/:video_id' do
	@playlist_id = session[:playlist_id]
	session[:video_id] = params[:video_id]
	redirect "/room/#{@playlist_id}/host"
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
	@client.add_video_to_playlist(session[:playlist_id], params[:addVideo])
	@allVideos = @client.playlist(session[:playlist_id])
	video = @client.video_by(params[:addVideo])
	erb :new_song, locals: {video: video}, layout: false
end

get '/signout' do
	session.clear
	redirect '/'
end

get '/test' do
	erb :test
end

get '/test/playlist' do
	return 'PLK3hPkA_D_Z4xJiIgq5fxhFysyyzsrkPG'
end



