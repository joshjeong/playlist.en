class RoomsController < ActionController::Base
  def index
    @room = Room.new
  end

  def create
    room_name = params[:room][:name]
    Room.create(name: room_name) if Room.find_by(name: room_name)==nil
    redirect_to pick_rooms_path(id: room_name)
  end

  def show
    @room_name = params[:id]
  end

  def pick

  end

end
