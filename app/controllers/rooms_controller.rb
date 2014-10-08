class RoomsController < ApplicationController
  def index
    @room = Room.new
  end

  def create
    room_name = params[:room][:name]
    Room.create(name: room_name) if Room.find_by(name: room_name)==nil
    redirect_to room_tracks_path(room_id: room_name)
  end

  def show
    @room_name = params[:id]
    @room = Room.find_by('name=?', "#{@room_name}")
    @video_id = params[:first]
  end

  

end
