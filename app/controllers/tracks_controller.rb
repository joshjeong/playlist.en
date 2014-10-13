class TracksController < ApplicationController
  skip_before_filter :verify_authenticity_token, :only => :create

  def index
    @room = Room.find_by('name=?', params[:room_id])
    @tracks = @room.tracks
    @track = Track.new
  end

  def create
  end


end