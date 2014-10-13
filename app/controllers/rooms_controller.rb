class RoomsController < ApplicationController
  include RoomHelper
  def index
    @room = Room.new
  end

  def create
    room_name = params[:room][:name]
    session[:queue] = []
    # if Room.find_by(name: room_name)==nil
      Room.create(name: room_name)
      @room = Room.find_by(name: room_name)
      redirect_to room_path(id: @room.name)
    # else
    #   redirect_to 
  end

  def show
    @room = Room.find_by('name=?', "#{params[:id]}")
    @video = params[:addVideo] 
    render :show
  end

  def search
    get_client
    @room = Room.find_by('name=?', params[:id])
    if params[:search]
      search_query = params[:search]
      @room.tracks.create(video_id: search_query)
      @results = @client.videos_by(:query => search_query, :page => 1, :per_page => 10)
      render :video_result
    else
      @room.tracks.create(video_id: params[:addVideo])
    end
  end

  def theatre
    @room = Room.find_by('name=?', params[:id])
    @room.tracks.create(video_id: params[:video_id])
    @new_video = @room.tracks.find_by('video_id=?', params[:video_id])
    session[:queue] << @new_video.video_id
    if params[:not_first_song]
      render :song_added
    else
      @next_video = session[:queue].shift
      render :theatre
    end
  end

  def nextvideo
    @next_video = session[:queue].shift
    render json: {video: @next_video}
  end


end
