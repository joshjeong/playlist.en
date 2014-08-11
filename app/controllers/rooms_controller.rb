class RoomsController < ActionController::Base
  def index
    @room = Room.new
  end

  def create
    room_name = params[:room][:name]
    if Room.find_by(name: room_name)
      #send to host's room
    else
      @room = Room.create(name: room_name)
      #send to select song page
      redirect_to room_path(id: @room.name)
    end
  end

  def show
    p 'in the show route-----------------'
    p params
  end

end
