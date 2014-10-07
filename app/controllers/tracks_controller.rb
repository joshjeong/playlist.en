class TracksController < ApplicationController
  skip_before_filter :verify_authenticity_token, :only => :create

  def index
    @room = Room.find_by('name=?', params[:room_id])
    @tracks = @room.tracks
    @track = Track.new
  end

  def create
    search_query = params[:search]
    @room = Room.find(params[:room_id])
    client ||= YouTubeIt::Client.new(:dev_key => ENV["API_KEY"])
    @results = client.videos_by(:query => search_query, :page => 1, :per_page => 10)
    render :show
  end

  def show
  end

end