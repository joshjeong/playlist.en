class RoomsController < ApplicationController
  def index
    @room = Room.new
    @client ||= YouTubeIt::Client.new(:dev_key => ENV["API_KEY"])
  end

  def create
    room_name = params[:room][:name]
    Room.create(name: room_name) if Room.find_by(name: room_name)==nil
    redirect_to pick_rooms_path(id: room_name)
  end

  def show
    @room_name = params[:id]
  end

end
