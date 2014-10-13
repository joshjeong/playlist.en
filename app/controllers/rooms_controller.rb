class RoomsController < ApplicationController
  def index
    @room = Room.new
  end

  def create
    room_name = params[:room][:name]
    if Room.find_by(name: room_name)==nil
      Room.create(name: room_name)
      redirect_to search_rooms_path
    else
      redirect_to 
  end

  def show
    @room = Room.find_by('name=?', "#{params[:id]}")
    @video = params[:addVideo] 
    render :show
  end

  def search
    client ||= YouTubeIt::Client.new(:dev_key => ENV["API_KEY"])
    @room = Room.find(params[:room_id])
    if params[:search]
      search_query = params[:search]
      @room.tracks.create(video_id: search_query)
      @results = client.videos_by(:query => search_query, :page => 1, :per_page => 10)
      render :video_result
    else
      @room.tracks.create(video_id: params[:addVideo])
      render :song_added
    end
  end

  

end
