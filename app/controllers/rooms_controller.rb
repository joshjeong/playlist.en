class RoomsController < ActionController::Base
  def index
    @room = Room.new
  end

  def create
    room_name = params[:room][:name]
    if Room.find_by(name: room_name)
      #send to host's room
    else
      Room.create(name: room_name)
      #send to 
    end
    redirect_to :rooms
  end

  def show
    p '-----here in show------'
    p params
  end

end
