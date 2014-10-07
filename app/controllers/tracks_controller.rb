require 'pp'
class TracksController < ApplicationController

  def index
    @room = Room.find_by('name=?', params[:room_id])
    @tracks = @room.tracks
    @track = Track.new
  end

  def create
    search_query = params[:track][:video_id]
    client ||= YouTubeIt::Client.new(:dev_key => ENV["API_KEY"])
    @results1 = client.videos_by(:query => search_query, :page => 1, :per_page => 5)
    @results2 = client.videos_by(:query => search_query, :page => 2, :per_page => 5)
    @test =YouTubeIt::Parser::VideoFeedParser.new(@results1)
    render :show
  end

  def show
  end

end