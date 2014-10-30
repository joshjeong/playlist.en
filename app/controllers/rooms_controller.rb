class RoomsController < ApplicationController
  skip_before_filter  :verify_authenticity_token
  include RoomHelper

  def index
    @room = Room.new
  end

  def create
    room_name = params[:room][:name]
    if Room.find_by(name: room_name)==nil
      Room.create(name: room_name)
      @room = Room.find_by(name: room_name)
      redirect_to room_path(id: @room.name)
    else
      @room = Room.find_by(name: room_name)
      if @room.tracks.empty?
        redirect_to room_path(id: @room.name)
      else
        next_video_obj = @room.tracks.first
        @next_video = next_video_obj.video_id
        @room.tracks.delete(next_video_obj)
        render :theatre
      end
    end
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
      @results = @client.videos_by(:query => search_query, :page => 1, :per_page => 10)
      render :video_result, layout:false
    else
      @room.tracks.create(video_id: params[:addVideo])
    end
  end

  def theatre
    @room = Room.find_by('name=?', params[:id])
    @room.tracks.create(video_id: params[:video_id])
    @new_video = @room.tracks.find_by('video_id=?', params[:video_id])
    if params[:not_first_song]
      render :song_added, layout:false
    else
      next_video_obj = @room.tracks.first
      @next_video = next_video_obj.video_id
      @room.tracks.delete(next_video_obj)
      render :theatre, layout:false
    end
  end

  def nextvideo
    @room = Room.find_by('name=?', params[:id])
    next_video_obj = @room.tracks.first
    @room.tracks.delete(next_video_obj)
    @next_video = next_video_obj.video_id
    render json: {video: @next_video}
  end

  def guest
  end

  def guestsearch
    @room = Room.find_by('name=?', params[:id])
    @room.tracks.create(video_id: params[:video_id])
    render :song_added, layout:false
  end

  def playlist
    @room = Room.find_by('name=?', params[:id])
    get_client
    @playlist = []
    @room.tracks.each do |video|
      @playlist << @client.video_by(video.video_id).author.name
    end
    render :playlist, layout:false
  end

end
