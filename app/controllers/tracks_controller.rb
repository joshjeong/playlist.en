class TracksController < ApplicationController
  skip_before_filter :verify_authenticity_token, :only => :create

  def index
    @room = Room.find_by('name=?', params[:room_id])
    @tracks = @room.tracks
    @track = Track.new
  end

  def create
    client ||= YouTubeIt::Client.new(:dev_key => ENV["API_KEY"])
    @room = Room.find(params[:room_id])
    if params[:search]
      search_query = params[:search]
      @room.tracks.create(video_id: search_query)
      @results = client.videos_by(:query => search_query, :page => 1, :per_page => 10)
      render :show
    elsif params[:nextSearch]
      search_query = params[:nextSearch]
      @room.tracks.create(video_id: search_query)
      @results = client.videos_by(:query => search_query, :page => 1, :per_page => 10)
      render :next_song_results
    else
      @room.tracks.create(video_id: params[:addVideo])
      render :song_added
    end
  end

  def show
  end

end